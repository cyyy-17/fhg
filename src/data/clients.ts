export interface ClientItem {
  id: string;
  name: string;
  sector: "Infrastructure & Heavy Construction" | "Real Estate & Commercial" | "Energy & Industrial" | "Government & Financial";
  projectSample: string;
}

export const clientsData: ClientItem[] = [
  { id: "smc", name: "San Miguel Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "SLEX TR4, ACTEX, CTBEX" },
  { id: "ayala-mdc", name: "Makati Development Corp. (Ayala)", sector: "Real Estate & Commercial", projectSample: "Nuvali, Vermosa, Centrala, ARCA South" },
  { id: "sm-prime", name: "SM Prime Holdings / SMDC", sector: "Real Estate & Commercial", projectSample: "27+ Malls & High-Rise Residences" },
  { id: "eei", name: "EEI Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "Metro Manila Subway Project CP101" },
  { id: "nlex", name: "NLEX Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "NLEX-SLEX Connector, Candaba Viaduct" },
  { id: "dmci", name: "D.M. Consunji, Inc. (DMCI)", sector: "Infrastructure & Heavy Construction", projectSample: "Skyway Stage 3, CALAX, NSCR PNR Clark" },
  { id: "first-balfour", name: "First Balfour", sector: "Infrastructure & Heavy Construction", projectSample: "LRT-1 Cavite Extension" },
  { id: "leighton", name: "Leighton Contractors", sector: "Infrastructure & Heavy Construction", projectSample: "Candaba 3rd Viaduct Expansion" },
  { id: "taisei", name: "Taisei Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "NSCR Railway Corridor" },
  { id: "shimizu", name: "Shimizu Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "Subway Joint Ventures" },
  { id: "bouygues", name: "Bouygues Travaux Publics", sector: "Infrastructure & Heavy Construction", projectSample: "LRT-1 Infrastructure" },
  { id: "denr", name: "DENR / PENRO / CENRO", sector: "Government & Financial", projectSample: "National Greening Program (11 Regions)" },
  { id: "dbp", name: "Development Bank of the Philippines", sector: "Government & Financial", projectSample: "DBP Forest Program Partner" },
  { id: "dpwh", name: "DPWH Region IV-A", sector: "Government & Financial", projectSample: "Laguna Lake Highway, National Arterials" },
  { id: "nia", name: "National Irrigation Administration", sector: "Government & Financial", projectSample: "Pantabangan Watershed Stabilization" },
  { id: "isla-wind", name: "Isla Wind Power Project", sector: "Energy & Industrial", projectSample: "Rizal & Quezon Wind Farm Corridors" },
  { id: "cleantech", name: "CleanTech Global Renewables", sector: "Energy & Industrial", projectSample: "Calatagan 50MW Solar Facility" },
  { id: "lafarge", name: "LafargeHolcim", sector: "Energy & Industrial", projectSample: "Angono Quarry Perimeter Greening" },
  { id: "republic-cement", name: "Republic Cement", sector: "Energy & Industrial", projectSample: "Teresa Environmental Buffer Zone" },
  { id: "megawide", name: "Megawide Construction Corp.", sector: "Infrastructure & Heavy Construction", projectSample: "Commercial Infrastructure Hubs" },
  { id: "filinvest", name: "Filinvest Land, Inc.", sector: "Real Estate & Commercial", projectSample: "Township Landscape Execution" },
  { id: "robinsons", name: "Robinsons Land Corp.", sector: "Real Estate & Commercial", projectSample: "Provincial Commercial Centers" },
  { id: "rockwell", name: "Rockwell Land", sector: "Real Estate & Commercial", projectSample: "Premium Residential Grounds" },
  { id: "megaworld", name: "Megaworld Corporation", sector: "Real Estate & Commercial", projectSample: "Urban Township Specimen Placement" },
  { id: "mptc", name: "Metro Pacific Tollways (MPTC)", sector: "Infrastructure & Heavy Construction", projectSample: "CALAX Tollway Alignment" }
];
