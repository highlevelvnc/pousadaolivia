import type { Room, SeasonalPrice } from "./types";
import { nightsBetween } from "../utils";

// Aplica precos sazonais noite a noite, se existirem para o quarto.
export function calcTotal(opts: {
  room: Room;
  checkIn: string;
  checkOut: string;
  seasonal?: SeasonalPrice[];
}) {
  const { room, checkIn, checkOut, seasonal = [] } = opts;
  const n = nightsBetween(checkIn, checkOut);
  if (n <= 0) return { nights: 0, total: 0, breakdown: [] as { date: string; price: number }[] };

  const start = new Date(checkIn);
  const breakdown: { date: string; price: number }[] = [];
  for (let i = 0; i < n; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const season = seasonal.find(
      (s) => s.room_id === room.id && iso >= s.start_date && iso < s.end_date,
    );
    breakdown.push({ date: iso, price: season?.price_per_night ?? room.base_price });
  }
  const total = breakdown.reduce((sum, b) => sum + b.price, 0);
  return { nights: n, total, breakdown };
}
