import { MOCK_BLOCKED, MOCK_BOOKINGS, MOCK_ROOMS, MOCK_SEASONAL } from "./booking/mock-data";
import type { BlockedDate, Booking, Room, SeasonalPrice } from "./booking/types";
import { getServerSupabase } from "./supabase/server";
import { SUPABASE_ENABLED } from "./supabase/env";

// Camada de acesso a dados. Usa Supabase quando configurado e a tabela existe;
// caso contrario cai para os dados de demonstracao.

export async function getRooms(): Promise<Room[]> {
  if (!SUPABASE_ENABLED) return MOCK_ROOMS;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_ROOMS;
  const { data, error } = await sb.from("rooms").select("*").eq("is_active", true).order("name");
  if (error || !data || data.length === 0) return MOCK_ROOMS.filter((r) => r.is_active);
  return data as Room[];
}

export async function getAllRooms(): Promise<Room[]> {
  if (!SUPABASE_ENABLED) return MOCK_ROOMS;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_ROOMS;
  const { data, error } = await sb.from("rooms").select("*").order("name");
  if (error || !data || data.length === 0) return MOCK_ROOMS;
  return data as Room[];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  if (!SUPABASE_ENABLED) return MOCK_ROOMS.find((r) => r.slug === slug) ?? null;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_ROOMS.find((r) => r.slug === slug) ?? null;
  const { data, error } = await sb.from("rooms").select("*").eq("slug", slug).maybeSingle();
  if (error || !data) return MOCK_ROOMS.find((r) => r.slug === slug) ?? null;
  return data as Room;
}

export async function getBookings(): Promise<Booking[]> {
  if (!SUPABASE_ENABLED) return MOCK_BOOKINGS;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_BOOKINGS;
  const { data, error } = await sb.from("bookings").select("*");
  if (error) return MOCK_BOOKINGS; // tabela ainda nao existe → fallback
  return (data as Booking[]) ?? [];
}

export async function getBlockedDates(): Promise<BlockedDate[]> {
  if (!SUPABASE_ENABLED) return MOCK_BLOCKED;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_BLOCKED;
  const { data, error } = await sb.from("blocked_dates").select("*");
  if (error) return MOCK_BLOCKED;
  return (data as BlockedDate[]) ?? [];
}

export async function getSeasonalPrices(): Promise<SeasonalPrice[]> {
  if (!SUPABASE_ENABLED) return MOCK_SEASONAL;
  const sb = await getServerSupabase();
  if (!sb) return MOCK_SEASONAL;
  const { data, error } = await sb.from("seasonal_prices").select("*");
  if (error || !data || data.length === 0) return MOCK_SEASONAL;
  return data as SeasonalPrice[];
}
