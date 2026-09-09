export type EquipmentCategory =
  | "chainsaws"
  | "heavy-lift"
  | "excavation"
  | "processing"
  | "irrigation";

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory;
  model: string;
  quantity: string;
  capacity: string;
  compliance: string;
  primaryRole: string;
  status: "Active Fleet" | "Pre-Mobilized";
}

export const equipmentFleet: EquipmentItem[] = [
  {
    id: "stihl-heavy-chainsaws",
    name: "Industrial Heavy-Duty Forestry Chainsaws",
    category: "chainsaws",
    model: "Stihl MS660 / MS880 Magnum Series",
    quantity: "89 Units Registered",
    capacity: "91.6cc to 121.6cc • 28\" to 48\" Guide Bars",
    compliance: "DENR CENRO / PENRO Registered & Permitted",
    primaryRole: "Large diameter tree felling, sectional urban dismantle & emergency road clearance.",
    status: "Active Fleet",
  },
  {
    id: "rigging-aerial-gear",
    name: "Arborist Aerial Climbing & Controlled Rigging Kits",
    category: "chainsaws",
    model: "Petzl Sequoia / Buckingham Rigging Blocks",
    quantity: "14 Full Rigger Sets",
    capacity: "5,000 kg Tensile Breaking Strength",
    compliance: "OSHA & DOLE Construction Safety Standards",
    primaryRole: "High-angle tree dismantling near live high-voltage transmission lines and roofs.",
    status: "Active Fleet",
  },
  {
    id: "hydraulic-crane-50t",
    name: "Telescopic Boom Hydraulic Mobile Crane",
    category: "heavy-lift",
    model: "Tadano / Kato 50-Ton Heavy Crane",
    quantity: "Dedicated Deployment Fleet",
    capacity: "50-Ton Capacity • 42-Meter Max Boom Height",
    compliance: "Third-Party Load-Tested Certification",
    primaryRole: "Extraction and placement of multi-ton root-balled heritage trees onto transport beds.",
    status: "Pre-Mobilized",
  },
  {
    id: "boom-trucks",
    name: "Multi-Axle Boom Trucks with Hydraulic Knuckle Crane",
    category: "heavy-lift",
    model: "Isuzu Giga / Hino 10-Wheeler with Unic Crane",
    quantity: "6 Units Operational",
    capacity: "12-Ton Bed Capacity • 5-Ton Lift Winch",
    compliance: "LTO Commercial & Heavy Highway Registered",
    primaryRole: "Express hauling and self-loading of earthballed specimen saplings across provinces.",
    status: "Active Fleet",
  },
  {
    id: "excavator-root-baller",
    name: "Crawler Excavators with Root Balling Buckets",
    category: "excavation",
    model: "Komatsu PC200 / CAT 320 Hydraulic Excavators",
    quantity: "Fleet Mobilization Unit",
    capacity: "20-Ton Class • Custom Root-Trenching Bucket",
    compliance: "DOLE Safety Certified Heavy Machinery",
    primaryRole: "Deep radial root-ball trench excavation without damaging vascular root system.",
    status: "Active Fleet",
  },
  {
    id: "wood-chippers",
    name: "Heavy Industrial Brush & Wood Chippers",
    category: "processing",
    model: "Vermeer / Bandit Industrial Chipper Units",
    quantity: "4 High-Output Units",
    capacity: "Up to 15\" Log Diameter Continuous Feeding",
    compliance: "Clean Air & Environmental Noise Regulated",
    primaryRole: "Zero-waste reduction of tree canopies into organic mulch for soil stabilization.",
    status: "Active Fleet",
  },
  {
    id: "water-tankers",
    name: "Heavy Mobile Nursery Water Tankers",
    category: "irrigation",
    model: "10,000-Liter High-Pressure Water Tankers",
    quantity: "3 Highway Units",
    capacity: "10,000 Liters with Multi-Spray Mist Nozzles",
    compliance: "BFP & Municipal Inspection Approved",
    primaryRole: "Hydration of balled root masses during long-distance transit and highway greening.",
    status: "Active Fleet",
  },
  {
    id: "pca-certified-saws",
    name: "PCA-Registered Coconut Palm Chainsaws",
    category: "chainsaws",
    model: "Stihl MS382 Heavy Hardwood Cutting Units",
    quantity: "26 Permitted Units (NCR & Laguna)",
    capacity: "72.2cc • High-Torque Fibrous Palm Blade",
    compliance: "PCA Permits RNCR-00958 & R4-05595",
    primaryRole: "Licensed commercial coconut felling and lumber salvage for solar & agro estates.",
    status: "Active Fleet",
  },
];
