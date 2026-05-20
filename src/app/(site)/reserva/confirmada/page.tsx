import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { formatBRL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pedido de reserva enviado",
  robots: { index: false },
};

interface SP { room?: string; nights?: string; total?: string; wa?: string }

function Inner({ sp }: { sp: SP }) {
  const total = sp.total ? Number(sp.total) : undefined;
  return (
    <section className="py-20">
      <div className="container max-w-2xl text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-laguna/15 flex items-center justify-center text-laguna">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="font-display text-display-md text-navy mt-6">Pedido enviado com sucesso!</h1>
        <p className="mt-3 text-graphite/75">
          Recebemos o seu pedido de reserva e responderemos em ate 24 horas com a confirmacao e os dados para pagamento.
        </p>
        <div className="mt-8 card-coastal p-6 text-left">
          <h2 className="font-semibold text-navy mb-3">Resumo do pedido</h2>
          {sp.room && <p className="text-sm text-graphite/80"><strong>Quarto:</strong> {sp.room}</p>}
          {sp.nights && <p className="text-sm text-graphite/80"><strong>Noites:</strong> {sp.nights}</p>}
          {total !== undefined && <p className="text-sm text-graphite/80"><strong>Valor estimado:</strong> {formatBRL(total)}</p>}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {sp.wa && (
            <a href={sp.wa} target="_blank" rel="noreferrer noopener" className="btn-primary">
              Enviar resumo no WhatsApp
            </a>
          )}
          <Link href="/" className="btn-secondary">Voltar ao inicio</Link>
        </div>
      </div>
    </section>
  );
}

export default async function Page({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;
  return (
    <Suspense fallback={null}>
      <Inner sp={sp} />
    </Suspense>
  );
}
