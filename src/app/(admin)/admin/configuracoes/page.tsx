import { COMPANY, WHATSAPP_NUMBER } from "@/lib/constants";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="label-eyebrow">Configuracoes</p>
        <h1 className="font-display text-3xl text-navy mt-2">Dados gerais</h1>
      </div>
      <div className="card-coastal p-6 space-y-3 text-sm">
        <Row label="WhatsApp" value={WHATSAPP_NUMBER} />
        <Row label="Instagram" value={COMPANY.instagram} />
        <Row label="Email" value={COMPANY.email} />
        <Row label="Telefone" value={COMPANY.phone} />
        <Row label="Endereco" value={COMPANY.address} />
        <Row label="Check-in" value={COMPANY.checkin} />
        <Row label="Check-out" value={COMPANY.checkout} />
      </div>
      <p className="text-xs text-graphite/60">
        Estes valores sao lidos das variaveis de ambiente (<code>NEXT_PUBLIC_*</code>). Para editar, ajuste o
        <code> .env.local</code> ou crie uma tabela <code>settings</code> no Supabase e ligue esta pagina a ela.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-sand/60 last:border-0">
      <span className="text-graphite/60">{label}</span>
      <span className="text-navy font-medium text-right break-all">{value}</span>
    </div>
  );
}
