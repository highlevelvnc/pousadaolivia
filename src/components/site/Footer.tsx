import Link from "next/link";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";
import { COMPANY, NAV_LINKS, POLICIES_LINKS, whatsappUrl, WHATSAPP_DEFAULT_MSG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy text-shell mt-24">
      <div className="container py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4 md:col-span-2">
          <div className="font-display text-3xl">{COMPANY.name}</div>
          <p className="text-shell/70 max-w-sm">
            Hospedagem boutique acessivel em Praia Linda, Sao Pedro da Aldeia. Tranquilidade, conforto e atendimento de familia.
          </p>
          <div className="flex gap-3 pt-2">
            <a href={COMPANY.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-shell/30 flex items-center justify-center hover:bg-shell hover:text-navy transition-colors">
              <Instagram size={18} />
            </a>
            <a href={whatsappUrl(WHATSAPP_DEFAULT_MSG)} target="_blank" rel="noreferrer noopener" aria-label="WhatsApp"
              className="w-10 h-10 rounded-full border border-shell/30 flex items-center justify-center hover:bg-shell hover:text-navy transition-colors">
              <Phone size={18} />
            </a>
            <a href={`mailto:${COMPANY.email}`} aria-label="Email"
              className="w-10 h-10 rounded-full border border-shell/30 flex items-center justify-center hover:bg-shell hover:text-navy transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
        <div>
          <h4 className="label-eyebrow !text-gold mb-4">Navegar</h4>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-shell/80 hover:text-shell transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/reserva" className="text-shell/80 hover:text-shell transition-colors">
                Reservar
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="label-eyebrow !text-gold mb-4">Contato</h4>
          <ul className="space-y-3 text-shell/80 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {COMPANY.address}</li>
            <li className="flex items-center gap-2"><Phone size={16} /> {COMPANY.phone}</li>
            <li className="flex items-center gap-2"><Mail size={16} /> {COMPANY.email}</li>
          </ul>
          <h4 className="label-eyebrow !text-gold mt-6 mb-3">Politicas</h4>
          <ul className="space-y-2 text-sm">
            {POLICIES_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-shell/70 hover:text-shell">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-shell/15">
        <div className="container py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-shell/60">
          <span>© {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.</span>
          <span>Praia Linda · Sao Pedro da Aldeia · RJ</span>
        </div>
      </div>
    </footer>
  );
}
