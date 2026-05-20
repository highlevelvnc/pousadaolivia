import Link from "next/link";
import { getRooms, getBookings } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { SUPABASE_ENABLED } from "@/lib/supabase/env";

export default async function AdminHome() {
  const [rooms, bookings] = await Promise.all([getRooms(), getBookings()]);
  const pending = bookings.filter((b) => b.status === "pendente").length;
  const confirmed = bookings.filter((b) => b.status === "confirmada").length;
  const revenue = bookings
    .filter((b) => b.status !== "cancelada")
    .reduce((sum, b) => sum + (b.total_price || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <p className="label-eyebrow">Painel</p>
        <h1 className="font-display text-3xl text-navy mt-2">Bem-vinda, Olivia</h1>
        {!SUPABASE_ENABLED && (
          <p className="mt-2 text-xs text-graphite/60">Mock-mode activo. Configure as variaveis de Supabase no .env.local para persistir dados.</p>
        )}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Quartos activos" value={rooms.length.toString()} />
        <Stat label="Reservas totais" value={bookings.length.toString()} />
        <Stat label="Pendentes" value={pending.toString()} />
        <Stat label="Receita estimada" value={formatBRL(revenue)} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/quartos" className="card-coastal p-6 hover:shadow-coastal-lg">
          <h2 className="font-semibold text-navy">Gerir quartos</h2>
          <p className="text-sm text-graphite/70 mt-1">Adicionar, editar fotos, precos e amenidades.</p>
        </Link>
        <Link href="/admin/reservas" className="card-coastal p-6 hover:shadow-coastal-lg">
          <h2 className="font-semibold text-navy">Reservas</h2>
          <p className="text-sm text-graphite/70 mt-1">Confirmar, cancelar ou marcar como finalizadas.</p>
        </Link>
        <Link href="/admin/bloqueios" className="card-coastal p-6 hover:shadow-coastal-lg">
          <h2 className="font-semibold text-navy">Datas bloqueadas</h2>
          <p className="text-sm text-graphite/70 mt-1">Bloquear datas de manutencao ou reservas externas.</p>
        </Link>
        <Link href="/admin/configuracoes" className="card-coastal p-6 hover:shadow-coastal-lg">
          <h2 className="font-semibold text-navy">Configuracoes</h2>
          <p className="text-sm text-graphite/70 mt-1">WhatsApp, redes sociais e horarios.</p>
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-coastal p-5">
      <p className="text-xs uppercase tracking-wider text-graphite/60">{label}</p>
      <p className="font-display text-2xl text-navy mt-1">{value}</p>
    </div>
  );
}
