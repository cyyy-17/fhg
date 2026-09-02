export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  details: string[];
  icon: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "earthballing",
    title: "Large-Scale Tree Earthballing & Relocation",
    shortDesc: "Arboricultural excavation, root-ball wrapping, heavy crane lifting, transport, and replanting of mature, heritage, and endangered trees.",
    details: [
      "Scientific caliper calculation & root preparation",
      "25T to 50T hydraulic crane rigging & boom truck transit",
      "Post-transplant mycorrhizal hydration & stabilization guarantee"
    ],
    icon: "TreePine"
  },
  {
    id: "tree-cutting",
    title: "Certified Tree Cutting & Precision Felling",
    shortDesc: "Controlled sectional dismantling of hazardous, compromised, or right-of-way trees utilizing 89 DENR-permitted power chainsaws.",
    details: [
      "Zero-damage sectional rigging near high-voltage lines",
      "Full DENR Special Tree Cutting Permit (STCP) handling",
      "Timber inventory, log scaling & eco-friendly bio-clearing"
    ],
    icon: "Axe"
  },
  {
    id: "pca-cutting",
    title: "PCA-Permitted Coconut Tree Removal",
    shortDesc: "Legally compliant coconut palm cutting, clearing, and lumber salvage under strict Philippine Coconut Authority authorization.",
    details: [
      "PCA Permit to Cut processing & barangay coordination",
      "13 registered power chainsaws in NCR & 13 in Laguna",
      "Coco-lumber processing, stump extraction & site grading"
    ],
    icon: "Palmtree"
  },
  {
    id: "tree-inventory",
    title: "Tree Inventory, Calipering & Risk Assessment",
    shortDesc: "GPS-tagged digital tree mapping, health evaluation, species identification, and pre-development clearing reports.",
    details: [
      "Comprehensive arboricultural inspection reports",
      "Geotagged tree maps & caliper diameter census",
      "Turnkey statutory submissions for DENR/CENRO/EMB"
    ],
    icon: "ClipboardCheck"
  },
  {
    id: "plant-nursery",
    title: "Native Seedling Propagation & Acclimatization",
    shortDesc: "Production and conditioning of indigenous forest saplings, ornamentals, and compensatory trees across 2 Batangas propagation farms.",
    details: [
      "100,000+ containerized saplings ready for immediate dispatch",
      "DENR compensatory ratio compliance fulfillment (1:50 & 1:100)",
      "Native forest species: Narra, Molave, Banaba, Ipil, Balitbitan"
    ],
    icon: "Sprout"
  },
  {
    id: "reforestation",
    title: "Watershed Reforestation & Plantation Setup",
    shortDesc: "Multi-year watershed rehabilitation, carbon-sink development, and National Greening Program (NGP) projects across 2,600+ hectares.",
    details: [
      "Site preparation, baseline soil testing & contour planting",
      "3-year maintenance, weeding, firebreak setup & mortality replacement",
      "High seedling survival rate compliance certification"
    ],
    icon: "Mountain"
  },
  {
    id: "commercial-landscaping",
    title: "Commercial Landscaping & Highway Greening",
    shortDesc: "Turnkey landscape architecture execution for corporate campuses, tollway interchanges, township medians, and commercial parks.",
    details: [
      "Hardscape & softscape installation with irrigation layout",
      "Slope stabilization, hydroseeding & erosion prevention",
      "Architectural specimen tree placement & mature turf establishment"
    ],
    icon: "Flower2"
  },
  {
    id: "soil-nursery-boxes",
    title: "Treated Planting Media & Custom Nursery Boxes",
    shortDesc: "Bulk topsoil, organic compost, treated soil amendments, and custom industrial-grade timber/steel nursery boxes for urban developments.",
    details: [
      "Screened loam soil, pumice, and organic compost blends",
      "Heavy-duty treated wooden tree boxes for urban streetscapes",
      "Bulk dump truck delivery nationwide with batch lab testing"
    ],
    icon: "Layers"
  }
];
