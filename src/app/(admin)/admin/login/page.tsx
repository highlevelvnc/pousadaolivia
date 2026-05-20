import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-shell px-6">
      <Suspense fallback={<div className="card-coastal p-8 w-full max-w-sm">Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
