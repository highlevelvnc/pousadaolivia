import type { Metadata } from "next";
import SectionAbout from "@/components/site/SectionAbout";
import Differentials from "@/components/site/Differentials";
import Location from "@/components/site/Location";

export const metadata: Metadata = {
  title: "Sobre a Pousada",
  description: "Conheca a Pousada Olivia em Praia Linda, Sao Pedro da Aldeia. Hospedagem familiar com cafe da manha caseiro.",
};

export default function SobrePage() {
  return (
    <>
      <section className="py-16 bg-shell">
        <div className="container text-center max-w-2xl mx-auto" data-reveal>
          <p className="label-eyebrow">A nossa historia</p>
          <h1 className="font-display text-display-md text-navy mt-3">Sobre a Pousada Olivia</h1>
        </div>
      </section>
      <SectionAbout />
      <Differentials />
      <Location />
    </>
  );
}
