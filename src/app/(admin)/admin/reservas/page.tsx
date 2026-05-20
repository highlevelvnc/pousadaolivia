import { getBookings, getRooms } from "@/lib/data";
import { formatBRL } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  pendente: "bg-gold/20 text-graphite",
  confirmada: "bg-laguna/20 text-navy",
  cancelada: "bg-red-100 text-red-700",
  finalizada: "bg-sand text-graphite",
};

export default async function AdminReservasPage() {
  const [bookings, rooms] = await Promise.all([getBookings(), getRooms()]);
  return (
    <div className="space-y-6">
      <div>
        <p className="label-eyebrow">Reservas</p>
        <h1 className="font-display text-3xl text-navy mt-2">Pedidos recebidos</h1>
      </div>
      <div className="card-coastal overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand/40 text-navy">
            <tr className="text-left">
              <th className="p-3">Hospede</th>
              <th className="p-3">Quarto</th>
              <th className="p-3">Datas</th>
              <th className="p-3">Pessoas</th>
              <th className="p-3">Total</th>
              <th className="p-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-graphite/60">Sem reservas registadas ainda.</td>
              </tr>
            )}
            {bookings.map((b) => {
              const room = rooms.find((r) => r.id === b.room_id);
              return (
                <tr key={b.id} className="border-t border-sand/60">
                  <td className="p-3">
                    <p className="font-medium text-navy">{b.guest_name}</p>
                    <p className="text-xs text-graphite/60">{b.guest_email} · {b.guest_phone}</p>
                  </td>
                  <td className="p-3">{room?.name || b.room_id}</td>
                  <td className="p-3">{b.check_in} → {b.check_out}</td>
                  <td className="p-3">{b.adults}+{b.children}</td>
                  <td className="p-3">{formatBRL(b.total_price)}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-graphite/60">
        {/* TODO: accoes inline para confirmar/cancelar via /api/admin/bookings/:id. */}
        As accoes de mudanca de estado serao ligadas ao Supabase no proximo passo.
      </p>
    </div>
  );
}
