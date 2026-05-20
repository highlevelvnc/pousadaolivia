import Link from "next/link";
import BookingBar from "./BookingBar";
import { whatsappUrl, WHATSAPP_DEFAULT_MSG } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Vista da praia em Sao Pedro da Aldeia ao por do sol, com aguas calmas e tons azuis e dourados."
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/20 to-navy/70" />
      </div>

      <div className="container relative w-full pb-32 pt-40 text-shell">
        <div className="max-w-2xl" data-reveal>
          <p className="label-eyebrow !text-gold">Praia Linda · Sao Pedro da Aldeia</p>
          <h1 className="font-display text-display-lg mt-3 leading-[1.05]">
            Seu refugio em <em className="not-italic text-gold">Praia Linda</em>
          </h1>
          <p className="mt-6 text-lg text-shell/85 max-w-xl">
            Hospedagem acolhedora, tranquila e confortavel em Sao Pedro da Aldeia. Acorde com a brisa da lagoa e cafe da manha caseiro.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/reserva" className="btn-gold">Reservar agora</Link>
            <a
              href={whatsappUrl(WHATSAPP_DEFAULT_MSG)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost-light"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-5xl z-10">
        <BookingBar />
      </div>
    </section>
  );
}
