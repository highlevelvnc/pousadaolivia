import type { Metadata } from "next";
import { Suspense } from "react";
import BookingWizard from "@/components/booking/BookingWizard";
import { getRooms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Reservar estadia",
  description: "Solicite a sua reserva na Pousada Olivia em Praia Linda, Sao Pedro da Aldeia.",
};

export default async function ReservaPage() {
  const rooms = await getRooms();
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-2xl mb-8" data-reveal>
          <p className="label-eyebrow">Reserva online</p>
          <h1 className="font-display text-display-md text-navy mt-2">Solicite a sua estadia</h1>
          <p className="mt-3 text-graphite/70">
            Preencha as datas e os seus dados. Confirmaremos a disponibilidade e o valor por WhatsApp ou email em ate 24 horas.
          </p>
        </div>
        <Suspense fallback={<p className="text-graphite/60">Carregando...</p>}>
          <BookingWizard rooms={rooms} />
        </Suspense>
      </div>
    </section>
  );
}
