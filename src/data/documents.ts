export interface DocumentItem {
  id: string;
  title: string;
  category: "Legal Registration" | "Tax Compliance" | "Project Audit" | "Logistics & Site";
  docNumber: string;
  fileUrl: string;
  fileSize: string;
  description: string;
  status: "Audited & Active" | "Official Certified";
}

const currentYears = new Date().getFullYear() - 1998;

export const documents: DocumentItem[] = [
  {
    id: "company-profile",
    title: "Official Company Profile & Capability Dossier",
    category: "Legal Registration",
    docNumber: "DTI Cert. No. 1729753",
    fileUrl: "/docs/company-profile.pdf",
    fileSize: "305 KB PDF",
    description: `Comprehensive corporate profile detailing ${currentYears}+ years of history, management, machinery assets, and signature infrastructure projects.`,
    status: "Official Certified",
  },
  {
    id: "bir-cor",
    title: "BIR Certificate of Registration (COR)",
    category: "Tax Compliance",
    docNumber: "TIN Registered Enterprise",
    fileUrl: "/docs/bir-cor.pdf",
    fileSize: "1.15 MB PDF",
    description: "Official Bureau of Internal Revenue registered sole proprietorship status for commercial contract bidding and billing compliance.",
    status: "Audited & Active",
  },
  {
    id: "bir-2303",
    title: "BIR Form 2303 Tax Exemption & Filing Record",
    category: "Tax Compliance",
    docNumber: "BIR RDO 059 Batangas",
    fileUrl: "/docs/bir-2303.pdf",
    fileSize: "2.58 MB PDF",
    description: "Statutory tax clearance for enterprise withholding, corporate invoicing, and government procurement pre-qualification.",
    status: "Audited & Active",
  },
  {
    id: "clients-projects",
    title: "Audited List of Clients & Completed Works",
    category: "Project Audit",
    docNumber: "Track Record Archive 1998–2024",
    fileUrl: "/docs/clients-and-projects.pdf",
    fileSize: "170 KB PDF",
    description: "Certified list of infrastructure and commercial developers including San Miguel, Ayala Land, SM Prime, EEI, DMCI, and DPWH contracts.",
    status: "Official Certified",
  },
  {
    id: "office-map",
    title: "Head Office Location Map & Dispatch Hub",
    category: "Logistics & Site",
    docNumber: "Talisay Batangas HQ",
    fileUrl: "/docs/office-location-map.pdf",
    fileSize: "208 KB PDF",
    description: "Route guide to Sitio Sto. Niño, Banga, Talisay, Batangas (Plus Code: 32V9+5P) operations hub for vendor onboarding and in-person meetings.",
    status: "Official Certified",
  },
  {
    id: "nursery-map",
    title: "Twin Plant Nursery Facilities Location Guide",
    category: "Logistics & Site",
    docNumber: "Tumaway & Aya Facilities",
    fileUrl: "/docs/nursery-location-map.pdf",
    fileSize: "141 KB PDF",
    description: "Access coordinates and site map for client tree inspection at Brgy. Tumaway and Brgy. Aya propagation farms.",
    status: "Official Certified",
  },
];
