import Link from "next/link";

export default function SectionAbout() {
  return (
    <section id="sobre" className="py-24 md:py-32">
      <div className="container grid gap-12 md:grid-cols-2 items-center">
        <div className="space-y-5" data-reveal data-reveal-direction="left">
          <p className="label-eyebrow">Tradicao &amp; Acolhimento</p>
          <h2 className="section-title">Um refugio de paz a beira da Laguna</h2>
          <p className="text-graphite/80 text-lg leading-relaxed">
            A Pousada Olivia e uma hospedagem tranquila em Praia Linda / Balneario, Sao Pedro da Aldeia,
            pensada para quem busca descanso, conforto e hospitalidade em um ambiente simples, familiar e bem cuidado.
          </p>
          <p className="text-graphite/70">
            Aqui o tempo corre devagar. Desfrute do cafe da manha caseiro, sinta a brisa da lagoa e deixe que o nosso atendimento de familia transforme os seus dias na Regiao dos Lagos.
          </p>
          <Link href="/sobre" className="inline-flex items-center gap-2 font-semibold text-navy border-b border-navy pb-1 hover:text-laguna hover:border-laguna transition-colors">
            Conheca a pousada →
          </Link>
        </div>
        <div className="relative" data-reveal data-reveal-direction="right">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-coastal-lg border-4 border-shell">
            <img
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
              alt="Interior aconchegante da Pousada Olivia com luz natural e tons claros."
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden lg:block absolute -bottom-10 -left-10 w-2/3 aspect-square rounded-3xl overflow-hidden shadow-coastal-lg border-4 border-shell z-10">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
              alt="Cafe da manha artesanal com paes, frutas e cafe servidos pela Pousada Olivia."
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
