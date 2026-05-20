export default function NovoQuartoPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <p className="label-eyebrow">Quartos</p>
      <h1 className="font-display text-3xl text-navy">Novo quarto</h1>
      <div className="card-coastal p-6 text-graphite/70 text-sm">
        {/* TODO: implementar formulario com Supabase insert. Campos: nome, slug, descricao, capacidade, preco, foto, amenidades, beds. */}
        Formulario de cadastro de quarto sera disponibilizado quando o Supabase estiver conectado. Por agora os quartos vivem em <code>src/lib/booking/mock-data.ts</code>.
      </div>
    </div>
  );
}
