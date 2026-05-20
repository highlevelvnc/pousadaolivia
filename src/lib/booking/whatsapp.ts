import { whatsappUrl } from "../constants";
import { formatBRL } from "../utils";

export interface WhatsAppBookingPayload {
  guestName: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomName: string;
  total: number;
  notes?: string;
}

export function buildWhatsAppBookingMessage(p: WhatsAppBookingPayload) {
  const fmt = (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
  return [
    "Ola, gostaria de consultar uma reserva na Pousada Olivia.",
    "",
    `Nome: ${p.guestName}`,
    `Check-in: ${fmt(p.checkIn)}`,
    `Check-out: ${fmt(p.checkOut)}`,
    `Adultos: ${p.adults}`,
    `Criancas: ${p.children}`,
    `Quarto escolhido: ${p.roomName}`,
    `Valor estimado: ${formatBRL(p.total)}`,
    p.notes ? `Observacoes: ${p.notes}` : "Observacoes: -",
    "",
    "Aguardo confirmacao de disponibilidade.",
  ].join("\n");
}

export function whatsappBookingUrl(p: WhatsAppBookingPayload) {
  return whatsappUrl(buildWhatsAppBookingMessage(p));
}
