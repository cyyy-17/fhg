import { z } from "zod";
import type { CompanyData } from "@/types/admin";

export const serviceSpecsSchema = z.object({
  deliverables: z.array(z.string()),
  equipment: z.array(z.string()),
  permits: z.array(z.string()),
  turnaround: z.string(),
});

export const serviceItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  category: z.string(),
  shortDesc: z.string(),
  metrics: z.array(z.string()),
  specs: serviceSpecsSchema,
  icon: z.enum(["TreePine", "Axe", "Palmtree", "ClipboardCheck", "Sprout", "Mountain", "Flower2", "Layers"]),
});

export const projectItemSchema = z.object({
  id: z.string(),
  client: z.string().min(1, "Client is required"),
  title: z.string().min(1, "Title is required"),
  location: z.string(),
  scope: z.string(),
  category: z.enum(["infrastructure", "commercial", "reforestation"]),
  badge: z.enum(["Ongoing", "Completed"]),
});

export const clientItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  sector: z.enum([
    "Infrastructure & Heavy Construction",
    "Real Estate & Commercial",
    "Energy & Industrial",
    "Government & Financial",
  ]),
  projectSample: z.string(),
});

export const equipmentItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  category: z.enum(["chainsaws", "heavy-lift", "excavation", "processing", "irrigation"]),
  model: z.string(),
  quantity: z.string(),
  capacity: z.string(),
  compliance: z.string(),
  primaryRole: z.string(),
  status: z.enum(["Active Fleet", "Pre-Mobilized"]),
});

export const speciesItemSchema = z.object({
  id: z.string(),
  commonName: z.string().min(1, "Common name is required"),
  scientificName: z.string(),
  category: z.enum(["native", "ornamental", "bamboo", "mature-balled"]),
  facility: z.enum(["Sitio Latag (100K+)", "Tumaway (80K+)", "Aya (50K+)"]),
  availableSizes: z.string(),
  growthRate: z.string(),
  offsetCompliance: z.string(),
  stockStatus: z.enum(["Immediate Bulk Delivery", "Acclimatized Balled", "Batch In Production"]),
});

export const faqItemSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export const protocolStepSchema = z.object({
  step: z.string(),
  title: z.string().min(1, "Title is required"),
  badge: z.string(),
  desc: z.string(),
  deliverables: z.array(z.string()),
});

export const documentItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  category: z.enum(["Legal Registration", "Tax Compliance", "Project Audit", "Logistics & Site"]),
  docNumber: z.string(),
  fileUrl: z.string(),
  fileSize: z.string(),
  description: z.string(),
  status: z.enum(["Audited & Active", "Official Certified"]),
});

export const adminSettingsSchema = z.object({
  contactEmail: z
    .string()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const emails = val.split(",").map((s) => s.trim()).filter(Boolean);
        return emails.length > 0 && emails.every((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
      },
      { message: "Invalid email format. Enter valid email(s) separated by commas." }
    )
    .optional()
    .or(z.literal("")),
  adminPassword: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
  notificationEnabled: z.boolean().optional(),
});

export const companyDataSchema = z.custom<CompanyData>(
  (val) => typeof val === "object" && val !== null && "name" in val && "established" in val,
  { message: "Invalid company profile schema" }
);

export const inquirySubmissionSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(100),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(7, "Phone number is required").max(25),
  subject: z.string().min(1, "Subject is required").max(150),
  message: z.string().min(5, "Message must contain at least 5 characters").max(3000),
  company: z.string().max(100).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent to data processing is required",
  }),
  website: z.string().max(0).optional().or(z.literal("")), // Honeypot
});
