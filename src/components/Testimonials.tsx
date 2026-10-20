import { BadgeCheck, Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Finalmente um overlay que não parece um painel de aeroporto. O timing atualiza antes do meu spotter terminar a frase.",
    name: "Rafael Tavares",
    role: "GT3 Sprint",
    tag: "piloto-teste",
    initials: "RT",
    color: "bg-[#c9f95a] text-[#0b1008]",
  },
  {
    quote:
      "Configurei os widgets uma vez. Hoje abro o iRacing e cada carro já tem o layout e a transparência que eu uso na live.",
    name: "Marina Lopes",
    role: "Endurance · Streamer",
    tag: "piloto-teste",
    initials: "ML",
    color: "bg-[#2f3934] text-[#e5edde]",
  },
  {
    quote:
      "O radar salvou minha primeira hora em multiclasse. Simples de mover, leve e sem nenhum stutter. Virou parte do cockpit.",
    name: "Daniel Okafor",
    role: "IMSA · Multiclasse",
    tag: "beta",
    initials: "DO",
    color: "bg-[#566456] text-[#f0f4e9]",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="page-shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="eyebrow">Garagem RacePulse</span>
            <h2 className="section-title mt-5 text-[2rem] sm:text-[2.45rem]">
              Feedback de quem já
              <br />
              <span className="text-[#7f8c81]">entrou na pista.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5 text-pulse">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.07em] text-muted">
              programa de pilotos-teste · 2026
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="group flex flex-col justify-between rounded-lg border border-white/[0.08] bg-[#0b100f] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-white/[0.16]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <Quote className="h-4 w-4 text-pulse/50" />
                  <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.08em] text-muted">
                    {testimonial.tag}
                  </span>
                </div>
                <blockquote className="mt-4 text-[12px] leading-[1.75] text-[#c1ccc0]">
                  “{testimonial.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-6 flex items-center gap-2.5 border-t border-white/[0.07] pt-4">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full font-mono text-[8px] font-semibold ${testimonial.color}`}
                >
                  {testimonial.initials}
                </span>
                <div>
                  <p className="flex items-center gap-1 text-[10px] font-semibold text-[#e0e8da]">
                    {testimonial.name}
                    <BadgeCheck className="h-3 w-3 text-pulse" />
                  </p>
                  <p className="mt-0.5 font-mono text-[6.5px] uppercase tracking-[0.07em] text-muted">
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
