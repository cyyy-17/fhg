export interface ProtocolStep {
  step: string;
  title: string;
  badge: string;
  desc: string;
  deliverables: string[];
}

export const protocolSteps: ProtocolStep[] = [
  {
    step: "01",
    title: "Pre-Development Tree Census & GPS Tagging",
    badge: "Phase 1: Compliance Assessment",
    desc: "Rigorous field arboricultural survey assessing caliper diameter, species classification, structural integrity, and exact GPS spatial coordinates.",
    deliverables: ["Geotagged Tree Density Map", "Health & Hazard Assessment Log", "Preliminary Earthballing Feasibility Report"]
  },
  {
    step: "02",
    title: "DENR / PCA Permitting & LGU Clearance",
    badge: "Phase 2: Statutory Approval",
    desc: "Turnkey management of statutory Special Tree Cutting Permits (STCP) or Earthballing Clearances from CENRO, PENRO, EMB, and PCA.",
    deliverables: ["Complete DENR/PCA Dossier Filing", "Barangay & LGU Endorsements", "100% Zero-Infraction Legal Clearance"]
  },
  {
    step: "03",
    title: "Controlled Earthballing & Heavy Crane Transit",
    badge: "Phase 3: Tactical Execution",
    desc: "Excavation following scientific root-ball guidelines, burlap wire wrapping, hydraulic crane rigging, and escorted night transit to recipient holding zones.",
    deliverables: ["Root-Ball Pruning & Hydration", "25T/50T Crane Boom Rigging", "Secure Flatbed Transit to Holding Zone"]
  },
  {
    step: "04",
    title: "Compensatory Seedling Turn-Over & Care",
    badge: "Phase 4: Ecological Legacy",
    desc: "Supply and physical turnover of mandated compensatory native forest seedlings (1:50 or 1:100 ratio) directly from our 100,000-capacity Batangas nurseries.",
    deliverables: ["100K-Capacity Nursery Delivery", "DENR Turn-Over Certificate Receipt", "6-Month Post-Planting Survival Warranty"]
  }
];
