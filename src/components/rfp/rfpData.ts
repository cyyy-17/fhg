export const recommendations: Record<string, string[]> = {
  "Tree Earthballing & Relocation": [
    "Heavy Crane 25T/50T Rigging",
    "Root Ball Trenching Crew",
    "Burlap & Wire Conditioning",
    "Auxin Hormone Root Bath",
    "Special Tree Permit (DENR STCP)",
  ],
  "Certified Chainsaw Tree Cutting (89 Units)": [
    "89-Chainsaw Permitted Operators",
    "Sectional Aerial Riggers",
    "High-Tension Powerline Protocol",
    "Timber Transport Flatbeds",
  ],
  "PCA Coconut Tree Cutting & Trading": [
    "PCA Permit Enforcement Team",
    "Coco-Lumber Sawmill Routing",
    "Heavy Winch Rigging Equipment",
  ],
  "DENR Tree Inventory & Risk Tagging": [
    "GPS Digital Mapping Team",
    "Caliper & Risk Level Census",
    "DENR Special Tree Cutting Dossier",
  ],
  "Native Seedling Nursery Supply": [
    "100K-Capacity Nursery Allocation",
    "Indurated Container Stock",
    "Compensatory Proof Certification",
  ],
  "Watershed Reforestation & NGP": [
    "Contour Planting Labor Force",
    "3-Year Firebreak Maintenance",
    "Site Seedling Mortality Buffer",
  ],
};

export function calculateDeployment(volume: string) {
  let crew = "4–6 Certified Riggers & Sawyers";
  let machinery = "1x Crane / Boom Truck + 4x Chainsaws";
  let timeframe = "3–5 Working Days";
  let permitting = "CENRO STCP Pre-Survey Ready";

  if (volume.includes("11 to 50")) {
    crew = "8–14 Certified Personnel + 1 Safety Officer";
    machinery = "2x Heavy Boom Trucks + 8x Chainsaws + 1x Chipper";
    timeframe = "7–14 Working Days";
    permitting = "Full DENR STCP Clearance Dossier";
  } else if (volume.includes("51 to 200")) {
    crew = "16–28 Certified Personnel + 2 Safety Officers";
    machinery = "50T Crane + 4x Boom Trucks + 16x Chainsaws + Chippers";
    timeframe = "15–30 Working Days";
    permitting = "PENRO / Regional Director Special Tree Permit";
  } else if (volume.includes("200+")) {
    crew = "35–60 Certified Personnel (Staged Corridor Crews)";
    machinery = "Dedicated Multi-Crane Fleet + 30+ Heavy Chainsaws";
    timeframe = "Project Concession Phased Schedule";
    permitting = "Turnkey Infrastructure Priority STCP Clearance";
  } else if (volume.includes("seedlings")) {
    crew = "Nursery Propagation & Logistics Dispatch Team";
    machinery = "10,000L Water Tankers + Flatbed Seedling Haulers";
    timeframe = "Staggered Weekly Delivery Batches";
    permitting = "DENR Official Seedling Receipt & Offset Certificate";
  }

  return { crew, machinery, timeframe, permitting };
}
