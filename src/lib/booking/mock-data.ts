import type { Room, Booking, BlockedDate, SeasonalPrice } from "./types";

// ============================================================================
// Dados ficticios usados quando Supabase nao esta configurado.
// Quando o SQL/seed do Supabase forem aplicados, estes dados deixam de ser
// usados — o data layer le do Supabase automaticamente.
// ============================================================================

const COMMON = {
  description:
    "Quarto confortavel, limpo e bem cuidado. Cama de casal com possibilidade de cama auxiliar, ventilador, frigobar, banheiro privativo e Wi-Fi.",
  capacity_adults: 2,
  capacity_children: 1,
  base_price: 80,
  beds: "1 cama de casal (+ auxiliar sob consulta)",
  amenities: ["Wi-Fi", "Ventilador", "Frigobar", "TV", "Banheiro privativo"],
};

const IMAGES = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1400&q=80",
];

function makeRoom(num: number, active: boolean): Room {
  const id = `room-${String(num).padStart(2, "0")}`;
  return {
    id,
    slug: id,
    name: `Quarto ${String(num).padStart(2, "0")}`,
    description: COMMON.description,
    capacity_adults: COMMON.capacity_adults,
    capacity_children: COMMON.capacity_children,
    base_price: COMMON.base_price,
    image_url: IMAGES[(num - 1) % IMAGES.length],
    amenities: COMMON.amenities,
    beds: COMMON.beds,
    is_active: active,
  };
}

// 6 activos (1..6) + 13 inactivos (7..19).
export const MOCK_ROOMS: Room[] = Array.from({ length: 19 }, (_, i) => makeRoom(i + 1, i < 6));

export const MOCK_BOOKINGS: Booking[] = [];
export const MOCK_BLOCKED: BlockedDate[] = [];

// ===== Preços sazonais (alta temporada) =====
// Datas no formato [start, end) — end e exclusivo.
const HIGH = 150;
const seasonRow = (start: string, end: string, label: string): Omit<SeasonalPrice, "id" | "room_id"> => ({
  start_date: start,
  end_date: end,
  price_per_night: HIGH,
  label,
});

const HIGH_RANGES = [
  seasonRow("2026-12-15", "2027-03-02", "Verao 2026/2027 + Carnaval"),
  // Feriadoes prolongados de 2026
  seasonRow("2026-06-04", "2026-06-08", "Corpus Christi"),
  seasonRow("2026-09-05", "2026-09-08", "Independencia"),
  seasonRow("2026-10-10", "2026-10-13", "N. S. Aparecida"),
  seasonRow("2026-10-31", "2026-11-03", "Finados"),
  seasonRow("2026-11-13", "2026-11-16", "Proclamacao da Republica"),
  seasonRow("2026-12-25", "2026-12-28", "Natal"),
];

// Aplica os intervalos a todos os quartos.
export const MOCK_SEASONAL: SeasonalPrice[] = MOCK_ROOMS.flatMap((r) =>
  HIGH_RANGES.map((row, i) => ({
    id: `${r.id}-season-${i}`,
    room_id: r.id,
    ...row,
  })),
);
