import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { SUPABASE_ENABLED } from "@/lib/supabase/env";
import { MOCK_BOOKINGS } from "@/lib/booking/mock-data";
import { getRooms, getBookings, getBlockedDates, getSeasonalPrices } from "@/lib/data";
import { isRoomAvailable } from "@/lib/booking/availability";
import { calcTotal } from "@/lib/booking/pricing";

const Body = z.object({
  room_id: z.string().min(1),
  guest_name: z.string().min(2).max(120),
  guest_email: z.string().email(),
  guest_phone: z.string().min(6).max(40),
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.number().int().min(1).max(8),
  children: z.number().int().min(0).max(8),
  notes: z.string().max(1000).optional(),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dados invalidos", issues: parsed.error.issues }, { status: 400 });
  }
  const data = parsed.data;
  if (data.check_out <= data.check_in) {
    return NextResponse.json({ error: "check-out deve ser depois do check-in" }, { status: 400 });
  }

  const [rooms, bookings, blocked, seasonal] = await Promise.all([
    getRooms(),
    getBookings(),
    getBlockedDates(),
    getSeasonalPrices(),
  ]);
  const room = rooms.find((r) => r.id === data.room_id);
  if (!room) return NextResponse.json({ error: "Quarto nao encontrado" }, { status: 404 });

  const ok = isRoomAvailable({
    room,
    checkIn: data.check_in,
    checkOut: data.check_out,
    bookings,
    blocked,
    adults: data.adults,
    children: data.children,
  });
  if (!ok) return NextResponse.json({ error: "Quarto indisponivel para estas datas" }, { status: 409 });

  const { total } = calcTotal({ room, checkIn: data.check_in, checkOut: data.check_out, seasonal });

  const booking = {
    id: crypto.randomUUID(),
    ...data,
    total_price: total,
    status: "pendente" as const,
    created_at: new Date().toISOString(),
  };

  if (SUPABASE_ENABLED) {
    const sb = getAdminSupabase();
    if (sb) {
      const { error } = await sb.from("bookings").insert(booking);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Mock-mode: persiste em memoria so para a vida do processo.
    MOCK_BOOKINGS.push(booking);
  }

  return NextResponse.json({ booking });
}
