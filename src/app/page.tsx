import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ValuePillars from "@/components/ValuePillars";
import CompanyProfileHub from "@/components/CompanyProfileHub";
import ServicesGrid from "@/components/ServicesGrid";
import OperationsProofHub from "@/components/OperationsProofHub";
import NurseryHub from "@/components/NurseryHub";
import ProcurementHub from "@/components/ProcurementHub";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { getAdminStore } from "@/lib/storage";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const store = await getAdminStore();

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "Forest Hills Garden | Industrial Tree Services Philippines",
    description:
      "Philippines' premier contractor for tree earthballing, precision chainsaw felling, DENR permits, and plant nurseries since 1998. Trusted by SMC, Ayala & EEI.",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Core Contracting Capabilities",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Large-Scale Tree Earthballing & Relocation",
          url: `${SITE_URL}/services#earthballing`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Certified Chainsaw Tree Cutting (90 Fleet)",
          url: `${SITE_URL}/services#tree-cutting`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "DENR Tree Inventory & STCP Permitting",
          url: `${SITE_URL}/services#tree-inventory`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Batangas Plant Nursery Seedling Supply",
          url: `${SITE_URL}/nurseries`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Watershed Reforestation & Commercial Greening",
          url: `${SITE_URL}/services#reforestation`,
        },
      ],
    },
  };

  return (
    <div className="relative min-h-screen bg-[#050d07] text-[#f6f7f4] selection:bg-[#22c55e] selection:text-[#050d07] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero initialCompany={store.company} />
        <Marquee />
        <ValuePillars />
        <CompanyProfileHub initialCompany={store.company} initialProtocol={store.protocol} />
        <ServicesGrid initialServices={store.services} />
        <OperationsProofHub
          initialProjects={store.projects}
          initialClients={store.clients}
          initialEquipment={store.equipment}
        />
        <NurseryHub initialSpecies={store.species} initialCompany={store.company} />
        <ProcurementHub
          initialDocuments={store.documents}
          initialFaqs={store.faqs}
        />
        <ContactSection initialCompany={store.company} />
      </main>
      <Footer initialCompany={store.company} />
      <FloatingActions />
    </div>
  );
}

