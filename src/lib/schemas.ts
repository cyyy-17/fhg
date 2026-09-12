import { z } from "zod";

export const serviceSpecsSchema = z.object({
  deliverables: z.array(z.string().trim()),
  equipment: z.array(z.string().trim()),
  permits: z.array(z.string().trim()),
  turnaround: z.string().trim(),
});

export const serviceItemSchema = z.object({
  id: z.string().trim(),
  title: z.string().trim().min(1, "Title is required"),
  category: z.string().trim(),
  shortDesc: z.string().trim(),
  metrics: z.array(z.string().trim()),
  specs: serviceSpecsSchema,
  icon: z.enum(["TreePine", "Axe", "Palmtree", "ClipboardCheck", "Sprout", "Mountain", "Flower2", "Layers"]),
  imageUrl: z.string().trim().optional(),
  sortOrder: z.number().optional(),
});

export const projectItemSchema = z.object({
  id: z.string().trim(),
  client: z.string().trim().min(1, "Client is required"),
  title: z.string().trim().min(1, "Title is required"),
  location: z.string().trim(),
  scope: z.string().trim(),
  category: z.enum(["infrastructure", "commercial", "reforestation"]),
  badge: z.enum(["Ongoing", "Completed"]),
  imageUrl: z.string().trim().optional(),
  year: z.string().trim().optional(),
  contractValue: z.string().trim().optional(),
});

export const clientItemSchema = z.object({
  id: z.string().trim(),
  name: z.string().trim().min(1, "Name is required"),
  sector: z.enum([
    "Infrastructure & Heavy Construction",
    "Real Estate & Commercial",
    "Energy & Industrial",
    "Government & Financial",
  ]),
  projectSample: z.string().trim(),
});

export const equipmentItemSchema = z.object({
  id: z.string().trim(),
  name: z.string().trim().min(1, "Name is required"),
  category: z.enum(["chainsaws", "heavy-lift", "excavation", "processing", "irrigation"]),
  model: z.string().trim(),
  quantity: z.string().trim(),
  capacity: z.string().trim(),
  compliance: z.string().trim(),
  primaryRole: z.string().trim(),
  status: z.enum(["Active Fleet", "Pre-Mobilized"]),
});

export const speciesItemSchema = z.object({
  id: z.string().trim(),
  commonName: z.string().trim().min(1, "Common name is required"),
  scientificName: z.string().trim(),
  category: z.enum(["native", "ornamental", "bamboo", "mature-balled"]),
  facility: z.enum(["Sitio Latag (100K+)", "Tumaway (80K+)", "Aya (50K+)"]),
  availableSizes: z.string().trim(),
  growthRate: z.string().trim(),
  offsetCompliance: z.string().trim(),
  stockStatus: z.enum(["Immediate Bulk Delivery", "Acclimatized Balled", "Batch In Production"]),
});

export const faqItemSchema = z.object({
  question: z.string().trim().min(1, "Question is required"),
  answer: z.string().trim().min(1, "Answer is required"),
});

export const protocolStepSchema = z.object({
  step: z.string().trim(),
  title: z.string().trim().min(1, "Title is required"),
  badge: z.string().trim(),
  desc: z.string().trim(),
  deliverables: z.array(z.string().trim()),
});

export const documentItemSchema = z.object({
  id: z.string().trim(),
  title: z.string().trim().min(1, "Title is required"),
  category: z.enum(["Legal Registration", "Tax Compliance", "Project Audit", "Logistics & Site"]),
  docNumber: z.string().trim(),
  fileUrl: z.string().trim(),
  fileSize: z.string().trim(),
  description: z.string().trim(),
  status: z.enum(["Audited & Active", "Official Certified"]),
  issuedDate: z.string().trim().optional(),
  expiryDate: z.string().trim().optional(),
});

export const adminSettingsSchema = z.object({
  contactEmail: z
    .string()
    .trim()
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
  adminPassword: z.string().optional().or(z.literal("")),
  notificationEnabled: z.boolean().optional(),
  sessionTimeoutMinutes: z.number().min(5).max(10080).optional(),
});

