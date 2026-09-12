import type { ServiceItem } from "@/data/services";
import type { ProjectItem } from "@/data/projects";
import type { ClientItem } from "@/data/clients";
import type { EquipmentItem } from "@/data/equipment";
import type { SpeciesItem } from "@/data/species";
import type { FaqItem } from "@/data/faqs";
import type { ProtocolStep } from "@/data/protocol";
import type { DocumentItem } from "@/data/documents";
import type { companyData } from "@/data/company";

export type CompanyData = typeof companyData;

export interface InquiryRecord {
  id: string;
  timestamp: string;
  clientName: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "archived";
  dossierText?: string;
  internalNote?: string;
}

export interface AdminSettings {
  contactEmail?: string;
  adminPassword?: string;
  notificationEnabled?: boolean;
}

export interface AdminStore {
  company: CompanyData;
  services: ServiceItem[];
  projects: ProjectItem[];
  clients: ClientItem[];
  equipment: EquipmentItem[];
  species: SpeciesItem[];
  faqs: FaqItem[];
  protocol: ProtocolStep[];
  documents: DocumentItem[];
  inquiries: InquiryRecord[];
  settings?: AdminSettings;
  lastUpdated: string;
}

export interface AuthSession {
  authenticated: boolean;
  role: "admin";
  issuedAt: number;
}
