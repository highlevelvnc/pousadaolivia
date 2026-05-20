import { MOCK_BLOCKED, MOCK_BOOKINGS, MOCK_ROOMS } from "./booking/mock-data";
import type { BlockedDate, Booking, Room } from "./booking/types";
import { getServerSupabase } from "./supabase/server";
import { SUPABASE_ENABLED } from "./supabase/env";

// Camada de acesso a dados. Usa Supabase quando configurado, senao mock.

export async function getRooms(): Promise<Room[]> {
  if (!SUPABASE_ENABLED) return MOCK_ROOMS;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_ROOMS;
  const { data, error } = await sb.from("rooms").select("*").eq("is_active", true).order("base_price");
  if (error || !data) return MOCK_ROOMS;
  return data as Room[];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!SUPABASE_ENABLED) return MOCK_ROOMS.find((r) => r.slug === slug) ?? null;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_ROOMS.find((r) => r.slug === slug) ?? null;
  const { data } = await sb.from("rooms").select("*").eq("slug", slug).maybeSingle();
  return (data as Room) ?? null;
}

export async function getBookings(): Promise<Booking[]> {
  if (!SUPABASE_ENABLED) return MOCK_BOOKINGS;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_BOOKINGS;
  const { data } = await sb.from("bookings").select("*");
  return (data as Booking[]) ?? [];
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  if (!SUPABASE_ENABLED) return MOCK_BLOCKED;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_BLOCKED;
  const { data } = await sb.from("blocked_dates").select("*");
  return (data as BlockedDate[]) ?? [];
}
