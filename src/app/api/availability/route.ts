import { NextResponse } from "next/server";
import { z } from "zod";
import { getRooms, getBookings, getBlockedDates } from "@/lib/data";
import { isRoomAvailable } from "@/lib/booking/availability";
import { calcTotal } from "@/lib/booking/pricing";

const Query = z.object({
  checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1).max(8),
  children: z.coerce.number().int().min(0).max(8),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const parsed = Query.safeParse(Object.fromEntries(searchParams));
  if (!parsed.success) {
    return NextResponse.json({ error: "Parametros invalidos", issues: parsed.error.issues }, { status: 400 });
  }
  const { checkIn, checkOut, adults, children } = parsed.data;
  if (checkOut <= checkIn) {
    return NextResponse.json({ error: "check-out deve ser depois do check-in" }, { status: 400 });
  }

  const [rooms, bookings, blocked] = await Promise.all([getRooms(), getBookings(), getBlockedDates()]);

  const available = rooms
    .filter((room) => isRoomAvailable({ room, checkIn, checkOut, bookings, blocked, adults, children }))
    .map((room) => ({ room, ...calcTotal({ room, checkIn, checkOut }) }));

  return NextResponse.json({ checkIn, checkOut, adults, children, results: available });
}
