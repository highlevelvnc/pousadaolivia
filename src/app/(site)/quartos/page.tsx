import type { Metadata } from "next";
import RoomsGrid from "@/components/site/RoomsGrid";
import FinalCTA from "@/components/site/FinalCTA";
import { getRooms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Quartos e suites",
  description: "Conheca os quartos da Pousada Olivia em Praia Linda, Sao Pedro da Aldeia. Opcoes para casal, familia e grupos.",
};

export default async function QuartosPage() {
  const rooms = await getRooms();
  return (
    <>
      <section className="py-16 bg-shell">
        <div className="container text-center max-w-2xl mx-auto" data-reveal>
          <p className="label-eyebrow">Acomodacoes</p>
          <h1 className="font-display text-display-md text-navy mt-3">Quartos e suites</h1>
          <p className="mt-4 text-graphite/70">
            Espacos pensados para o seu descanso, com limpeza impecavel, roupa de cama macia e tudo o que precisa para uma estadia tranquila.
          </p>
        </div>
      </section>
      <RoomsGrid rooms={rooms} />
      <FinalCTA />
    </>
  );
}
