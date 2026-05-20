import Link from "next/link";
import { LayoutDashboard, BedDouble, CalendarCheck2, CalendarX2, Settings, LogOut } from "lucide-react";
import { SUPABASE_ENABLED } from "@/lib/supabase/env";
import LogoutButton from "./LogoutButton";

const items = [
  { href: "/admin", label: "Painel", icon: LayoutDashboard },
  { href: "/admin/quartos", label: "Quartos", icon: BedDouble },
  { href: "/admin/reservas", label: "Reservas", icon: CalendarCheck2 },
  { href: "/admin/bloqueios", label: "Bloqueios", icon: CalendarX2 },
  { href: "/admin/configuracoes", label: "Configuracoes", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-shell">
      <div className="flex">
        <aside className="hidden md:flex flex-col w-60 min-h-screen bg-navy text-shell px-5 py-8 gap-2">
          <div className="font-display text-xl mb-6">Pousada Olivia</div>
          <p className="text-xs uppercase tracking-wider text-shell/60 mb-2">Admin</p>
          {items.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-shell/10 text-sm">
              <Icon size={16} /> {label}
            </Link>
          ))}
          <div className="mt-auto">
            {SUPABASE_ENABLED ? (
              <LogoutButton />
            ) : (
              <div className="text-xs text-shell/60 px-3 py-2">
                Mock-mode: configure o Supabase para activar autenticacao e persistencia.
              </div>
            )}
          </div>
        </aside>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
