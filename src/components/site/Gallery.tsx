"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  src: string;
  alt: string;
  category: "quartos" | "area-externa" | "cafe" | "pousada" | "regiao";
  className?: string;
}

const DEFAULT_ITEMS: GalleryItem[] = [
  { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80", alt: "Quarto com cama de casal e iluminacao quente", category: "quartos", className: "md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=900&q=80", alt: "Area externa da pousada com plantas tropicais", category: "area-externa" },
  { src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", alt: "Mesa do cafe da manha com paes frescos", category: "cafe" },
  { src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80", alt: "Detalhe de quarto com tons claros", category: "quartos" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80", alt: "Praia Linda em Sao Pedro da Aldeia ao por do sol", category: "regiao", className: "md:col-span-2" },
  { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80", alt: "Lobby acolhedor da pousada", category: "pousada" },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80", alt: "Lagoa de Sao Pedro da Aldeia ao amanhecer", category: "regiao" },
];

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "quartos", label: "Quartos" },
  { id: "area-externa", label: "Area externa" },
  { id: "cafe", label: "Cafe da manha" },
  { id: "pousada", label: "Pousada" },
  { id: "regiao", label: "Regiao" },
] as const;

export default function Gallery({ items = DEFAULT_ITEMS }: { items?: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]["id"]>("todos");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const visible = filter === "todos" ? items : items.filter((i) => i.category === filter);

  return (
    <section id="galeria" className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <p className="label-eyebrow">Galeria</p>
          <h2 className="section-title mt-2">Um passeio pela Pousada Olivia</h2>
        </div>
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                filter === c.id
                  ? "bg-navy text-shell"
                  : "bg-white text-navy border border-sand hover:bg-sand/40",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-4">
          {visible.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(item)}
              className={cn(
                "relative rounded-2xl overflow-hidden group focus:outline-none focus:ring-4 focus:ring-laguna/40",
                item.className,
              )}
              data-reveal
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal
          className="fixed inset-0 z-[60] bg-navy/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <button
            onClick={() => setActive(null)}
            aria-label="Fechar"
            className="absolute top-6 right-6 text-shell hover:text-gold"
          >
            <X size={28} />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-coastal-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
