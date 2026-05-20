// ============================================================================
// Constantes globais da Pousada Olivia.
// Edite aqui (ou via env vars) telefone, email, redes sociais, etc.
// ============================================================================

const env = (k: string, fallback: string) =>
  (typeof process !== "undefined" && process.env?.[k]) || fallback;

export const SITE_URL = env("NEXT_PUBLIC_SITE_URL", "https://pousadaolivia.com.br");

export const COMPANY = {
  name: "Pousada Olivia",
  shortName: "Olivia",
  tagline: "Seu refugio em Praia Linda",
  fullName: "Pousada Olivia - Praia Linda, Sao Pedro da Aldeia",
  region: "Praia Linda / Balneario, Sao Pedro da Aldeia - RJ",
  email: env("NEXT_PUBLIC_EMAIL", "reservas@pousadaolivia.com.br"),
  phone: env("NEXT_PUBLIC_PHONE", "+55 22 99999-9999"),
  address: env("NEXT_PUBLIC_ADDRESS", "Praia Linda / Balneario, Sao Pedro da Aldeia - RJ"),
  instagram: env("NEXT_PUBLIC_INSTAGRAM_URL", "https://www.instagram.com/pousadaolivia"),
  gmapsUrl: env("NEXT_PUBLIC_GMAPS_URL", "https://maps.google.com/?q=Praia+Linda+Sao+Pedro+da+Aldeia"),
  gmapsEmbed: env("NEXT_PUBLIC_GMAPS_EMBED", ""),
  checkin: "14:00",
  checkout: "12:00",
} as const;

// Numero limpo (so digitos) + URL pronta para wa.me.
export const WHATSAPP_NUMBER = env("NEXT_PUBLIC_WHATSAPP_NUMBER", "5522999999999").replace(/\D/g, "");

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_DEFAULT_MSG =
  "Ola, gostaria de mais informacoes sobre a Pousada Olivia em Praia Linda.";

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Quartos", href: "/quartos" },
  { label: "Galeria", href: "/galeria" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
] as const;

export const POLICIES_LINKS = [
  { label: "Politica de Reservas", href: "/politicas/reservas" },
  { label: "Politica de Cancelamento", href: "/politicas/cancelamento" },
  { label: "Termos de Hospedagem", href: "/politicas/termos" },
  { label: "Politica de Privacidade", href: "/politicas/privacidade" },
] as const;