export const companyDataSchema = z.object({
  name: z.string().trim().min(1, "Company name is required"),
  shortName: z.string().trim().min(1),
  tagline: z.string().trim(),
  established: z.string().trim(),
  founder: z.string().trim(),
  founderTenure: z.string().trim(),
  manager: z.string().trim(),
  managerTenure: z.string().trim(),
  corporateTransition: z.object({
    status: z.string().trim(),
    corporateEntity: z.string().trim(),
    type: z.string().trim(),
    secRegNo: z.string().trim(),
  }),
  legal: z.object({
    dtiCertNo: z.string().trim(),
    dtiExpiry: z.string().trim(),
    birOcn: z.string().trim(),
    tin: z.string().trim(),
    birRdo: z.string().trim(),
    primaryPsic: z.string().trim(),
    philgepsCertNo: z.string().trim(),
    philgepsMembership: z.string().trim(),
    dbpAccreditationNo: z.string().trim(),
    dbpDate: z.string().trim(),
    sssNo: z.string().trim(),
    philhealthNo: z.string().trim(),
    pagibigNo: z.string().trim(),
    denrChainsaws: z.string().trim(),
    denrNurseryAccreditation: z.string().trim(),
    pcaRegistrations: z.array(
      z.object({
        jurisdiction: z.string().trim(),
        certNo: z.string().trim(),
      })
    ),
  }),
  headOffice: z.object({
    buildingName: z.string().trim(),
    address: z.string().trim(),
    townOffice: z.string().trim(),
    coordinates: z.string().trim(),
    plusCode: z.string().trim(),
    category: z.string().trim(),
    hours: z.string().trim(),
    telefax: z.string().trim(),
    mobiles: z.array(z.string().trim()),
    viber: z.string().trim(),
    viberUrl: z.string().trim(),
    viberWebUrl: z.string().trim(),
    whatsapp: z.string().trim(),
    emails: z.array(z.string().trim()),
    googleMapsUrl: z.string().trim(),
    wazeUrl: z.string().trim(),
  }),
  nurseries: z.array(
    z.object({
      name: z.string().trim(),
      location: z.string().trim(),
      coordinates: z.string().trim().optional(),
      capacity: z.string().trim(),
      specialty: z.string().trim(),
      googleMapsUrl: z.string().trim(),
      wazeUrl: z.string().trim(),
    })
  ),
  warranty: z.object({
    period: z.string().trim(),
    survivalRateTarget: z.string().trim(),
    coverage: z.string().trim(),
    monitoringInterval: z.string().trim(),
  }),
  safetyEhs: z.object({
    officers: z.string().trim(),
    zeroLtaHours: z.string().trim(),
    safetyAward: z.string().trim(),
    insurance: z.string().trim(),
    complianceRating: z.string().trim(),
  }),
  awards: z.array(
    z.object({
      title: z.string().trim(),
      conferredBy: z.string().trim(),
      date: z.string().trim(),
      project: z.string().trim(),
      detail: z.string().trim(),
    })
  ),
  credentials: z.array(
    z.object({
      title: z.string().trim(),
      detail: z.string().trim(),
    })
  ),
  stats: z.array(
    z.object({
      value: z.number(),
      suffix: z.string().trim(),
      label: z.string().trim(),
      sub: z.string().trim(),
    })
  ),
});

export const inquirySubmissionSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Valid email address is required"),
  phone: z.string().trim().min(7, "Phone number is required").max(25),
  subject: z.string().trim().min(1, "Subject is required").max(150),
  message: z.string().trim().min(5, "Message must contain at least 5 characters").max(3000),
  company: z.string().trim().max(100).optional(),
  type: z.enum(["Commercial", "Government", "General", "RFP"]).optional(),
  estimatedValue: z.string().trim().max(50).optional(),
  preferredContactMethod: z.enum(["email", "phone", "either"]).optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "Consent to data processing is required",
  }),
  website: z.string().max(0).optional().or(z.literal("")), // Honeypot anti-bot
});
