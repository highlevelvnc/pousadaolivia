import PolicyShell from "../_layout-content";

export const metadata = { title: "Politica de Privacidade" };

export default function Page() {
  return (
    <PolicyShell
      title="Politica de Privacidade"
      intro="Como tratamos os dados pessoais dos visitantes e hospedes da Pousada Olivia."
    >
      <h2>Dados recolhidos</h2>
      <p>Coletamos apenas os dados necessarios para processar pedidos de reserva (nome, email, telefone e datas) e para cumprir obrigacoes legais.</p>
      <h2>Uso</h2>
      <p>Os dados sao utilizados exclusivamente para gestao da reserva e comunicacao com o hospede. Nao partilhamos com terceiros.</p>
      <h2>Direitos do titular</h2>
      <p>Pode solicitar a qualquer momento a actualizacao ou eliminacao dos seus dados enviando email para o nosso contacto oficial.</p>
    </PolicyShell>
  );
}
