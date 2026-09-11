import fs from "fs";
import path from "path";
import type {
  AdminStore,
  AdminSettings,
  CompanyData,
  InquiryRecord,
} from "@/types/admin";
import type { ServiceItem } from "@/data/services";
import type { ProjectItem } from "@/data/projects";
import type { ClientItem } from "@/data/clients";
import type { EquipmentItem } from "@/data/equipment";
import type { SpeciesItem } from "@/data/species";
import type { FaqItem } from "@/data/faqs";
import type { ProtocolStep } from "@/data/protocol";
import type { DocumentItem } from "@/data/documents";

import { companyData as defaultCompany } from "@/data/company";
import { servicesData as defaultServices } from "@/data/services";
import { projectsData as defaultProjects } from "@/data/projects";
import { clientsData as defaultClients } from "@/data/clients";
import { equipmentFleet as defaultEquipment } from "@/data/equipment";
import { speciesData as defaultSpecies } from "@/data/species";
import { generalFaqs as defaultFaqs } from "@/data/faqs";
import { protocolSteps as defaultProtocol } from "@/data/protocol";
import { documents as defaultDocuments } from "@/data/documents";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "admin-db.json");

// Split per-domain KV keys to eliminate race conditions on concurrent admin edits
export const DOMAIN_KEYS = {
  company: "fhg:company",
  services: "fhg:services",
  projects: "fhg:projects",
  clients: "fhg:clients",
  equipment: "fhg:equipment",
  species: "fhg:species",
  faqs: "fhg:faqs",
  protocol: "fhg:protocol",
  documents: "fhg:documents",
  inquiries: "fhg:inquiries",
  settings: "fhg:settings",
} as const;

// Legacy key maintained for automatic migration of existing stores
const MONOLITHIC_KEY = "fhg:admin_store_v1";

const defaultSettings: AdminSettings = {
  contactEmail: "info@foresthillsgarden.com",
  notificationEnabled: true,
};

function getDefaultStore(): AdminStore {
  return {
    company: JSON.parse(JSON.stringify(defaultCompany)),
    services: JSON.parse(JSON.stringify(defaultServices)),
    projects: JSON.parse(JSON.stringify(defaultProjects)),
    clients: JSON.parse(JSON.stringify(defaultClients)),
    equipment: JSON.parse(JSON.stringify(defaultEquipment)),
    species: JSON.parse(JSON.stringify(defaultSpecies)),
    faqs: JSON.parse(JSON.stringify(defaultFaqs)),
    protocol: JSON.parse(JSON.stringify(defaultProtocol)),
    documents: JSON.parse(JSON.stringify(defaultDocuments)),
    inquiries: [],
    settings: JSON.parse(JSON.stringify(defaultSettings)),
    lastUpdated: new Date().toISOString(),
  };
}

