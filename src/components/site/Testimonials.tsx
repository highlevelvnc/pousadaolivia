import { Star, Quote } from "lucide-react";

// TODO: substituir por Google Reviews quando a API estiver conectada.
const reviews = [
  {
    name: "Mariana Silva",
    date: "Hospedou-se em Jan 2026",
    text: "Lugar maravilhoso! A pousada e impecavel, o cafe da manha esta sempre fresquinho e a localizacao em Praia Linda e perfeita para descansar.",
  },
  {
    name: "Ricardo Torres",
    date: "Hospedou-se em Fev 2026",
    text: "Ficamos no quarto familia e foi tudo o que precisavamos. Atendimento de familia, limpeza impecavel e silencio total a noite.",
  },
  {
    name: "Camila Andrade",
    date: "Hospedou-se em Mar 2026",
    text: "Recomendo demais. Pousada simples, bem cuidada e com aquele acolhimento que faz a diferenca. Vamos voltar com certeza.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-sand/40">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-10 md:items-center md:justify-between" data-reveal>
          <div>
            <p className="label-eyebrow">Avaliacoes</p>
            <h2 className="section-title mt-2">O que dizem os hospedes</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
            </div>
            <span className="font-semibold text-navy">4.9 / 5.0</span>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.name} className="card-coastal p-8 relative" data-reveal>
              <Quote className="absolute top-4 right-4 text-sand-dark" size={28} />
              <p className="text-graphite/80 italic leading-relaxed">"{r.text}"</p>
              <div className="mt-6">
                <p className="font-semibold text-navy">{r.name}</p>
                <p className="text-xs text-graphite/60">{r.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
