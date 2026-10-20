import { useState } from "react";
import {
  ArrowRight,
  Check,
  CircleCheck,
  Globe2,
  MessageSquare,
  Play,
  Tv,
} from "lucide-react";
import { Brand, PulseMark } from "./Brand";

export function Footer({
  onDownload,
  onDocs,
  onNotify,
}: {
  onDownload: () => void;
  onDocs: () => void;
  onNotify: (message: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function submitNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.includes("@")) {
      onNotify("Informe um e-mail válido para receber as novidades.");
      return;
    }
    setSubscribed(true);
    onNotify("Inscrição confirmada. Boas notícias chegam antes da próxima largada.");
  }

  return (
    <footer className="border-t border-white/[0.07] bg-[#060909]">
      <div className="page-shell">
        <div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_1.9fr] lg:gap-16">
          <div>
            <a href="#top" aria-label="RacePulse — início">
              <Brand />
            </a>
            <p className="mt-4 max-w-xs text-[11px] leading-[1.8] text-muted">
              Telemetria que aparece na hora certa. Um overlay nativo para iRacing, construído por
              pilotos que também configuram o próprio setup.
            </p>

            <div className="mt-6 max-w-[330px]">
              <div className="flex items-center justify-between">
                <span className="mono-label">Pit wall notes</span>
                <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-[#718075]">
                  mensal
                </span>
              </div>
              <p className="mt-2 text-[10px] leading-relaxed text-muted">
                Novidades de produto, notas de versão e dicas de telemetria. Sem spam.
              </p>
              {subscribed ? (
                <div className="mt-3 flex items-center gap-2 rounded border border-pulse/25 bg-pulse/[0.06] px-3 py-2.5 font-mono text-[8px] uppercase tracking-[0.06em] text-pulse">
                  <CircleCheck className="h-3.5 w-3.5" />
                  Você está na lista de largada.
                </div>
              ) : (
                <form onSubmit={submitNewsletter} className="mt-3">
                  <div className="flex overflow-hidden rounded border border-white/10 bg-white/[0.025] focus-within:border-pulse/40">
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="seu@email.com"
                      aria-label="Seu e-mail"
                      className="h-9 min-w-0 flex-1 bg-transparent px-2.5 font-sans text-[10px] text-fog outline-none placeholder:text-muted/60"
                    />
                    <button
                      type="submit"
                      className="grid w-9 place-items-center bg-pulse text-ink transition hover:bg-[#dcff8d]"
                      aria-label="Assinar novidades"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Tv, label: "Twitch", href: "https://www.twitch.tv" },
                { icon: Play, label: "YouTube", href: "https://www.youtube.com" },
                { icon: MessageSquare, label: "Discord", href: "https://discord.com" },
                { icon: Globe2, label: "Site do iRacing", href: "https://www.iracing.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-7 w-7 place-items-center rounded border border-white/[0.09] text-muted transition hover:border-pulse/30 hover:text-pulse"
                >
                  <Icon className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            <div>
              <p className="mono-label">Produto</p>
              <ul className="mt-3 space-y-2.5">
                {[
                  { label: "Recursos", href: "#recursos" },
                  { label: "Overlays", href: "#overlays" },
                  { label: "Estúdio", href: "#estudio" },
                  { label: "Integrações", href: "#streaming" },
                  { label: "Instalação", href: "#instalacao" },
                  { label: "Publicação & updates", href: "#release" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[10px] text-[#939f94] transition hover:text-fog"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={onDownload}
                    className="text-[10px] text-pulse transition hover:text-[#e6ffad]"
                  >
                    Baixar
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="mono-label">Recursos</p>
              <ul className="mt-3 space-y-2.5">
                {[
                  "Documentação",
                  "Guia para OBS",
                  "Solução de problemas",
                  "Notas da versão",
                ].map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={onDocs}
                      className="text-left text-[10px] text-[#939f94] transition hover:text-fog"
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li>
                  <a
                    href="mailto:suporte@racepulse.gg"
                    className="text-[10px] text-[#939f94] transition hover:text-fog"
                  >
                    Suporte
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mono-label">Comunidade</p>
              <ul className="mt-3 space-y-2.5">
                <li>
                  <a
                    href="mailto:drivers@racepulse.gg"
                    className="text-[10px] text-[#939f94] transition hover:text-fog"
                  >
                    Programa de pilotos
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNotify("O programa de pilotos-teste abre inscrições a cada nova temporada.")}
                    className="text-left text-[10px] text-[#939f94] transition hover:text-fog"
                  >
                    Seja um tester
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNotify("Todos os sistemas operacionais. Última verificação agora.")}
                    className="flex items-center gap-1.5 text-left text-[10px] text-[#939f94] transition hover:text-fog"
                  >
                    Status
                    <span className="h-1 w-1 rounded-full bg-pulse" />
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.iracing.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-[#939f94] transition hover:text-fog"
                  >
                    iRacing.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="mono-label">Legal</p>
              <ul className="mt-3 space-y-2.5">
                {["Privacidade", "Termos de uso", "Licença", "Reembolsos"].map((label) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => onNotify(`${label}: documento disponível na central jurídica do app.`)}
                      className="text-left text-[10px] text-[#939f94] transition hover:text-fog"
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li>
                  <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.06em] text-[#718075]">
                    <Check className="h-2.5 w-2.5 text-pulse" /> v2.4.1
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.07] py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
              © 2026 RacePulse Systems
            </span>
            <span className="hidden h-2.5 w-px bg-white/10 sm:block" />
            <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
              Feito para quem sente cada décimo.
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
              <span className="h-1 w-1 rounded-full bg-pulse shadow-[0_0_5px_#c9f95a]" />
              Todos os sistemas operacionais
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
              <PulseMark className="h-3 w-3 rounded-[2px]" />
              PT-BR
            </span>
          </div>
        </div>

        <div className="border-t border-white/[0.05] py-4">
          <p className="max-w-3xl font-mono text-[6.5px] uppercase leading-[1.8] tracking-[0.06em] text-[#526057]">
            RacePulse Overlay é um projeto independente e não é afiliado, endossado ou patrocinado
            pela iRacing.com Motorsport Simulations, LLC. iRacing é uma marca registrada de seus
            respectivos proprietários. Todas as capturas de tela utilizam dados simulados.
          </p>
        </div>
      </div>
    </footer>
  );
}
