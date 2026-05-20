import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="label-eyebrow">404</p>
        <h1 className="font-display text-display-md text-navy mt-2">Pagina nao encontrada</h1>
        <p className="mt-4 text-graphite/70">Talvez a brisa tenha levado este link. Volte ao inicio para continuar a explorar.</p>
        <Link href="/" className="btn-primary mt-6">Voltar ao inicio</Link>
      </div>
    </main>
  );
}
