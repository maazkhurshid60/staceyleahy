import Hero from "@/components/home/Hero";
import AreaMarquee from "@/components/home/AreaMarquee";
import Statement from "@/components/home/Statement";
import DealsRail from "@/components/home/DealsRail";
import NeighborhoodIndex from "@/components/home/NeighborhoodIndex";
import TwoPaths from "@/components/home/TwoPaths";
import JournalPreview from "@/components/home/JournalPreview";
import AboutTeaser from "@/components/home/AboutTeaser";
import Testimonials from "@/components/home/Testimonials";
import CtaBand from "@/components/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <AreaMarquee />
      <Statement />
      <DealsRail />
      <NeighborhoodIndex />
      <TwoPaths />
      <JournalPreview />
      <AboutTeaser />
      <Testimonials />
      <CtaBand />
    </>
  );
}
