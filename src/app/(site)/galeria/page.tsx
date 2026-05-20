import type { Metadata } from "next";
import Gallery from "@/components/site/Gallery";

export const metadata: Metadata = {
  title: "Galeria",
  description: "Galeria de fotos da Pousada Olivia em Praia Linda, Sao Pedro da Aldeia.",
};

export default function GaleriaPage() {
  return (
    <>
      <section className="py-16 bg-shell">
        <div className="container text-center max-w-2xl mx-auto" data-reveal>
          <p className="label-eyebrow">Galeria</p>
          <h1 className="font-display text-display-md text-navy mt-3">Nossas imagens</h1>
        </div>
      </section>
      <Gallery />
    </>
  );
}
