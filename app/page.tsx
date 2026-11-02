import "react-day-picker/style.css";

import ContactSection from "@/components/ContactSection";
import DestinationsSection from "@/components/DestinationsSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SearchSection from "@/components/SearchSection";
import ServicesSection from "@/components/ServicesSection";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content">
        <HeroSection />
        <SearchSection />
        <ServicesSection />
        <DestinationsSection />
        <StatsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
