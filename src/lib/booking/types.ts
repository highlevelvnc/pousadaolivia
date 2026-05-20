export type BookingStatus = "pendente" | "confirmada" | "cancelada" | "finalizada";

export interface Room {
  id: string;
  slug: string;
  name: string;
  description: string;
  capacity_adults: number;
  capacity_children: number;
  base_price: number;
  image_url: string;
  gallery?: string[];
  amenities: string[];
  beds: string;
  is_active: boolean;
}

export interface Booking {
  id: string;
  room_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  total_price: number;
  status: BookingStatus;
  notes?: string;
  created_at: string;
}

export interface BlockedDate {
  id: string;
  room_id: string | null;
  start_date: string;
  end_date: string;
  reason?: string;
}

export interface SeasonalPrice {
  id: string;
  room_id: string;
  start_date: string;
  end_date: string;
  price_per_night: number;
  label?: string;
}
