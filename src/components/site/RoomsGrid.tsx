import Link from "next/link";
import type { Room } from "@/lib/booking/types";
import { formatBRL } from "@/lib/utils";
import { Users, BedDouble } from "lucide-react";

export default function RoomsGrid({ rooms }: { rooms: Room[] }) {
  return (
    <section id="quartos" className="py-24 bg-sand/30">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <p className="label-eyebrow">Acomodacoes</p>
          <h2 className="section-title mt-3">Nossos quartos</h2>
          <p className="mt-4 text-graphite/70">
            Quartos confortaveis e bem cuidados a partir de R$ 80 a noite. Valores especiais em alta temporada.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <article key={room.id} className="card-coastal group flex flex-col" data-reveal>
              <Link href={`/quartos/${room.slug}`} className="block aspect-[4/3] overflow-hidden">
                <img
                  src={room.image_url}
                  alt={`Foto do ${room.name} na Pousada Olivia.`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display text-xl text-navy">{room.name}</h3>
                <p className="mt-2 text-sm text-graphite/70 line-clamp-3 flex-1">{room.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sand/60 text-navy">
                    <Users size={14} /> {room.capacity_adults + room.capacity_children} pessoas
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sand/60 text-navy">
                    <BedDouble size={14} /> {room.beds}
                  </span>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-graphite/60">a partir de</p>
                    <p className="font-display text-2xl text-navy">{formatBRL(room.base_price)}<span className="text-sm text-graphite/60"> /noite</span></p>
                  </div>
                  <Link href={`/reserva?roomSlug=${room.slug}`} className="btn-primary !py-2 !px-4 text-xs">Reservar</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
