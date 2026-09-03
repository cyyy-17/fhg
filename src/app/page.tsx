import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ValuePillars from "@/components/ValuePillars";
import AboutSection from "@/components/AboutSection";
import TimelineHistory from "@/components/TimelineHistory";
import ServicesGrid from "@/components/ServicesGrid";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import EquipmentShowcase from "@/components/EquipmentShowcase";
import ProjectExplorer from "@/components/ProjectExplorer";
import ComplianceProtocol from "@/components/ComplianceProtocol";
import Accreditations from "@/components/Accreditations";
import DocumentVault from "@/components/DocumentVault";
import ClientsWall from "@/components/ClientsWall";
import NurserySection from "@/components/NurserySection";
import NurseryCatalog from "@/components/NurseryCatalog";
import RfpConfigurator from "@/components/RfpConfigurator";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050e07] text-[#f0fbf0] selection:bg-[#ffd600] selection:text-[#050e07] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <ValuePillars />
        <AboutSection />
        <TimelineHistory />
        <ServicesGrid />
        <BeforeAfterSlider />
        <EquipmentShowcase />
        <ProjectExplorer />
        <ComplianceProtocol />
        <Accreditations />
        <DocumentVault />
        <ClientsWall />
        <NurserySection />
        <NurseryCatalog />
        <RfpConfigurator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
