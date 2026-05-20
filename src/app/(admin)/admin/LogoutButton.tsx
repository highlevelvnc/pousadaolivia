"use client";
import { LogOut } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  async function onClick() {
    const sb = getBrowserSupabase();
    await sb?.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-shell/10 text-sm text-shell/80 hover:text-shell">
      <LogOut size={16} /> Sair
    </button>
  );
}
