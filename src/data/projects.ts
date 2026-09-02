export interface ProjectItem {
  id: string;
  client: string;
  title: string;
  location: string;
  scope: string;
  category: "infrastructure" | "commercial" | "reforestation";
  badge: "Ongoing" | "Completed";
}

export const projectsData: ProjectItem[] = [
  {
    id: "slex-tr4",
    client: "South Luzon Tollway Corp. / San Miguel Corp.",
    title: "SLEX Toll Road 4 (TR4) Expressway Extension",
    location: "Makban to Tiaong & Candelaria, Quezon",
    scope: "Extensive tree cutting, earthballing, right-of-way corridor clearing, tree inventory, and seedling replacement for Packages B, C, D, E, and F.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "subway-cp101",
    client: "EEI Corporation",
    title: "Metro Manila Subway Project (MMSP) CP101",
    location: "Tandang Sora, Quirino Hwy, Ugong & Depot, Valenzuela / QC",
    scope: "Tree cutting and earthballing works intended for subway stations demolition, tunnel shaft access, and depot facility establishment.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "isla-wind",
    client: "Isla Wind Power Project",
    title: "Wind Farm Access Roads & Turbine Corridors",
    location: "Quezon & Rizal Mountain Ranges",
    scope: "Right-of-way clearing, earthballing, slope clearing, and forestry compliance along high-altitude wind turbine transmission access roads.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "nlex-slex-connector",
    client: "NLEX Corporation",
    title: "NLEX-SLEX Connector Road Project (Section 2)",
    location: "España Blvd. to Sta. Mesa, Manila",
    scope: "Controlled sectional tree dismantling along active PNR railway corridor, utility relocation coordination, and zero-damage felling.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "mdc-nuvali",
    client: "Makati Development Corporation (Ayala Land)",
    title: "Nuvali Commercial & Residential Developments",
    location: "Santa Rosa & Calamba, Laguna",
    scope: "Heritage tree earthballing, root excavation, crane transit, specimen relocation, and estate perimeter landscaping across multiple sectors.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "smdc-residences",
    client: "SM Prime Holdings / SMDC",
    title: "Multi-Site High-Rise Residential Estates",
    location: "Metro Manila, Cavite & Tagaytay",
    scope: "Pre-construction tree cutting permits, mature specimen earthballing, compensatory sapling delivery, and corporate ground development for 27+ projects.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "zambales-ngp",
    client: "DENR / PENRO Zambales",
    title: "National Greening Program (NGP) Watershed Reforestation",
    location: "Zambales Mountain Range Corridor",
    scope: "Comprehensive plantation establishment, 2,627-hectare indigenous seedling propagation, contour planting, and 3-year firebreak maintenance.",
    category: "reforestation",
    badge: "Completed"
  },
  {
    id: "candaba-viaduct",
    client: "NLEX Corporation / Leighton Contractors",
    title: "Candaba 3rd Viaduct Expansion Project",
    location: "Pulilan, Bulacan to Apalit, Pampanga",
    scope: "Precision tree removal along expressway embankment, water marsh buffer tree management, and compensatory native sapling turn-over.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "dmci-skyway",
    client: "D.M. Consunji, Inc. (DMCI)",
    title: "Metro Manila Skyway Stage 3 Connector",
    location: "Buendia, Makati to Balintawak, Quezon City",
    scope: "Urban corridor clearance, sectional crane tree cutting near elevated flyovers, and arterial road median tree transplantation.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "first-balfour-lrt1",
    client: "First Balfour / Bouygues Travaux Publics",
    title: "LRT-1 Cavite Extension Project (Package 1)",
    location: "Parañaque, Las Piñas to Bacoor, Cavite",
    scope: "Tree cutting and relocation along Manila-Cavite alignment, DENR STCP permit management, and compensatory stock delivery.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "vermoza-ayala",
    client: "Makati Development Corporation (Ayala Land)",
    title: "Vermosa Mixed-Use Estate Development",
    location: "Imus & Dasmariñas, Cavite",
    scope: "Large-scale tree census, earthballing of mature mango and acacia trees, and landscape propagation setup across central boulevards.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "sm-city-trece",
    client: "SM Prime Holdings",
    title: "SM City Trece Martires Commercial Center",
    location: "Trece Martires City, Cavite",
    scope: "Site clearing, commercial tree removal, green belt landscape tree planting, and nursery container plant supply.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "laguna-lake-highway",
    client: "DPWH Region IV-A",
    title: "Laguna Lake Highway Green Corridor",
    location: "Taguig City to Taytay, Rizal",
    scope: "Floodway dike tree management, shoreline vegetative buffer planting, and PCA coconut palm clearance.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "smdc-wind-tagaytay",
    client: "SM Development Corporation",
    title: "Wind Residences & Highlands Estates",
    location: "Tagaytay City, Cavite",
    scope: "Cold-climate pine and ornamental tree earthballing, slope retaining greening, and perimeter landscape installation.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "centrala-ayala",
    client: "Makati Development Corporation",
    title: "Centrala Commercial Estate Development",
    location: "San Fernando, Pampanga",
    scope: "Pre-development tree inventory, site tree earthballing, temporary nursery maintenance, and replanting into main park boulevards.",
    category: "commercial",
    badge: "Ongoing"
  },
  {
    id: "cavite-tagaytay-calamba",
    client: "San Miguel Infrastructure",
    title: "Cavite-Tagaytay-Batangas Expressway (CTBEX)",
    location: "Silang, Cavite to Nasugbu, Batangas",
    scope: "Right-of-way felling, PCA coconut clearing, coffee plantation salvaging, and statutory CENRO compliance processing.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "marikina-watershed",
    client: "DENR EMB / River Basin Control Office",
    title: "Upper Marikina River Basin Protected Landscape",
    location: "Antipolo & Baras, Rizal",
    scope: "Plantation establishment of 120,000 indigenous hardwood seedlings (Narra, Kupang, Tindalo) with post-planting nurturing.",
    category: "reforestation",
    badge: "Completed"
  },
  {
    id: "arca-south",
    client: "Makati Development Corporation",
    title: "ARCA South Mixed-Use Transit Hub",
    location: "FTI Complex, Taguig City",
    scope: "Urban tree transplanting, root pruning, hydraulic crane rigging, and sustainable landscape tree preservation.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "calax-connector",
    client: "DMCI / Metro Pacific Tollways",
    title: "Cavite-Laguna Expressway (CALAX) Interchanges",
    location: "Santa Rosa to Kawit, Cavite",
    scope: "Precision tree cutting near high-tension pylons, interchange embankment landscaping, and compensatory seedling supply.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "batangas-solar-farm",
    client: "CleanTech Global Renewables",
    title: "50MW Calatagan Solar Farm Corridor",
    location: "Calatagan & Balayan, Batangas",
    scope: "Solar field shading tree felling, shrub clearing, boundary vegetative buffer planting, and soil condition treatments.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "sm-city-batangas",
    client: "SM Prime Holdings",
    title: "SM City Batangas Expansion & Complex",
    location: "Batangas City, Batangas",
    scope: "Carpark expansion tree earthballing, roadside landscape felling, and decorative plant box delivery.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "pantabangan-watershed",
    client: "National Irrigation Administration / DENR",
    title: "Pantabangan-Carranglan Watershed Reforestation",
    location: "Nueva Ecija",
    scope: "Erosion prevention reforestation, 45,000 bamboo culm and native tree planting along critical reservoir feeder tributaries.",
    category: "reforestation",
    badge: "Completed"
  },
  {
    id: "actex-expansion",
    client: "SMC SLEX Inc.",
    title: "Alabang-Calamba-Sto. Tomas Expressway (ACTEX) Widening",
    location: "Biñan to Calamba, Laguna",
    scope: "Median barrier tree clearing, nighttime emergency chainsaw felling, and traffic-controlled right-of-way management.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "nuvali-solenad",
    client: "Ayala Malls / MDC",
    title: "Solenad Lakeside Commercial Park",
    location: "Nuvali, Santa Rosa, Laguna",
    scope: "Specimen weeping willow and acacia earthballing, lake-edge turfing, and ornamental shrub installation.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "sierra-madre-ngp",
    client: "DENR CENRO Real / Infanta",
    title: "Southern Sierra Madre Forest Corridor Recovery",
    location: "Real & General Nakar, Quezon",
    scope: "Community-partnered reforestation, 80 hectares of native Dipterocarp seedling planting, and forest protection patrols.",
    category: "reforestation",
    badge: "Completed"
  },
  {
    id: "pnr-clark-phase1",
    client: "Taisei-DMCI Joint Venture",
    title: "North-South Commuter Railway (NSCR) PNR Clark",
    location: "Tutuban, Manila to Malolos, Bulacan",
    scope: "Railway right-of-way clearing, commercial tree removal, PCA coconut tree permits, and tree inventory census.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "sm-fairview-tower",
    client: "SM Prime Holdings",
    title: "SM City Fairview Towers & BPO Hub",
    location: "Novaliches, Quezon City",
    scope: "Site preparatory tree earthballing, rooftop container tree installation, and premium garden loam delivery.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "tarlac-pangasinan-tpex",
    client: "San Miguel Holdings",
    title: "TPLEX Binalonan to Rosario Tollway Section",
    location: "Pangasinan to La Union Border",
    scope: "Interchange tree clearing, slope hydroseeding preparation, and compensatory planting along tollway perimeter.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "angono-quarry-rehab",
    client: "LafargeHolcim / Republic Cement",
    title: "Quarry Perimeter Greening & Buffer Zone",
    location: "Angono & Teresa, Rizal",
    scope: "Industrial quarry slope bio-engineering, vetiver grass planting, and fast-growing forest tree canopy setup.",
    category: "reforestation",
    badge: "Completed"
  },
  {
    id: "ayala-alviera",
    client: "Makati Development Corporation",
    title: "Alviera Mixed-Use Estate Corridor",
    location: "Porac, Pampanga",
    scope: "Pre-grading tree assessment, specimen acacia earthballing, estate nursery propagation, and golf course buffer planting.",
    category: "commercial",
    badge: "Ongoing"
  },
  {
    id: "slex-tr5-lucena",
    client: "San Miguel Infrastructure",
    title: "SLEX Toll Road 5 (TR5) Alignment Scouting",
    location: "Lucena City to Matnog, Sorsogon",
    scope: "Initial arboricultural alignment census, preliminary tree density survey, and environmental clearance planning.",
    category: "infrastructure",
    badge: "Ongoing"
  }
];
