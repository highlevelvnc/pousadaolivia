"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { SUPABASE_ENABLED } from "@/lib/supabase/env";

export default function LoginForm() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!SUPABASE_ENABLED) {
      router.push(next);
      return;
    }
    const sb = getBrowserSupabase();
    if (!sb) return;
    setLoading(true);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card-coastal p-8 w-full max-w-sm space-y-5">
      <div>
        <p className="label-eyebrow">Admin</p>
        <h1 className="font-display text-2xl text-navy mt-2">Pousada Olivia</h1>
      </div>
      {!SUPABASE_ENABLED && (
        <div className="text-xs bg-gold/15 border border-gold/40 rounded-lg p-3 text-graphite/80">
          Supabase nao configurado. O login esta desactivado e este acesso e directo (mock-mode).
          Configure <code>NEXT_PUBLIC_SUPABASE_URL</code> e chaves para activar.
        </div>
      )}
      <label className="flex flex-col gap-1.5">
        <span className="label-eyebrow">Email</span>
        <input type="email" required className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!SUPABASE_ENABLED} />
      </label>
      <label className="flex flex-col gap-1.5">
        <span className="label-eyebrow">Password</span>
        <input type="password" required className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} disabled={!SUPABASE_ENABLED} />
      </label>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 size={16} className="animate-spin" />}
        Entrar
      </button>
    </form>
  );
}
