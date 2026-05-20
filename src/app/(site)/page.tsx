import Hero from "@/components/site/Hero";
import SectionAbout from "@/components/site/SectionAbout";
import RoomsGrid from "@/components/site/RoomsGrid";
import Differentials from "@/components/site/Differentials";
import Gallery from "@/components/site/Gallery";
import Testimonials from "@/components/site/Testimonials";
import Location from "@/components/site/Location";
import FAQ from "@/components/site/FAQ";
import FinalCTA from "@/components/site/FinalCTA";
import { getRooms } from "@/lib/data";

export default async function HomePage() {
  const rooms = await getRooms();
  return (
    <>
      <Hero />
      <SectionAbout />
      <RoomsGrid rooms={rooms} />
      <Differentials />
      <Gallery />
      <Testimonials />
      <Location />
      <FAQ />
      <FinalCTA />
    </>
  );
}
