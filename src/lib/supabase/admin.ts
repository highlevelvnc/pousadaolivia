import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ENABLED, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "./env";

// Cliente com service-role para operacoes administrativas server-side.
// NUNCA expor este cliente no browser.
export function getAdminSupabase() {
  if (!SUPABASE_ENABLED || !SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
