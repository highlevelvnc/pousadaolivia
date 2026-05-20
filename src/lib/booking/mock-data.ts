import type { Room, Booking, BlockedDate } from "./types";

// ============================================================================
// Dados ficticios usados quando Supabase nao esta configurado.
// Substitua por dados reais via painel admin assim que conectar o backend.
// ============================================================================

export const MOCK_ROOMS: Room[] = [
  {
    id: "room-casal",
    slug: "casal",
    name: "Suite Casal",
    description:
      "Suite acolhedora pensada para dois, com cama queen, ar-condicionado silencioso, varanda com vista para o jardim e enxoval premium em algodao.",
    capacity_adults: 2,
    capacity_children: 0,
    base_price: 380,
    image_url:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Ar-condicionado", "Smart TV", "Wi-Fi", "Frigobar", "Cama queen"],
    beds: "1 cama queen",
    is_active: true,
  },
  {
    id: "room-familia",
    slug: "familia",
    name: "Quarto Familia",
    description:
      "Espacoso e luminoso, ideal para familias. Uma cama de casal e duas de solteiro, mesa de apoio e amplo guarda-roupa para estadias mais longas.",
    capacity_adults: 2,
    capacity_children: 2,
    base_price: 550,
    image_url:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=80",
    ],
    amenities: ["Ar-condicionado", "Smart TV", "Wi-Fi", "Frigobar", "Berco sob consulta"],
    beds: "1 cama de casal + 2 solteiros",
    is_active: true,
  },
  {
    id: "room-triplo",
    slug: "triplo",
    name: "Suite Tripla",
    description:
      "Tres camas confortaveis, ambiente arejado e decoracao em tons claros. Perfeita para amigos que viajam juntos pela Regiao dos Lagos.",
    capacity_adults: 3,
    capacity_children: 1,
    base_price: 450,
    image_url:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    amenities: ["Ar-condicionado", "Wi-Fi", "Frigobar", "Cofre"],
    beds: "3 camas de solteiro",
    is_active: true,
  },
  {
    id: "room-economico",
    slug: "economico",
    name: "Quarto Economico",
    description:
      "Opcao enxuta e aconchegante, com tudo o que precisa para uma estadia tranquila a poucos passos da praia e da lagoa.",
    capacity_adults: 2,
    capacity_children: 0,
    base_price: 290,
    image_url:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1400&q=80",
    amenities: ["Ventilador", "Wi-Fi", "TV"],
    beds: "1 cama de casal",
    is_active: true,
  },
];

export const MOCK_BOOKINGS: Booking[] = [];
export const MOCK_BLOCKED: BlockedDate[] = [];
