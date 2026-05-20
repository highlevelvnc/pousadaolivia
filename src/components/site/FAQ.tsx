"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const items = [
  { q: "Qual o horario de check-in?", a: "O check-in inicia as 14:00. Caso precise de chegada antecipada, fale connosco para verificarmos a disponibilidade." },
  { q: "Qual o horario de check-out?", a: "O check-out e ate as 12:00. Late check-out sob consulta e sujeito a disponibilidade." },
  { q: "A pousada aceita criancas?", a: "Sim, a pousada e familiar e acolhe criancas. Temos quartos com camas adicionais e berco sob solicitacao." },
  { q: "Posso reservar pelo WhatsApp?", a: "Pode sim. Use o botao flutuante no canto da tela ou o botao 'Falar no WhatsApp' em qualquer pagina." },
  { q: "Tem estacionamento?", a: "Sim, oferecemos estacionamento para hospedes sujeito a disponibilidade." },
  { q: "Tem cafe da manha?", a: "Sim, cafe da manha caseiro incluido na diaria, servido das 08:00 as 10:30." },
  { q: "Como funciona a confirmacao da reserva?", a: "Apos enviar o pedido pelo site ou WhatsApp, retornamos com o orcamento e os dados para pagamento. A reserva so e confirmada apos o sinal." },
  { q: "Quais formas de pagamento sao aceitas?", a: "Aceitamos PIX, transferencia bancaria e cartao de credito sob consulta." },
  { q: "Posso cancelar minha reserva?", a: "Sim. Consulte a nossa Politica de Cancelamento para conhecer os prazos e condicoes." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 bg-shell">
      <div className="container max-w-3xl">
        <div className="text-center" data-reveal>
          <p className="label-eyebrow">Duvidas frequentes</p>
          <h2 className="section-title mt-2">Perguntas mais comuns</h2>
        </div>
        <div className="mt-12 space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="card-coastal overflow-hidden" data-reveal>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-navy">{item.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-navy transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <div className="px-5 pb-5 text-graphite/75">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
