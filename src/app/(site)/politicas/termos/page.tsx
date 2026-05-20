import PolicyShell from "../_layout-content";

export const metadata = { title: "Termos de Hospedagem" };

export default function Page() {
  return (
    <PolicyShell
      title="Termos de Hospedagem"
      intro="Estes termos garantem o conforto e a seguranca de todos os hospedes durante a estadia."
    >
      <h2>Check-in e check-out</h2>
      <p>Check-in a partir das 14:00. Check-out ate as 12:00.</p>
      <h2>Silencio</h2>
      <p>Pedimos silencio entre as 22:00 e as 08:00 para o conforto dos hospedes.</p>
      <h2>Areas comuns</h2>
      <p>O cafe da manha e servido das 08:00 as 10:30. Areas comuns ficam disponiveis durante o dia.</p>
      <h2>Danos e perdas</h2>
      <p>O hospede e responsavel por eventuais danos causados ao patrimonio da pousada.</p>
    </PolicyShell>
  );
}
