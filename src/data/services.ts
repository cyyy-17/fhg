export interface ServiceSpecs {
  deliverables: string[];
  equipment: string[];
  permits: string[];
  turnaround: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  metrics: string[];
  specs: ServiceSpecs;
  icon: "TreePine" | "Axe" | "Palmtree" | "ClipboardCheck" | "Sprout" | "Mountain" | "Flower2" | "Layers";
  imageUrl?: string;
  sortOrder?: number;
}

export const servicesData: ServiceItem[] = [
  {
    id: "earthballing",
    title: "Large-Scale Tree Earthballing",
    category: "Heavy Rigging",
    icon: "TreePine",
    shortDesc: "Arboricultural excavation, root-ball wrapping, crane lifting, and survival-guaranteed relocation.",
    metrics: ["25T–50T Cranes", "98.7% Survival", "12-Mo Warranty"],
    specs: {
      deliverables: [
        "Scientific caliper calculation & root preparation",
        "Burlap wire root-ball wrapping & mycorrhizal root-hormone hydration",
        "Scheduled night convoy transit with highway escort clearance",
        "180-day micro-irrigation and arborist root-conditioning monitoring",
      ],
      equipment: ["25T to 50T Mobile Hydraulic Cranes", "Lowbed Heavy Equipment Carriers", "Hydraulic Backhoes"],
      permits: ["DENR Tree Relocation Clearance", "LGU Engineering Transport Permit"],
      turnaround: "24–48 Hours Mobilization",
    },
  },
  {
    id: "tree-cutting",
    title: "Chainsaw Felling & Rigging",
    category: "Corridor Clearing",
    icon: "Axe",
    shortDesc: "Sectional dismantle of hazardous or infrastructure-obstructing trees using heavy certified chainsaws.",
    metrics: ["90 Units Fleet", "Zero-Damage", "CARI Insured"],
    specs: {
      deliverables: [
        "Rigged sectional dismantle near energized high-voltage lines",
        "Precision directional felling for expressway rights-of-way",
        "Timber inventory, log scaling, salvage, and clean bio-clearing",
      ],
      equipment: ["90 Stihl Industrial Heavy Chainsaws (DENR Lipa)", "Cherry Picker Boom Trucks", "Heavy Log Winches"],
      permits: ["DENR Special Tree Cutting Permit (STCP)", "Barangay Tree Safety Clearance"],
      turnaround: "Emergency: 4 Hours | Standard: 48 Hours",
    },
  },
  {
    id: "pca-cutting",
    title: "PCA Coconut Tree Felling",
    category: "Statutory Salvage",
    icon: "Palmtree",
    shortDesc: "Permitted coconut palm cutting, clearing, and lumber recovery under strict PCA compliance.",
    metrics: ["26 PCA Units", "NCR & Quezon", "Zero Infraction"],
    specs: {
      deliverables: [
        "Turnkey processing of official PCA Permit to Cut (NCR & Region 4A)",
        "Sectional felling, root-ball extraction, and site clean-up",
        "Commercial coco-lumber processing and legal transport manifests",
      ],
      equipment: ["PCA-Registered Chainsaws", "Heavy Flatbed Trucks", "Stump Grinders"],
      permits: ["PCA RNCR-1000203 (NCR)", "PCA R4A-Q1-1000565 & 1000776 (Quezon)"],
      turnaround: "24–72 Hours",
    },
  },
  {
    id: "tree-inventory",
    title: "Tree Census & GPS Tagging",
    category: "Environmental Pre-Dev",
    icon: "ClipboardCheck",
    shortDesc: "Digital tree inventory, species classification, caliper sizing, and statutory pre-clearing audit.",
    metrics: ["GPS Geotagged", "CENRO/EMB Ready", "Full Audit"],
    specs: {
      deliverables: [
        "Sub-meter GPS coordinate logging and digital spatial GIS mapping",
        "DBH caliper measurement, health rating, and hazard risk indices",
        "Compilation of certified tree inventory dossier for DENR compliance",
      ],
      equipment: ["Laser Diameter Calipers", "Trimble GIS Field Loggers", "Ultrasonic Sonic Tomograph"],
      permits: ["DENR Pre-Clearance Baseline Verification"],
      turnaround: "3–5 Days per 100 Hectares",
    },
  },
  {
    id: "plant-nursery",
    title: "Native Seedling Propagation",
    category: "Batangas Facilities",
    icon: "Sprout",
    shortDesc: "Production of acclimatized native forest saplings and compensatory planting stocks across 3 farms.",
    metrics: ["150K+ Stock", "3 Nurseries", "1:50/1:100 Ratio"],
    specs: {
      deliverables: [
        "Containerized native hardwood stocks (Narra, Molave, Ipil, Banaba)",
        "Compensatory seedling turnover certificates signed by CENRO",
        "Pre-conditioned nursery trees for immediate commercial landscape installation",
      ],
      equipment: ["Sitio Latag Nursery Facility (100k cap)", "Tumaway Farm (80k cap)", "Aya Ecological Nursery (50k cap)"],
      permits: ["DENR Accreditation DENR-IVA-BAT-2012-001", "DENR Certificate of Seed Origin"],
      turnaround: "Immediate Stock Dispatch",
    },
  },
  {
    id: "reforestation",
    title: "Watershed Reforestation",
    category: "National Greening",
    icon: "Mountain",
    shortDesc: "Multi-year watershed rehabilitation, carbon-sink propagation, and NGP plantation maintenance.",
    metrics: ["2,627 Hectares", "Best NGP 2015", "3-Year Care"],
    specs: {
      deliverables: [
        "Baseline soil test, contour staking, and endemic seedling installation",
        "Firebreak boundary construction and brush control maintenance",
        "Quarterly survival monitoring with free replacement turnover",
      ],
      equipment: ["4x4 Reforestation Support Trucks", "Micro-Irrigation Pumps", "Brushcutters"],
      permits: ["DBP Forest Program (Accreditation 11-2005)", "DENR-NGP MoA"],
      turnaround: "Multi-Year Phased Execution",
    },
  },
  {
    id: "commercial-landscaping",
    title: "Highway & Commercial Greening",
    category: "Civil Landscaping",
    icon: "Flower2",
    shortDesc: "Turnkey landscape architecture execution for corporate campuses, tollway interchanges, and medians.",
    metrics: ["Highway Scale", "Slope Turfing", "Civil Ready"],
    specs: {
      deliverables: [
        "Hardscape & softscape installation with automated irrigation layout",
        "Slope stabilization, hydroseeding, and erosion prevention blankets",
        "Architectural specimen tree placement and mature sod grass establishment",
      ],
      equipment: ["Hydroseeding Equipment", "Skid Steer Loaders", "Trenchers"],
      permits: ["DPWH Right-of-Way Landscaping Permit"],
      turnaround: "Contract-Scheduled",
    },
  },
  {
    id: "soil-nursery-boxes",
    title: "Soil Media & Custom Tree Boxes",
    category: "Specialized Materials",
    icon: "Layers",
    shortDesc: "Bulk loam topsoil, organic compost blends, and industrial-grade timber/steel nursery holding boxes.",
    metrics: ["Lab Tested", "Custom Built", "Bulk Supply"],
    specs: {
      deliverables: [
        "Screened loam soil, volcanic pumice, and organic compost blends",
        "Heavy-duty treated wooden tree boxes for urban holding & streetscapes",
        "Bulk 10-wheeler dump truck delivery with batch laboratory testing",
      ],
      equipment: ["10-Wheeler Dump Trucks", "Rotary Soil Screens", "Industrial Box Fabrication Shop"],
      permits: ["Quarantine Transport Pass (if cross-regional)"],
      turnaround: "24–48 Hours Bulk Delivery",
    },
  },
];
