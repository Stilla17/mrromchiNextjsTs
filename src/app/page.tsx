import AboutUs from "@/components/AboutUs";
import Contact from "@/components/Contact";
import Customers from "@/components/Customers";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Products from "@/components/Products";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Products />
      <Services />
      <AboutUs />
      <Customers />
      {/* <Contact /> */}
      <Footer />
    </main>
  );
}
