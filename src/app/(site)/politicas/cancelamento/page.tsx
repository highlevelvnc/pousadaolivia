import PolicyShell from "../_layout-content";

export const metadata = { title: "Politica de Cancelamento" };

export default function Page() {
  return (
    <PolicyShell
      title="Politica de Cancelamento"
      intro="Condicoes para cancelamento e alteracao de reservas. Pedimos que comunique sempre o quanto antes para ajudarmos a remarcar."
    >
      <h2>Prazos</h2>
      <ul>
        <li>Cancelamento ate 15 dias antes do check-in: reembolso integral do sinal.</li>
        <li>Cancelamento entre 14 e 7 dias antes: 50% do sinal e retido.</li>
        <li>Cancelamento com menos de 7 dias: nao ha reembolso, mas e possivel remarcar a estadia em ate 90 dias.</li>
      </ul>
      <h2>Alteracoes</h2>
      <p>Alteracoes de data dependem da disponibilidade dos quartos. Diferencas tarifarias podem ser aplicadas.</p>
      <h2>No-show</h2>
      <p>O nao comparecimento sem aviso resulta no cancelamento da reserva sem reembolso.</p>
    </PolicyShell>
  );
}
