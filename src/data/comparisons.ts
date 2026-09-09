export interface ComparisonScenario {
  id: string;
  title: string;
  category: string;
  location: string;
  metric: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
  beforeImage?: string;
  afterImage?: string;
}

export const comparisonScenarios: ComparisonScenario[] = [
  {
    id: "earthballing",
    title: "Centennial Heritage Tree Earthballing & Relocation",
    category: "Commercial Estate Preservation",
    location: "Ayala Land Nuvali & Vermosa Estates, Laguna/Cavite",
    metric: "98.7% Specimen Survival Rate",
    beforeLabel: "Pre-Excavation & Root Trenching",
    afterLabel: "Replanted in Masterplan Estate",
    beforeDesc: "Mature 60-year-old Mango & Acacia trees surveyed with root-ball caliper conditioning and wire wrapping.",
    afterDesc: "Transplanted via 50-ton hydraulic crane to permanent central park buffer with active root stimulants.",
    beforeImage: "/images/earthballing.jpg",
    afterImage: "/images/transplanted_trees.jpg",
  },
  {
    id: "corridor-clearing",
    title: "High-Tension Infrastructure Right-of-Way Clearing",
    category: "Expressway & Rail Corridors",
    location: "SLEX TR4 Extension & Metro Manila Subway CP101",
    metric: "Zero Downtime • 100% Safety Compliance",
    beforeLabel: "Overgrown Corridor Alignment",
    afterLabel: "DENR Certified Cleared Grade",
    beforeDesc: "Dense virgin right-of-way jungle with steep topography and active utility line hazards.",
    afterDesc: "Sectional controlled felling completed by 90-chainsaw certified crew, timber chipped and salvaged.",
    beforeImage: "/images/hero_canopy.jpg",
    afterImage: "/images/corridor_cleared.jpg",
  },
  {
    id: "watershed-reforestation",
    title: "Mountain Watershed Reforestation & Compensatory Planting",
    category: "Watershed & Ecological Restoration",
    location: "Zambales Mountain Range & Batangas Watersheds",
    metric: "150,000+ Native Saplings Established",
    beforeLabel: "Barren Infrastructure Buffer",
    afterLabel: "Vibrant Hardwood Reforestation",
    beforeDesc: "Surveyed degraded slope requiring mandatory compensatory forest planting under DENR guidelines.",
    afterDesc: "Thousands of native Narra, Apitong and Banaba saplings thriving under scheduled arboricultural maintenance.",
    beforeImage: "/images/corridor_cleared.jpg",
    afterImage: "/images/watershed_reforestation.jpg",
  },
];
