import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Testimonials from "../components/Testimonials";
import PricingPlan from "../components/PricingPlan";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";
import ContactUs from "@/components/ContactUs";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <AboutUs />
      {/* <Testimonials /> */}
      <PricingPlan />
      <ContactUs />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
