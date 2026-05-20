import Link from "next/link";
import { getRooms } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function AdminQuartosPage() {
  const rooms = await getRooms();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="label-eyebrow">Quartos</p>
          <h1 className="font-display text-3xl text-navy mt-2">Acomodacoes</h1>
        </div>
        <Link href="/admin/quartos/novo" className="btn-primary"><Plus size={16} /> Novo quarto</Link>
      </div>
      <div className="card-coastal overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-sand/40 text-navy">
            <tr className="text-left">
              <th className="p-3">Nome</th>
              <th className="p-3">Capacidade</th>
              <th className="p-3">Preco</th>
              <th className="p-3">Estado</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r.id} className="border-t border-sand/60">
                <td className="p-3 font-medium text-navy">{r.name}</td>
                <td className="p-3">{r.capacity_adults} + {r.capacity_children}</td>
                <td className="p-3">{formatBRL(r.base_price)}</td>
                <td className="p-3">{r.is_active ? <span className="text-laguna">Activo</span> : <span className="text-graphite/50">Inactivo</span>}</td>
                <td className="p-3 text-right">
                  <Link href={`/admin/quartos/${r.id}`} className="text-navy hover:underline text-xs">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-graphite/60">
        {/* TODO: implementar CRUD completo com Supabase. A interface abaixo ja le, mas as edicoes precisam dos endpoints /api/admin/rooms (POST/PUT/DELETE). */}
        CRUD completo de quartos sera ligado ao Supabase quando as chaves estiverem configuradas.
      </p>
    </div>
  );
}
