import type { Booking, BlockedDate, Room } from "./types";
import { nightsBetween } from "../utils";

export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  // intervalos meio-abertos [start, end)
  return aStart < bEnd && bStart < aEnd;
}

export function isRoomAvailable(opts: {
  room: Room;
  checkIn: string;
  checkOut: string;
  bookings: Booking[];
  blocked: BlockedDate[];
  adults: number;
  children: number;
}) {
  const { room, checkIn, checkOut, bookings, blocked, adults, children } = opts;
  if (!room.is_active) return false;
  if (adults > room.capacity_adults) return false;
  if (children > room.capacity_children) return false;
  if (nightsBetween(checkIn, checkOut) < 1) return false;

  const conflictBooking = bookings.some(
    (b) =>
      b.room_id === room.id &&
      b.status !== "cancelada" &&
      rangesOverlap(checkIn, checkOut, b.check_in, b.check_out),
  );
  if (conflictBooking) return false;

  const conflictBlock = blocked.some(
    (b) =>
      (b.room_id === null || b.room_id === room.id) &&
      rangesOverlap(checkIn, checkOut, b.start_date, b.end_date),
  );
  return !conflictBlock;
}
