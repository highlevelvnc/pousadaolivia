"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-shell/90 backdrop-blur-md border-b border-sand/60 shadow-coastal"
          : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-20">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl text-navy font-medium tracking-tight">
            {COMPANY.name}
          </span>
          <span className="hidden sm:inline text-label text-laguna-dark">PRAIA LINDA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-graphite hover:text-navy transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/reserva" className="btn-primary !py-2.5 !px-5 text-sm">
            Reservar
          </Link>
        </nav>
        <button
          aria-label="Abrir menu"
          className="md:hidden text-navy p-2"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-shell border-t border-sand/60">
          <div className="container py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 font-semibold text-graphite hover:text-navy"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/reserva"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              Reservar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
