import HeroSection from "../components/Home/HeroSection";
import EventHighlights from "../components/Home/EventHighlights";
import TicketPricing from "../components/Home/TicketPricing";
import CallToAction from "../components/Home/CallToAction";
import SocialLinks from "../components/Home/SocialLinks";
import Footer from "../components/Home/Footer";

function Home() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection />
      <EventHighlights />
      <TicketPricing />
      <CallToAction />
      <SocialLinks />
      <Footer />
    </div>
  );
}

export default Home;

