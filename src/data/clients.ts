export interface ClientItem {
  id: string;
  name: string;
  sector: "Infrastructure & Heavy Construction" | "Real Estate & Commercial" | "Energy & Industrial" | "Government & Financial";
  projectSample: string;
}

export const clientsData: ClientItem[] = [
  { id: "giga-ace-6", name: "Giga ACE 6, Inc. (Ayala)", sector: "Energy & Industrial", projectSample: "Quezon North Wind Project (3M Safe Manhours)" },
  { id: "smc", name: "San Miguel Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "SLEX TR4, ACTEX, CTBEX Expressway Corridors" },
  { id: "ayala-mdc", name: "Makati Development Corp. (Ayala Land)", sector: "Real Estate & Commercial", projectSample: "Nuvali, Vermosa Caleia, Centrala, Areza Estates" },
  { id: "sm-prime", name: "SM Prime Holdings / SMDC", sector: "Real Estate & Commercial", projectSample: "24+ Malls, Calm & Dawn Residences, Greening" },
  { id: "eei", name: "EEI Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "Metro Manila Subway Project CP101 Stations & Depot" },
  { id: "keyland", name: "Keyland Corporation", sector: "Real Estate & Commercial", projectSample: "Vermira Project Subdivision Development" },
  { id: "prime-metro", name: "Prime Metro BMD Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "Isla Wind Farm & Wawa Tayabasan Earthballing" },
  { id: "adhi-ptpp", name: "ADHI PTPP Joint Venture", sector: "Infrastructure & Heavy Construction", projectSample: "Malolos-Clark Railway Project CP S-01" },
  { id: "leighton", name: "Leighton Contractors (Asia) Ltd.", sector: "Infrastructure & Heavy Construction", projectSample: "Candaba Central Infill (3rd Viaduct) Expansion" },
  { id: "shimizu-jv", name: "Shimizu-Fujita-Takenaka-EEI JV", sector: "Infrastructure & Heavy Construction", projectSample: "Metro Manila Subway & LRT-1 Cavite Alignments" },
  { id: "first-balfour", name: "First Balfour", sector: "Infrastructure & Heavy Construction", projectSample: "LRTA Line 1 Cavite Expansion & Institutional Sites" },
  { id: "dmci", name: "D.M. Consunji, Inc. (DMCI)", sector: "Infrastructure & Heavy Construction", projectSample: "Skyway Stage 3 & 2, LRT-2 East Masinag" },
  { id: "bouygues", name: "Bouygues Travaux Publics", sector: "Infrastructure & Heavy Construction", projectSample: "LRT-1 Guideway & Station Corridors" },
  { id: "sta-clara", name: "Sta. Clara International Corp.", sector: "Infrastructure & Heavy Construction", projectSample: "NSCR Railway Corridor & Manila Water Treatment" },
  { id: "northern-builders", name: "Northern Builders / BCDA", sector: "Infrastructure & Heavy Construction", projectSample: "Lawton Avenue Widening Phase 1 & 2" },
  { id: "nlex", name: "NLEX Corporation", sector: "Infrastructure & Heavy Construction", projectSample: "NLEX-SLEX Connector Road, PNR Track Realignment" },
  { id: "denr", name: "DENR / PENRO / CENRO", sector: "Government & Financial", projectSample: "National Greening Program (Best NGP Site 2015)" },
  { id: "dbp", name: "Development Bank of the Philippines", sector: "Government & Financial", projectSample: "DBP Forest Program Partner (Accreditation 11-2005)" },
  { id: "dpwh", name: "DPWH Region IV-A", sector: "Government & Financial", projectSample: "Laguna Lake Highway, National Arterials" },
  { id: "cleantech", name: "CleanTech Global Renewables", sector: "Energy & Industrial", projectSample: "Calatagan 50MW Solar Facility Corridor" },
  { id: "lafarge", name: "LafargeHolcim / Republic Cement", sector: "Energy & Industrial", projectSample: "Quarry Perimeter Greening & Buffer Zones" },
  { id: "mptc", name: "Metro Pacific Tollways (MPTC)", sector: "Infrastructure & Heavy Construction", projectSample: "CALAX Tollway Alignment Interchanges" }
];
