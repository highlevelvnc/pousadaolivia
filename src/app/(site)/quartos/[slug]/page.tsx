import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Users, BedDouble, CheckCircle2 } from "lucide-react";
import { getRoomBySlug } from "@/lib/data";
import { formatBRL } from "@/lib/utils";
import { whatsappUrl } from "@/lib/constants";
import { buildWhatsAppBookingMessage } from "@/lib/booking/whatsapp";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) return { title: "Quarto" };
  return { title: room.name, description: room.description.slice(0, 160) };
}

export default async function RoomDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const room = await getRoomBySlug(slug);
  if (!room) notFound();

  const waMsg = `Ola, gostaria de mais informacoes sobre o quarto "${room.name}" na Pousada Olivia.`;
  const reservaMsg = buildWhatsAppBookingMessage({
    guestName: "(preencher)",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    roomName: room.name,
    total: room.base_price,
  });

  return (
    <article>
      <section className="py-14 bg-shell">
        <div className="container grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3" data-reveal>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-coastal">
              <img src={room.image_url} alt={`Foto principal do ${room.name}`} className="w-full h-full object-cover" />
            </div>
            {room.gallery && room.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {room.gallery.map((src, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                    <img src={src} alt={`${room.name} - foto ${i + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="lg:col-span-2 lg:sticky lg:top-28 self-start space-y-5" data-reveal>
            <p className="label-eyebrow">{room.beds}</p>
            <h1 className="font-display text-display-md text-navy">{room.name}</h1>
            <p className="text-graphite/80 leading-relaxed">{room.description}</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sand/60 text-navy">
                <Users size={14} /> ate {room.capacity_adults} adultos
              </span>
              {room.capacity_children > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sand/60 text-navy">
                  + {room.capacity_children} crianca(s)
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sand/60 text-navy">
                <BedDouble size={14} /> {room.beds}
              </span>
            </div>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {room.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-graphite/80">
                  <CheckCircle2 size={16} className="text-laguna" /> {a}
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-white p-6 border border-sand shadow-coastal">
              <p className="text-xs text-graphite/60">a partir de</p>
              <p className="font-display text-3xl text-navy">{formatBRL(room.base_price)}<span className="text-sm text-graphite/60"> /noite</span></p>
              <div className="mt-4 flex flex-col gap-2">
                <Link href={`/reserva?roomSlug=${room.slug}`} className="btn-primary">Ver disponibilidade</Link>
                <a href={whatsappUrl(reservaMsg || waMsg)} target="_blank" rel="noreferrer noopener" className="btn-secondary">
                  Reservar pelo WhatsApp
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}
