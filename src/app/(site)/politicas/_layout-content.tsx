import Link from "next/link";
import { POLICIES_LINKS } from "@/lib/constants";

export default function PolicyShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <article className="py-16">
      <div className="container max-w-4xl">
        <p className="label-eyebrow">Politicas</p>
        <h1 className="font-display text-display-md text-navy mt-2">{title}</h1>
        <p className="mt-4 text-graphite/75">{intro}</p>
        <div className="mt-10 grid gap-8 md:grid-cols-[1fr_220px]">
          <div className="prose prose-sm max-w-none text-graphite/85 leading-relaxed">{children}</div>
          <aside className="space-y-2">
            <p className="label-eyebrow">Mais politicas</p>
            {POLICIES_LINKS.map((p) => (
              <Link key={p.href} href={p.href} className="block text-sm text-navy hover:underline">
                {p.label}
              </Link>
            ))}
          </aside>
        </div>
      </div>
    </article>
  );
}
