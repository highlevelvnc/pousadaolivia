import { notFound } from "next/navigation";
import { getRooms } from "@/lib/data";

export default async function EditRoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const rooms = await getRooms();
  const room = rooms.find((r) => r.id === id);
  if (!room) notFound();
  return (
    <div className="space-y-6 max-w-3xl">
      <p className="label-eyebrow">Quartos</p>
      <h1 className="font-display text-3xl text-navy">{room.name}</h1>
      <div className="card-coastal p-6 space-y-2 text-sm text-graphite/80">
        <p><strong>Slug:</strong> {room.slug}</p>
        <p><strong>Capacidade:</strong> {room.capacity_adults} adultos + {room.capacity_children} criancas</p>
        <p><strong>Preco base:</strong> R$ {room.base_price}</p>
        <p><strong>Amenidades:</strong> {room.amenities.join(", ")}</p>
        <p className="text-graphite/60">
          {/* TODO: ligar a Supabase com PATCH /api/admin/rooms/:id para guardar alteracoes. */}
          Edicao completa sera activada apos configurar o Supabase.
        </p>
      </div>
    </div>
  );
}
