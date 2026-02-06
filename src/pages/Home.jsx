import LandingNavbar from "@/components/landing/LandingNavbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import ProblemSolution from "@/components/landing/ProblemSolution";
import FeaturesZigzag from "@/components/landing/FeaturesZigzag";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Pricing from "@/components/landing/Pricing";
import CTAFinal from "@/components/landing/CTAFinal";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <LandingNavbar />
      <Hero />
      <SocialProof />
      <ProblemSolution />
      <FeaturesZigzag />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTAFinal />
      <Footer />
    </div>
  );
}
