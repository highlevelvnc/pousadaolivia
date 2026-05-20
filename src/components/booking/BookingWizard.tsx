"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Users, BedDouble, Loader2, ArrowLeft } from "lucide-react";
import type { Room } from "@/lib/booking/types";
import { formatBRL, todayISO, nightsBetween } from "@/lib/utils";
import { whatsappBookingUrl } from "@/lib/booking/whatsapp";

type Step = "dates" | "rooms" | "guest" | "confirm";

interface AvailabilityResult {
  room: Room;
  nights: number;
  total: number;
}

const GuestSchema = z.object({
  guest_name: z.string().min(2, "Nome muito curto"),
  guest_email: z.string().email("Email invalido"),
  guest_phone: z.string().min(8, "Telefone invalido"),
  notes: z.string().optional(),
});
type GuestData = z.infer<typeof GuestSchema>;

export default function BookingWizard({ rooms }: { rooms: Room[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const initialRoomSlug = sp.get("roomSlug") || "";
  const [step, setStep] = useState<Step>("dates");
  const [checkIn, setCheckIn] = useState(sp.get("checkIn") || todayISO(1));
  const [checkOut, setCheckOut] = useState(sp.get("checkOut") || todayISO(3));
  const [adults, setAdults] = useState(Number(sp.get("adults") || 2));
  const [children, setChildren] = useState(Number(sp.get("children") || 0));
  const [results, setResults] = useState<AvailabilityResult[] | null>(null);
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickedRoomId, setPickedRoomId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const pickedRoom = useMemo(
    () => results?.find((r) => r.room.id === pickedRoomId) ?? null,
    [results, pickedRoomId],
  );

  const { register, handleSubmit, formState: { errors } } = useForm<GuestData>({
    resolver: zodResolver(GuestSchema),
  });

  async function searchAvailability() {
    setError(null);
    if (checkOut <= checkIn) {
      setError("Check-out deve ser depois do check-in.");
      return;
    }
    setLoadingAvail(true);
    try {
      const qs = new URLSearchParams({
        checkIn, checkOut, adults: String(adults), children: String(children),
      });
      const res = await fetch(`/api/availability?${qs}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Falha ao consultar disponibilidade");
      setResults(json.results);
      // Pre-selecciona se veio com ?roomSlug=
      if (initialRoomSlug && !pickedRoomId) {
        const match = (json.results as AvailabilityResult[]).find((r) => r.room.slug === initialRoomSlug);
        if (match) setPickedRoomId(match.room.id);
      }
      setStep("rooms");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingAvail(false);
    }
  }

  // Se chegou com roomSlug + datas, dispara busca automatica
  useEffect(() => {
    if (sp.get("checkIn") && sp.get("checkOut") && !results) {
      searchAvailability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submitBooking(data: GuestData) {
    if (!pickedRoom) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_id: pickedRoom.room.id,
          guest_name: data.guest_name,
          guest_email: data.guest_email,
          guest_phone: data.guest_phone,
          check_in: checkIn,
          check_out: checkOut,
          adults,
          children,
          notes: data.notes || "",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Falha ao enviar reserva");
      // Constroi mensagem WhatsApp para o utilizador
      const waUrl = whatsappBookingUrl({
        guestName: data.guest_name,
        checkIn,
        checkOut,
        adults,
        children,
        roomName: pickedRoom.room.name,
        total: pickedRoom.total,
        notes: data.notes,
      });
      const qs = new URLSearchParams({
        room: pickedRoom.room.name,
        nights: String(pickedRoom.nights),
        total: String(pickedRoom.total),
        wa: waUrl,
      });
      router.push(`/reserva/confirmada?${qs.toString()}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-8">
      <div>
        <Stepper step={step} />

        {step === "dates" && (
          <div className="card-coastal p-6 md:p-8 space-y-5">
            <h2 className="font-display text-2xl text-navy">Quando vai chegar?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="Check-in">
                <input type="date" min={todayISO()} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="input-field" />
              </Field>
              <Field label="Check-out">
                <input type="date" min={checkIn} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="input-field" />
              </Field>
              <Field label="Adultos">
                <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="input-field">
                  {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </Field>
              <Field label="Criancas">
                <select value={children} onChange={(e) => setChildren(Number(e.target.value))} className="input-field">
                  {[0, 1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </Field>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button onClick={searchAvailability} disabled={loadingAvail} className="btn-primary">
              {loadingAvail && <Loader2 size={16} className="animate-spin" />}
              Ver disponibilidade
            </button>
          </div>
        )}

        {step === "rooms" && results && (
          <div className="space-y-4">
            <button onClick={() => setStep("dates")} className="text-sm text-navy hover:underline inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Alterar datas
            </button>
            <h2 className="font-display text-2xl text-navy">Quartos disponiveis</h2>
            {results.length === 0 && (
              <div className="card-coastal p-6 text-graphite/70">
                Nao encontramos quartos disponiveis para estas datas. Tente outras datas ou fale connosco pelo WhatsApp.
              </div>
            )}
            {results.map(({ room, nights, total }) => {
              const isPicked = pickedRoomId === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setPickedRoomId(room.id)}
                  className={`w-full text-left card-coastal p-4 md:p-5 flex gap-4 transition-all ${
                    isPicked ? "ring-2 ring-navy" : "hover:shadow-coastal-lg"
                  }`}
                >
                  <img src={room.image_url} alt={room.name} className="w-32 h-32 md:w-40 md:h-32 object-cover rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-lg text-navy">{room.name}</h3>
                    <p className="text-sm text-graphite/70 line-clamp-2 mt-1">{room.description}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-graphite/70">
                      <span className="inline-flex items-center gap-1"><Users size={12} /> {room.capacity_adults}+{room.capacity_children}</span>
                      <span className="inline-flex items-center gap-1"><BedDouble size={12} /> {room.beds}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-graphite/60">{nights} {nights === 1 ? "noite" : "noites"}</p>
                    <p className="font-display text-xl text-navy">{formatBRL(total)}</p>
                    {isPicked && <p className="text-xs text-laguna mt-1 inline-flex items-center gap-1"><CheckCircle2 size={12} /> Seleccionado</p>}
                  </div>
                </button>
              );
            })}
            {pickedRoomId && (
              <button onClick={() => setStep("guest")} className="btn-primary mt-2">Continuar</button>
            )}
          </div>
        )}

        {step === "guest" && pickedRoom && (
          <form onSubmit={handleSubmit(submitBooking)} className="card-coastal p-6 md:p-8 space-y-5">
            <button type="button" onClick={() => setStep("rooms")} className="text-sm text-navy hover:underline inline-flex items-center gap-1">
              <ArrowLeft size={14} /> Voltar
            </button>
            <h2 className="font-display text-2xl text-navy">Seus dados</h2>
            <Field label="Nome completo">
              <input className="input-field" {...register("guest_name")} />
              {errors.guest_name && <p className="text-red-600 text-xs mt-1">{errors.guest_name.message}</p>}
            </Field>
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Email">
                <input type="email" className="input-field" {...register("guest_email")} />
                {errors.guest_email && <p className="text-red-600 text-xs mt-1">{errors.guest_email.message}</p>}
              </Field>
              <Field label="Telefone / WhatsApp">
                <input className="input-field" placeholder="(22) 99999-9999" {...register("guest_phone")} />
                {errors.guest_phone && <p className="text-red-600 text-xs mt-1">{errors.guest_phone.message}</p>}
              </Field>
            </div>
            <Field label="Observacoes (opcional)">
              <textarea className="input-field min-h-[100px]" {...register("notes")} />
            </Field>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button disabled={submitting} className="btn-primary">
              {submitting && <Loader2 size={16} className="animate-spin" />}
              Enviar pedido de reserva
            </button>
          </form>
        )}
      </div>

      <aside className="lg:sticky lg:top-28 self-start">
        <div className="card-coastal p-6 space-y-4">
          <p className="label-eyebrow">Resumo</p>
          <div className="text-sm text-graphite/80 space-y-1">
            <p><strong className="text-navy">Check-in:</strong> {checkIn}</p>
            <p><strong className="text-navy">Check-out:</strong> {checkOut}</p>
            <p><strong className="text-navy">Noites:</strong> {nightsBetween(checkIn, checkOut)}</p>
            <p><strong className="text-navy">Hospedes:</strong> {adults} adulto(s) + {children} crianca(s)</p>
          </div>
          {pickedRoom && (
            <div className="border-t border-sand pt-4 space-y-1 text-sm">
              <p className="font-semibold text-navy">{pickedRoom.room.name}</p>
              <p className="font-display text-2xl text-navy">{formatBRL(pickedRoom.total)}</p>
              <p className="text-xs text-graphite/60">Valor estimado · sujeito a confirmacao</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function Stepper({ step }: { step: Step }) {
  const steps: { id: Step; label: string }[] = [
    { id: "dates", label: "Datas" },
    { id: "rooms", label: "Quarto" },
    { id: "guest", label: "Dados" },
  ];
  const idx = steps.findIndex((s) => s.id === step);
  return (
    <div className="flex items-center gap-3 mb-6">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-2">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            i <= idx ? "bg-navy text-shell" : "bg-sand text-graphite/60"
          }`}>{i + 1}</span>
          <span className={`text-sm ${i <= idx ? "text-navy font-semibold" : "text-graphite/60"}`}>{s.label}</span>
          {i < steps.length - 1 && <span className="w-8 h-px bg-sand" />}
        </div>
      ))}
    </div>
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
