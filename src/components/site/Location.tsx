import { MapPin, Compass, Phone } from "lucide-react";
import { COMPANY, whatsappUrl, WHATSAPP_DEFAULT_MSG } from "@/lib/constants";

export default function Location() {
  return (
    <section id="localizacao" className="py-24">
      <div className="container grid gap-10 md:grid-cols-2 items-center">
        <div className="space-y-5" data-reveal>
          <p className="label-eyebrow">Onde estamos</p>
          <h2 className="section-title">Praia Linda · Balneario</h2>
          <p className="text-graphite/80 leading-relaxed">
            Localizada estrategicamente no Balneario de Praia Linda, em Sao Pedro da Aldeia, oferecemos facil acesso as principais praias da Regiao dos Lagos enquanto mantemos a tranquilidade de um refugio familiar.
          </p>
          <ul className="space-y-3 text-graphite/80">
            <li className="flex items-start gap-3"><MapPin className="text-laguna mt-0.5" size={20} /> {COMPANY.address}</li>
            <li className="flex items-start gap-3"><Compass className="text-laguna mt-0.5" size={20} /> 15 min de Cabo Frio · 40 min de Buzios · 2h do Rio</li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={COMPANY.gmapsUrl} target="_blank" rel="noreferrer noopener" className="btn-primary">Como chegar</a>
            <a href={whatsappUrl(WHATSAPP_DEFAULT_MSG)} target="_blank" rel="noreferrer noopener" className="btn-secondary">
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden border border-sand shadow-coastal h-[420px]" data-reveal>
          {COMPANY.gmapsEmbed ? (
            <iframe
              src={COMPANY.gmapsEmbed}
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa Pousada Olivia"
            />
          ) : (
            <div className="w-full h-full bg-laguna/15 flex flex-col items-center justify-center text-center px-6">
              <MapPin size={36} className="text-navy mb-3" />
              <p className="font-semibold text-navy">Praia Linda · Sao Pedro da Aldeia - RJ</p>
              <p className="text-sm text-graphite/70 mt-2 max-w-xs">
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
