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

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050e07] text-[#f0fbf0] selection:bg-[#ffd600] selection:text-[#050e07] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ValuePillars />
        <CompanyProfileHub />
        <ServicesGrid />
        <OperationsProofHub />
        <NurseryHub />
        <ProcurementHub />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}

