import PolicyShell from "../_layout-content";

export const metadata = { title: "Politica de Reservas" };

export default function Page() {
  return (
    <PolicyShell
      title="Politica de Reservas"
      intro="Regras gerais para reservar uma estadia na Pousada Olivia. Em caso de duvida, fale com a nossa equipa pelo WhatsApp."
    >
      <h2>Confirmacao</h2>
      <p>A reserva so e considerada confirmada apos o recebimento do sinal acordado. Pedidos enviados pelo site ou WhatsApp sao respondidos em ate 24 horas.</p>
      <h2>Idade minima</h2>
      <p>O responsavel pela reserva deve ter idade igual ou superior a 18 anos.</p>
      <h2>Capacidade</h2>
      <p>Respeite a capacidade maxima do quarto reservado. Hospedes adicionais devem ser comunicados previamente.</p>
      <h2>Pagamento</h2>
      <p>{/* TODO: ajustar formas de pagamento reais */}Aceitamos PIX, transferencia bancaria e cartao de credito sob consulta.</p>
    </PolicyShell>
  );
}
