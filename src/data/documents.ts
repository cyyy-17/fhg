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
    docNumber: "DTI Cert. 1729753 (Valid to May 28, 2030)",
    fileUrl: "/docs/company-profile.pdf",
    fileSize: "314 KB PDF",
    description: `Official corporate profile signed by Mrs. Marife B. Luna detailing ${currentYears}+ years of contracting history, corporate transition to Forest Hills Ventures Inc. (SEC Reg. 2023060103408-45), 90-unit chainsaw fleet, and signature infrastructure projects.`,
    status: "Official Certified",
  },
  {
    id: "bir-cor",
    title: "BIR Certificate of Registration (COR)",
    category: "Tax Compliance",
    docNumber: "OCN 059RC20230000016326 • TIN 922-166-219-00000",
    fileUrl: "/docs/bir-cor.pdf",
    fileSize: "1.15 MB PDF",
    description: "Official Bureau of Internal Revenue registered taxpayer standing under RDO 059 Lipa City, East Batangas, Region 09A CABAMIRO for commercial bidding and billing compliance.",
    status: "Audited & Active",
  },
  {
    id: "bir-2303",
    title: "BIR Form 2303 Tax Exemption & Filing Record",
    category: "Tax Compliance",
    docNumber: "BIR RDO 059 Lipa City • PSIC 01531",
    fileUrl: "/docs/bir-2303.pdf",
    fileSize: "2.58 MB PDF",
    description: "Statutory tax registration document certifying enterprise withholding, corporate invoicing, and government procurement pre-qualification under PSIC 01531.",
    status: "Audited & Active",
  },
  {
    id: "clients-projects",
    title: "Official List of Clients & Completed Works",
    category: "Project Audit",
    docNumber: "Track Record Archive 1998–2026",
    fileUrl: "/docs/clients-and-projects.pdf",
    fileSize: "170 KB PDF",
    description: "Certified list of infrastructure and commercial developers including Giga ACE 6, San Miguel, Ayala Land, SM Prime, EEI, DMCI, Leighton, and DENR contracts.",
    status: "Official Certified",
  },
  {
    id: "office-map",
    title: "Head Office Location Map & Dispatch Hub",
    category: "Logistics & Site",
    docNumber: "FHG Building, Sitio Sto. Niño & Malvar St.",
    fileUrl: "/docs/office-location-map.pdf",
    fileSize: "208 KB PDF",
    description: "Route guide to Forest Hills Garden Building, Sitio Santo Niño, Brgy. Banga, and Malvar St., Poblacion 8, Talisay, Batangas (Plus Code: 32V9+5P) operations hub.",
    status: "Official Certified",
  },
  {
    id: "nursery-map",
    title: "Plant Nursery Facilities Location Guide",
    category: "Logistics & Site",
    docNumber: "Sitio Latag, Tumaway & Aya Facilities",
    fileUrl: "/docs/nursery-location-map.pdf",
    fileSize: "141 KB PDF",
    description: "Access coordinates and site location guide for client tree inspection at Sitio Latag, Brgy. Tumaway (along Talisay-Tanauan Rd, coords 14.089851, 121.037593) and Brgy. Aya propagation farms.",
    status: "Official Certified",
  },
];
