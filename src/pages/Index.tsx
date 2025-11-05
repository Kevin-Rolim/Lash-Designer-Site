import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Booking />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;