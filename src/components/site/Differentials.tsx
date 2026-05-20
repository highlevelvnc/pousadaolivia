import { Home, BedDouble, MapPin, Waves, Heart, Wifi, Coffee, Car } from "lucide-react";

const items = [
  { icon: Heart, label: "Ambiente familiar" },
  { icon: BedDouble, label: "Quartos confortaveis" },
  { icon: Home, label: "Localizacao tranquila" },
  { icon: Waves, label: "Perto da praia e lagoa" },
  { icon: Coffee, label: "Cafe da manha" },
  { icon: Wifi, label: "Wi-Fi cortesia" },
  { icon: Car, label: "Estacionamento" },
  { icon: MapPin, label: "Regiao dos Lagos" },
];

export default function Differentials() {
  return (
    <section className="py-20 bg-navy text-shell">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto" data-reveal>
          <p className="label-eyebrow !text-gold">Diferenciais</p>
          <h2 className="font-display text-display-md mt-3">Tudo o que precisa para descansar</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, label }) => (
            <div key={label} className="text-center space-y-3" data-reveal>
              <div className="w-14 h-14 mx-auto rounded-full bg-shell/10 flex items-center justify-center">
                <Icon size={22} />
              </div>
              <p className="text-sm font-semibold tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
