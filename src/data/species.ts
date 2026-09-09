export interface SpeciesItem {
  id: string;
  commonName: string;
  scientificName: string;
  category: "native" | "ornamental" | "bamboo" | "mature-balled";
  facility: "Sitio Latag (100K+)" | "Tumaway (80K+)" | "Aya (50K+)";
  availableSizes: string;
  growthRate: string;
  offsetCompliance: string;
  stockStatus: "Immediate Bulk Delivery" | "Acclimatized Balled" | "Batch In Production";
}

export const speciesData: SpeciesItem[] = [
  {
    id: "narra",
    commonName: "Narra (Philippine National Tree)",
    scientificName: "Pterocarpus indicus",
    category: "native",
    facility: "Sitio Latag (100K+)",
    availableSizes: "1.5m to 3.5m Saplings • 15–30cm Caliper",
    growthRate: "Medium to Fast Hardwood",
    offsetCompliance: "DENR Priority Reforestation Hardwood",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "banaba",
    commonName: "Banaba (Pride of India / Lavender Bloom)",
    scientificName: "Lagerstroemia speciosa",
    category: "ornamental",
    facility: "Aya (50K+)",
    availableSizes: "1.0m to 2.5m Seedling Bags • 10–20cm Balled",
    growthRate: "Moderate Flowering Tree",
    offsetCompliance: "Urban Green Corridor & DPWH Roadside",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "molave",
    commonName: "Molave (Philippine Teak)",
    scientificName: "Vitex parviflora",
    category: "native",
    facility: "Tumaway (80K+)",
    availableSizes: "1.2m to 2.0m Polybagged Saplings",
    growthRate: "Slow-Growing Dense Hardwood",
    offsetCompliance: "High-Value DENR Conservation Species",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "balitbitan",
    commonName: "Balitbitan (Pink Silk Tassel Tree)",
    scientificName: "Cynometra ramiflora",
    category: "native",
    facility: "Sitio Latag (100K+)",
    availableSizes: "1.5m to 3.0m Containerized Specimens",
    growthRate: "Moderate Coastal & Riparian",
    offsetCompliance: "Riverbank & Water Basin Stabilization",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "giant-bamboo",
    commonName: "Giant Bamboo / Kawayan Tinik",
    scientificName: "Bambusa blumeana / Gigantochloa",
    category: "bamboo",
    facility: "Sitio Latag (100K+)",
    availableSizes: "Rooted Culms • 2.0m to 4.0m Clump Clones",
    growthRate: "Rapid Soil Bio-Engineering",
    offsetCompliance: "NIA & DPWH Slope Anti-Erosion Mandate",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "mature-mango",
    commonName: "Heritage Carabao Mango (Balled Specimen)",
    scientificName: "Mangifera indica",
    category: "mature-balled",
    facility: "Aya (50K+)",
    availableSizes: "30cm to 65cm Caliper Root-Ball (2.5m Ø)",
    growthRate: "Full Mature Canopy Heritage",
    offsetCompliance: "Estate Masterplan Replanting Standard",
    stockStatus: "Acclimatized Balled",
  },
  {
    id: "kupang",
    commonName: "Kupang (Philippine Locust Tree)",
    scientificName: "Parkia timoriana",
    category: "native",
    facility: "Tumaway (80K+)",
    availableSizes: "1.5m to 2.8m Seedling Stocks",
    growthRate: "Fast Canopy Umbrella Hardwood",
    offsetCompliance: "DENR Watershed Greening Program",
    stockStatus: "Immediate Bulk Delivery",
  },
  {
    id: "tindalo",
    commonName: "Tindalo (Precious Red Hardwood)",
    scientificName: "Afzelia rhomboidea",
    category: "native",
    facility: "Tumaway (80K+)",
    availableSizes: "1.0m to 2.2m Hardened Seedlings",
    growthRate: "Slow Dense Heritage Hardwood",
    offsetCompliance: "National Greening Program Compensatory",
    stockStatus: "Batch In Production",
  },
];