// Vercel KV / Upstash Redis REST helper
export function getKvConfig(): { url: string; token: string } | null {
  const rawUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const rawToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!rawUrl || !rawToken) return null;

  const url = rawUrl.trim().replace(/^["']|["']$/g, "").replace(/[\r\n\s]+/g, "");
  const token = rawToken.trim().replace(/^["']|["']$/g, "").replace(/[\r\n\s]+/g, "");
  if (url && token) {
    return { url, token };
  }
  return null;
}

async function kvGet<T>(key: string): Promise<T | null> {
  const cfg = getKvConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}/get/${encodeURIComponent(key)}`, {
      headers: { Authorization: `Bearer ${cfg.token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.result !== null && data?.result !== undefined) {
      let parsed: unknown = data.result;
      // Recursively unwrap stringified JSON in case of nested stringification in Redis/KV
      while (typeof parsed === "string") {
        try {
          const next = JSON.parse(parsed);
          parsed = next;
        } catch {
          break;
        }
      }
      return parsed as T;
    }
    return null;
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "digest" in err &&
      (err as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw err;
    }
    console.warn(`Vercel KV get error for [${key}], falling back:`, err);
    return null;
  }
}

async function kvSet<T>(key: string, value: T): Promise<boolean> {
  const cfg = getKvConfig();
  if (!cfg) return false;
  try {
    const payload = typeof value === "string" ? value : JSON.stringify(value);
    const res = await fetch(`${cfg.url}/set/${encodeURIComponent(key)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
      },
      body: payload,
    });
    return res.ok;
  } catch (err) {
    if (
      typeof err === "object" &&
      err !== null &&
      "digest" in err &&
      (err as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw err;
    }
    console.warn(`Vercel KV set error for [${key}]:`, err);
    return false;
  }
}

// Read from local JSON database file (development & offline fallback)
function readLocalDb(): Partial<AdminStore> | null {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      if (content.trim()) {
        return JSON.parse(content) as Partial<AdminStore>;
      }
    }
  } catch {
    // Read failure or read-only filesystem
  }
  return null;
}

// Write to local JSON database file (safe write, silently ignores read-only environments)
function writeLocalDb(store: Partial<AdminStore>): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const current = readLocalDb() || {};
    const merged = { ...current, ...store, lastUpdated: new Date().toISOString() };
    fs.writeFileSync(DB_FILE, JSON.stringify(merged, null, 2), "utf-8");
  } catch {
    // Silently ignore on read-only environments like Vercel serverless
  }
}

// Generic per-domain getter with automatic fallback & zero-downtime migration
async function getDomainData<T>(
  domain: keyof typeof DOMAIN_KEYS,
  defaultVal: T
): Promise<T> {
  const isDefaultArray = Array.isArray(defaultVal);
  const isValid = (candidate: unknown): candidate is T => {
    if (candidate === null || candidate === undefined) return false;
    if (isDefaultArray) return Array.isArray(candidate);
    return typeof candidate === "object" && !Array.isArray(candidate);
  };

  const cfg = getKvConfig();
  if (cfg) {
    // 1. Check atomic per-domain key
    const val = await kvGet<unknown>(DOMAIN_KEYS[domain]);
    if (isValid(val)) {
      return val;
    }

    // 2. Migration fallback: check legacy monolithic store in KV
    const monolith = await kvGet<Record<string, unknown>>(MONOLITHIC_KEY);
    if (monolith && monolith[domain] !== undefined && monolith[domain] !== null) {
      const candidate = monolith[domain];
      if (isValid(candidate)) {
        // Self-heal: seed per-domain key asynchronously
        void kvSet(DOMAIN_KEYS[domain], candidate);
        return candidate;
      }
    }

    // 3. Fall back to local file or default baseline
    const local = readLocalDb();
    const localVal = local ? (local[domain as keyof AdminStore] as unknown) : undefined;
    const finalVal = isValid(localVal) ? localVal : defaultVal;

    // Seed per-domain key so future reads are instantaneous
    void kvSet(DOMAIN_KEYS[domain], finalVal);
    return finalVal;
  }

  // Local filesystem mode
  const local = readLocalDb();
  const candidate = local ? (local[domain as keyof AdminStore] as unknown) : undefined;
  if (isValid(candidate)) {
    return candidate;
  }
  return defaultVal;
}

// Generic per-domain saver that updates KV atomically without touching other domains
async function saveDomainData<T>(
  domain: keyof typeof DOMAIN_KEYS,
  value: T
): Promise<T> {
  // 1. Write atomic per-domain key in KV
  await kvSet(DOMAIN_KEYS[domain], value);

  // 2. Write to local file for dev persistence
  writeLocalDb({ [domain]: value });

  return value;
}

// -----------------------------------------------------------------------------
// Domain-Specific Accessors & Mutators
// -----------------------------------------------------------------------------

export async function getCompanyData(): Promise<CompanyData> {
  return await getDomainData<CompanyData>("company", JSON.parse(JSON.stringify(defaultCompany)));
}

export async function saveCompanyData(company: CompanyData): Promise<CompanyData> {
  return await saveDomainData<CompanyData>("company", company);
}

export async function getServicesData(): Promise<ServiceItem[]> {
  return await getDomainData<ServiceItem[]>("services", JSON.parse(JSON.stringify(defaultServices)));
}

export async function saveServicesData(services: ServiceItem[]): Promise<ServiceItem[]> {
  return await saveDomainData<ServiceItem[]>("services", services);
}

export async function getProjectsData(): Promise<ProjectItem[]> {
  return await getDomainData<ProjectItem[]>("projects", JSON.parse(JSON.stringify(defaultProjects)));
}

export async function saveProjectsData(projects: ProjectItem[]): Promise<ProjectItem[]> {
  return await saveDomainData<ProjectItem[]>("projects", projects);
}

export async function getClientsData(): Promise<ClientItem[]> {
  return await getDomainData<ClientItem[]>("clients", JSON.parse(JSON.stringify(defaultClients)));
}

export async function saveClientsData(clients: ClientItem[]): Promise<ClientItem[]> {
  return await saveDomainData<ClientItem[]>("clients", clients);
}

export async function getEquipmentData(): Promise<EquipmentItem[]> {
  return await getDomainData<EquipmentItem[]>("equipment", JSON.parse(JSON.stringify(defaultEquipment)));
}

export async function saveEquipmentData(equipment: EquipmentItem[]): Promise<EquipmentItem[]> {
  return await saveDomainData<EquipmentItem[]>("equipment", equipment);
}

export async function getSpeciesData(): Promise<SpeciesItem[]> {
  return await getDomainData<SpeciesItem[]>("species", JSON.parse(JSON.stringify(defaultSpecies)));
}

export async function saveSpeciesData(species: SpeciesItem[]): Promise<SpeciesItem[]> {
  return await saveDomainData<SpeciesItem[]>("species", species);
}

export async function getFaqsData(): Promise<FaqItem[]> {
  return await getDomainData<FaqItem[]>("faqs", JSON.parse(JSON.stringify(defaultFaqs)));
}

export async function saveFaqsData(faqs: FaqItem[]): Promise<FaqItem[]> {
  return await saveDomainData<FaqItem[]>("faqs", faqs);
}

export async function getProtocolData(): Promise<ProtocolStep[]> {
  return await getDomainData<ProtocolStep[]>("protocol", JSON.parse(JSON.stringify(defaultProtocol)));
}

export async function saveProtocolData(protocol: ProtocolStep[]): Promise<ProtocolStep[]> {
  return await saveDomainData<ProtocolStep[]>("protocol", protocol);
}

export async function getDocumentsData(): Promise<DocumentItem[]> {
  return await getDomainData<DocumentItem[]>("documents", JSON.parse(JSON.stringify(defaultDocuments)));
}

export async function saveDocumentsData(documents: DocumentItem[]): Promise<DocumentItem[]> {
  return await saveDomainData<DocumentItem[]>("documents", documents);
}

export async function getSettingsData(): Promise<AdminSettings> {
  return await getDomainData<AdminSettings>("settings", JSON.parse(JSON.stringify(defaultSettings)));
}

export async function saveSettingsData(settings: AdminSettings): Promise<AdminSettings> {
  return await saveDomainData<AdminSettings>("settings", settings);
}

// -----------------------------------------------------------------------------
// Inquiry Management (Dedicated Domain)
// -----------------------------------------------------------------------------

export async function getInquiriesData(): Promise<InquiryRecord[]> {
  return await getDomainData<InquiryRecord[]>("inquiries", []);
}

export async function saveInquiriesData(inquiries: InquiryRecord[]): Promise<InquiryRecord[]> {
  return await saveDomainData<InquiryRecord[]>("inquiries", inquiries);
}

export async function addInquiryRecord(
  item: Omit<InquiryRecord, "id" | "timestamp" | "status">
): Promise<InquiryRecord> {
  const current = await getInquiriesData();
  const newRecord: InquiryRecord = {
    ...item,
    id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    status: "unread",
  };

  const updated = [newRecord, ...current];
  await saveInquiriesData(updated);
  return newRecord;
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryRecord["status"]
): Promise<boolean> {
  const current = await getInquiriesData();
  let found = false;
  const updated = current.map((inq) => {
    if (inq.id === id) {
      found = true;
      return { ...inq, status };
    }
    return inq;
  });

  if (found) {
    await saveInquiriesData(updated);
  }
  return found;
}

export async function deleteInquiryRecord(id: string): Promise<boolean> {
  const current = await getInquiriesData();
  const filtered = current.filter((inq) => inq.id !== id);
  if (filtered.length !== current.length) {
    await saveInquiriesData(filtered);
    return true;
  }
  return false;
}

// -----------------------------------------------------------------------------
// Unified Store Composition & Mutations
// -----------------------------------------------------------------------------

export async function getAdminStore(): Promise<AdminStore> {
  const [
    company,
    services,
    projects,
    clients,
    equipment,
    species,
    faqs,
    protocol,
    documents,
    inquiries,
    settings,
  ] = await Promise.all([
    getCompanyData(),
    getServicesData(),
    getProjectsData(),
    getClientsData(),
    getEquipmentData(),
    getSpeciesData(),
    getFaqsData(),
    getProtocolData(),
    getDocumentsData(),
    getInquiriesData(),
    getSettingsData(),
  ]);

  return {
    company,
    services,
    projects,
    clients,
    equipment,
    species,
    faqs,
    protocol,
    documents,
    inquiries,
    settings,
    lastUpdated: new Date().toISOString(),
  };
}

export async function saveAdminStore(updates: Partial<AdminStore>): Promise<AdminStore> {
  const promises: Promise<unknown>[] = [];

  if (updates.company) promises.push(saveCompanyData(updates.company));
  if (updates.services) promises.push(saveServicesData(updates.services));
  if (updates.projects) promises.push(saveProjectsData(updates.projects));
  if (updates.clients) promises.push(saveClientsData(updates.clients));
  if (updates.equipment) promises.push(saveEquipmentData(updates.equipment));
  if (updates.species) promises.push(saveSpeciesData(updates.species));
  if (updates.faqs) promises.push(saveFaqsData(updates.faqs));
  if (updates.protocol) promises.push(saveProtocolData(updates.protocol));
  if (updates.documents) promises.push(saveDocumentsData(updates.documents));
  if (updates.inquiries) promises.push(saveInquiriesData(updates.inquiries));
  if (updates.settings) promises.push(saveSettingsData(updates.settings));

  await Promise.all(promises);
  return await getAdminStore();
}

export async function resetToDefaults(): Promise<AdminStore> {
  const fresh = getDefaultStore();
  return await saveAdminStore(fresh);
}
