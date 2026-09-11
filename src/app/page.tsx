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

export const dynamic = "force-dynamic";

export default async function Home() {
  const store = await getAdminStore();

  return (
    <div className="relative min-h-screen bg-[#050d07] text-[#f6f7f4] selection:bg-[#22c55e] selection:text-[#050d07] overflow-x-hidden">
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

