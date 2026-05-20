import Link from "next/link";
import { whatsappUrl, WHATSAPP_DEFAULT_MSG } from "@/lib/constants";

export default function FinalCTA() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy text-shell px-8 md:px-16 py-16 md:py-20 text-center" data-reveal>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-laguna/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative z-10">
            <p className="label-eyebrow !text-gold">Reserve directo</p>
            <h2 className="font-display text-display-md mt-3">Pronto para descansar em Praia Linda?</h2>
            <p className="mt-4 max-w-xl mx-auto text-shell/80">
              Garanta a sua reserva com as melhores tarifas falando directamente com a nossa equipa.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/reserva" className="btn-gold">Reservar agora</Link>
              <a href={whatsappUrl(WHATSAPP_DEFAULT_MSG)} target="_blank" rel="noreferrer noopener" className="btn-ghost-light">
                Consultar disponibilidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
