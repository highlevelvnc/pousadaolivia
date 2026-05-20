import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { COMPANY, whatsappUrl, WHATSAPP_DEFAULT_MSG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Pousada Olivia em Praia Linda, Sao Pedro da Aldeia.",
};

export default function ContatoPage() {
  return (
    <section className="py-20">
      <div className="container grid gap-10 lg:grid-cols-2">
        <div className="space-y-6" data-reveal>
          <p className="label-eyebrow">Fale connosco</p>
          <h1 className="font-display text-display-md text-navy">Estamos a sua espera</h1>
          <p className="text-graphite/75 max-w-md">
            Para reservas, duvidas ou pedidos especiais, o caminho mais rapido e o WhatsApp. Respondemos todos os dias entre 08:00 e 22:00.
          </p>
          <ul className="space-y-3 text-graphite/80">
            <li className="flex items-center gap-3"><Phone className="text-laguna" size={18} /> {COMPANY.phone}</li>
            <li className="flex items-center gap-3"><Mail className="text-laguna" size={18} /> {COMPANY.email}</li>
            <li className="flex items-start gap-3"><MapPin className="text-laguna mt-0.5" size={18} /> {COMPANY.address}</li>
            <li className="flex items-center gap-3">
              <Instagram className="text-laguna" size={18} />
              <a className="hover:text-navy underline" href={COMPANY.instagram} target="_blank" rel="noreferrer noopener">@pousadaolivia</a>
            </li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={whatsappUrl(WHATSAPP_DEFAULT_MSG)} target="_blank" rel="noreferrer noopener" className="btn-primary">Falar no WhatsApp</a>
            <Link href="/reserva" className="btn-secondary">Pedir reserva pelo site</Link>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-sand shadow-coastal aspect-video lg:aspect-auto" data-reveal>
          {COMPANY.gmapsEmbed ? (
            <iframe src={COMPANY.gmapsEmbed} className="w-full h-full" loading="lazy" title="Mapa" />
          ) : (
            <div className="w-full h-full bg-laguna/15 flex items-center justify-center text-center px-6">
              <p className="text-graphite/70 text-sm">
                {/* TODO: cole o iframe do Google Maps em NEXT_PUBLIC_GMAPS_EMBED no .env.local */}
                Mapa interactivo sera carregado quando o embed do Google Maps for configurado.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
