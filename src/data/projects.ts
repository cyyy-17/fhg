export interface ProjectItem {
  id: string;
  client: string;
  title: string;
  location: string;
  scope: string;
  category: "infrastructure" | "commercial" | "reforestation";
  badge: "Ongoing" | "Completed";
  imageUrl?: string;
  year?: string;
  contractValue?: string;
}

export const projectsData: ProjectItem[] = [
  {
    id: "giga-ace-6-isla-wind",
    client: "Giga ACE 6, Inc. (AC Energy / Ayala)",
    title: "Quezon North Wind Project (Isla Wind Farm)",
    location: "Brgy. Pandan & Masicap, Real, Quezon; Brgy. Cagsiay III, Mauban; Pakil, Laguna",
    scope: "Tree removal, GPS tree inventory & tagging, securing DENR cutting permits, and supply/delivery of compensatory seedling replacements for access roads, met mast, jetty port, batching plant, and temporary facilities. Conferred 3,000,000 Safe Manhours Without LTI.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "keyland-vermira",
    client: "Keyland Corporation",
    title: "Vermira Residential Subdivision Project",
    location: "Brgy. Lumbang & Talisay, Lipa City, Batangas",
    scope: "Tree removal, area clearing works, compensatory seedling turnover, and comprehensive civil landscaping works for major residential estate.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "mdc-alveo-caleia",
    client: "Makati Development Corporation (Ayala Land)",
    title: "Alveo Village 2 (Caleia) Vermosa Estate",
    location: "Vermosa Boulevard, Imus, Cavite",
    scope: "Tree cutting, specimen earthballing, root excavation, crane transit, and supply/delivery of statutory native seedling replacements for high-end residential community.",
    category: "commercial",
    badge: "Ongoing"
  },
  {
    id: "mdc-sereneo-nuvali",
    client: "Makati Development Corporation (Ayala Land)",
    title: "Sereneo (Alveo 6) Nuvali Masterplanned Estate",
    location: "Nuvali, Santa Rosa, Laguna",
    scope: "Tree cutting, large-scale earthballing, root excavation, crane transit, specimen relocation, and delivery of acclimatized seedling replacements.",
    category: "commercial",
    badge: "Ongoing"
  },
  {
    id: "slex-tr4",
    client: "South Luzon Tollway Corp. / San Miguel Corp.",
    title: "SLEX Toll Road 4 (TR4) Expressway Extension",
    location: "Makban to Tiaong & Candelaria, Quezon; Alaminos & Calamba, Laguna",
    scope: "Extensive tree cutting, coconut palm felling under PCA permits, earthballing, right-of-way corridor clearing, and compensatory seedling replacement for Packages B, C, D, E, and F.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "subway-cp101",
    client: "EEI Corporation",
    title: "Metro Manila Subway Project (MMSP) CP101",
    location: "Valenzuela Depot, Tandang Sora, Quirino Hwy, Ugong & VMMC, Quezon City",
    scope: "Tree cutting and earthballing works intended for subway station demolition, tunnel shaft access, and depot facility establishment.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "adhi-ptpp-railway",
    client: "ADHI PTPP Joint Venture",
    title: "Malolos-Clark Railway Project (MCRP) Package CP S-01",
    location: "Solis to Blumentritt, Manila",
    scope: "Tree cutting, mature specimen earthballing, railway right-of-way corridor clearing, and delivery of statutory seedling replacements along high-density urban rail alignment.",
    category: "infrastructure",
    badge: "Ongoing"
  },
  {
    id: "candaba-3rd-viaduct",
    client: "Leighton Contractors (Asia) Limited",
    title: "Candaba Central Infill (3rd Viaduct) Expressway Project",
    location: "Pulilan, Bulacan to Apalit, Pampanga",
    scope: "Expressway embankment tree removal, water marsh vegetative buffer management, and turn-over of certified compensatory seedling replacement.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "smdc-calm-dawn",
    client: "SM Development Corporation / Vancouver",
    title: "Calm Residences & Dawn Residences Commercial Estates",
    location: "Santa Rosa City, Laguna",
    scope: "Pre-construction tree cutting, mature specimen earthballing, and site clearing works to give way for multi-building residential condominium communities.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "sm-prime-nationwide",
    client: "SM Prime Holdings, Inc. / SMDC",
    title: "Nationwide Mall Expansions & Commercial Complex Greening",
    location: "Metro Manila, Cavite, Laguna, Batangas, Bulacan, Clark (24+ Malls & 27 Greening Contracts)",
    scope: "Multi-site tree removal, earthballing, carpark expansions (SM Megamall, SM MOA, SM Southmall, SM Batangas, SM Trece Martires, SM Calamba, SM Clark), and corporate container plant supply.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "zambales-ngp-csd",
    client: "DENR – PENRO Zambales",
    title: "National Greening Program (NGP) Comprehensive Site Development",
    location: "Sitio Ulpoy, Iba (757 ha) & Susong Dalaga, Sta. Cruz, Zambales (1,870 ha)",
    scope: "2,627 hectares Comprehensive Site Development (CSD) encompassing indigenous seedling propagation, contour plantation establishment, 3-year firebreak maintenance, and forest protection (Awarded Best NGP Site 2015).",
    category: "reforestation",
    badge: "Completed"
  },
  {
    id: "mdc-areza-lipa",
    client: "Ayala Land Estates, Inc. / MDC",
    title: "Areza Commercial & Institutional Estate Phase 1 & 2",
    location: "Brgy. Bulacnin, Lipa City, Batangas",
    scope: "Tree removal, mature specimen earthballing, site clearing, and compensatory forest tree replacement delivery for new Batangas commercial center.",
    category: "commercial",
    badge: "Completed"
  },
  {
    id: "mdc-centrala-pampanga",
    client: "Makati Development Corporation",
    title: "Centrala Commercial Land Development Estate",
    location: "Brgy. Miming, Angeles City, Pampanga",
    scope: "Pre-development tree cutting, site clearing, temporary nursery establishment, and supply/delivery of replacement seedlings.",
    category: "commercial",
    badge: "Ongoing"
  },
  {
    id: "prime-metro-bmd",
    client: "Prime Metro BMD Corporation",
    title: "Isla Wind Farm & Wawa Tayabasan Civil Clearing",
    location: "Real & Mauban, Quezon; Wawa Tayabasan, Antipolo, Rizal",
    scope: "Heavy tree cutting and earthballing for jetty port, batching plant, temporary facilities, and water infrastructure corridors.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "nlex-slex-connector",
    client: "NLEX Corporation",
    title: "NLEX-SLEX Connector Road (Section 1 & 2)",
    location: "C-3 Caloocan Interchange to PUP Sta. Mesa, Manila",
    scope: "Controlled sectional tree dismantling along active PNR railway corridor, utility relocation coordination, and zero-damage felling.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "shimizu-lrt1-subway",
    client: "Shimizu Corporation / Shimizu-Fujita-Takenaka-EEI JV",
    title: "LRT Line 1 Cavite Extension & Subway Joint Venture",
    location: "LRTA Compound, Pasay City & Metro Manila Alignments",
    scope: "Urban tree cutting, earthballing, and root-conditioning for LRT-1 Cavite Extension and subway station packages.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "bouygues-lrt1",
    client: "Bouygues Travaux Publics Philippines, Inc.",
    title: "LRT Line 1 Cavite Extension Corridor (Package 1)",
    location: "Baclaran Station to Dr. A. Santos Ave., Parañaque & Las Piñas City",
    scope: "Corridor tree cutting, specimen earthballing, and root-conditioning along elevated guideway right-of-way.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "sta-clara-nscr",
    client: "Sta. Clara International Corporation",
    title: "NSCR Railway Corridor & Manila Water Treatment Plant",
    location: "Tutuban to Malolos, Bulacan & Cardona, Rizal",
    scope: "Supply of specialized labor, tools, and heavy chainsaws for coconut and fruit-bearing tree clearing; spillway and water facility greening.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "bcda-lawton-widening",
    client: "Northern Builders / BCDA",
    title: "Lawton Avenue Widening Project (Phase 1 & Phase 2)",
    location: "5th Avenue to Bayani Road Junction, Taguig City",
    scope: "Urban tree cutting, mechanical tree earthballing, and root-ball extraction for major arterial avenue expansion.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "dmci-skyway-stage3",
    client: "D.M. Consunji, Inc. (DMCI)",
    title: "Metro Manila Skyway Stage 3 & Stage 2 Connectors",
    location: "Buendia, Makati to Balintawak, Quezon City & Las Piñas",
    scope: "Controlled sectional tree removal, nighttime crane rigging near elevated highway structures, and median tree relocation.",
    category: "infrastructure",
    badge: "Completed"
  },
  {
    id: "dbp-watershed-forest",
    client: "Development Bank of the Philippines (DBP Forest Program)",
    title: "Provincial Watershed Preservation & Agro-Forestry",
    location: "Baler, Aurora; Marinduque; Nueva Vizcaya; Batangas",
    scope: "Watershed reforestation, supply and delivery of high-grade forest saplings, fruit trees, and continuous plantation nurturing under DBP Accreditation No. 11-2005.",
    category: "reforestation",
    badge: "Completed"
  },
  {
    id: "marikina-watershed-denr",
    client: "DENR / River Basin Control Office",
    title: "Upper Marikina River Basin Protected Landscape",
    location: "Antipolo & Baras, Rizal",
    scope: "Plantation establishment of indigenous hardwood seedlings (Narra, Kupang, Tindalo) with post-planting nurturing across protected river basins.",
    category: "reforestation",
    badge: "Completed"
  }
];
