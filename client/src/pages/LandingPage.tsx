import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Proposal from "@/components/Proposal";
import CommunityShowcase from "@/components/CommunityShowcase";

const LandingPage = () => {

  return (
    <>
      <Proposal />
      <CommunityShowcase />
      <Features />
      <FAQ />
      <Reviews />
      <Gallery />
      <Footer />
    </>
  );
};

export default LandingPage;
