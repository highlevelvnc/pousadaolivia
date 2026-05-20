"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { todayISO } from "@/lib/utils";

export default function BookingBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState(todayISO(1));
  const [checkOut, setCheckOut] = useState(todayISO(3));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const qs = new URLSearchParams({
      checkIn,
      checkOut,
      adults: String(adults),
      children: String(children),
    });
    router.push(`/reserva?${qs.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white/95 backdrop-blur-md rounded-2xl shadow-coastal-lg border border-sand/60 p-5 md:p-6 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 items-end"
    >
      <Field label="Check-in">
        <input
          type="date"
          required
          min={todayISO()}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="input-field"
        />
      </Field>
      <Field label="Check-out">
        <input
          type="date"
          required
          min={checkIn}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="input-field"
        />
      </Field>
      <Field label="Adultos">
        <select
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="input-field"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "adulto" : "adultos"}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Criancas">
        <select
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          className="input-field"
        >
          {[0, 1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "crianca" : "criancas"}
            </option>
          ))}
        </select>
      </Field>
      <button type="submit" className="btn-primary col-span-2 md:col-span-1 h-[50px]">
        Ver disponibilidade
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="label-eyebrow">{label}</span>
      {children}
    </label>
  );
}
