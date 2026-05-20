import { getBlockedDates, getRooms } from "@/lib/data";

export default async function AdminBloqueiosPage() {
  const [blocked, rooms] = await Promise.all([getBlockedDates(), getRooms()]);
  return (
    <div className="space-y-6">
      <div>
        <p className="label-eyebrow">Bloqueios</p>
        <h1 className="font-display text-3xl text-navy mt-2">Datas indisponiveis</h1>
      </div>
      <div className="card-coastal overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand/40 text-navy">
            <tr className="text-left">
              <th className="p-3">Quarto</th>
              <th className="p-3">Inicio</th>
              <th className="p-3">Fim</th>
              <th className="p-3">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {blocked.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-graphite/60">Sem bloqueios registados.</td>
              </tr>
            )}
            {blocked.map((b) => {
              const room = rooms.find((r) => r.id === b.room_id);
              return (
                <tr key={b.id} className="border-t border-sand/60">
                  <td className="p-3">{room?.name || "Todos os quartos"}</td>
                  <td className="p-3">{b.start_date}</td>
                  <td className="p-3">{b.end_date}</td>
                  <td className="p-3">{b.reason || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-graphite/60">
        {/* TODO: formulario para criar bloqueios. POST /api/admin/blocked. */}
        Criar bloqueios sera activado com o Supabase.
      </p>
    </div>
  );
}
