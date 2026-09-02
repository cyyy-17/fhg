import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ValuePillars from "@/components/ValuePillars";
import AboutSection from "@/components/AboutSection";
import ServicesGrid from "@/components/ServicesGrid";
import ProjectExplorer from "@/components/ProjectExplorer";
import ComplianceProtocol from "@/components/ComplianceProtocol";
import ClientsWall from "@/components/ClientsWall";
import Accreditations from "@/components/Accreditations";
import NurserySection from "@/components/NurserySection";
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
        <ServicesGrid />
        <ProjectExplorer />
        <ComplianceProtocol />
        <ClientsWall />
        <Accreditations />
        <NurserySection />
        <RfpConfigurator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
