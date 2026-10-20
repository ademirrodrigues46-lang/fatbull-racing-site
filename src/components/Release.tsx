import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Circle,
  Clipboard,
  GitBranch,
  Rocket,
  ShieldCheck,
  Terminal,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/utils/cn";
import {
  appCommands,
  channelMeta,
  deploySteps,
  releaseEntries,
  roadmap,
  siteCommands,
  type Channel,
} from "@/data/releases";

const checklist = [
  { id: "lint", label: "Build e testes visuais passaram" },
  { id: "notes", label: "Notas da versão escritas" },
  { id: "hash", label: "SHA-256 publicado no site" },
  { id: "sign", label: "Instalador assinado" },
  { id: "edge", label: "Site no ar e cache limpo" },
];

export function Release({ onNotify }: { onNotify: (message: string) => void }) {
  const [channel, setChannel] = useState<Channel>("stable");
  const [done, setDone] = useState<Record<string, boolean>>({
    lint: true,
    notes: true,
    hash: false,
    sign: false,
    edge: false,
  });
  const [step, setStep] = useState(1);

  const entries = useMemo(
    () => releaseEntries.filter((entry) => entry.channel === channel),
    [channel],
  );

  const progress = Math.round((Object.values(done).filter(Boolean).length / checklist.length) * 100);
  const ready = progress === 100;

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      onNotify("Comando copiado para a área de transferência.");
    } catch {
      onNotify(`Copie manualmente: ${text}`);
    }
  }

  return (
    <section id="release" className="relative overflow-hidden border-t border-white/[0.07] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 dot-surface opacity-[0.18]" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[900px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(201,249,90,.07), transparent 62%)" }}
      />

      <div className="page-shell relative">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="eyebrow">Publicação &amp; atualizações</span>
            <h2 className="section-title mt-5 text-[2.15rem] sm:text-[2.8rem] lg:text-[3.1rem]">
              Toda mudança chega
              <br />
              <span className="text-[#7f8c81]">por uma trilha conhecida.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[12px] leading-[1.8] text-muted lg:pb-1">
            O site e o aplicativo têm rotas próprias de publicação. Conteúdo, layout e texto vivem
            em <code className="rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[10px] text-[#cdd8c7]">src/data</code>,
            então atualizar não exige mexer em componentes.
          </p>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-4">
          {deploySteps.map((item, index) => {
            const state = index < step ? "done" : index === step ? "active" : "todo";
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStep(index)}
                className={cn(
                  "group relative overflow-hidden rounded-lg border p-4 text-left transition",
                  state === "active"
                    ? "border-pulse/40 bg-pulse/[0.06]"
                    : state === "done"
                      ? "border-white/[0.1] bg-[#0b100f]"
                      : "border-white/[0.07] bg-[#0a0e0d] hover:border-white/15",
                )}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-[7px] uppercase tracking-[0.1em]",
                      state === "todo" ? "text-muted/70" : "text-pulse",
                    )}
                  >
                    etapa {String(index + 1).padStart(2, "0")}
                  </span>
                  {state === "done" ? (
                    <Check className="h-3 w-3 text-pulse" strokeWidth={3} />
                  ) : state === "active" ? (
                    <Circle className="h-2.5 w-2.5 animate-soft-pulse fill-pulse text-pulse" />
                  ) : (
                    <Circle className="h-2.5 w-2.5 text-white/20" />
                  )}
                </div>
                <p className="mt-3 font-display text-[13px] font-semibold tracking-[-0.03em] text-fog">
                  {item.label}
                </p>
                <p className="mt-1.5 text-[9.5px] leading-relaxed text-muted">{item.detail}</p>
                {state === "active" && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-pulse/60" />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-2 font-mono text-[7px] uppercase tracking-[0.08em] text-muted/70">
          clique em uma etapa para inspecionar o status da publicação
        </p>

        <div className="mt-10 grid gap-3 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b100f]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#0d1210] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <GitBranch className="h-3.5 w-3.5 text-pulse" />
                <span className="font-display text-[11px] font-semibold tracking-[-0.02em] text-[#e2ebdd]">
                  Linha de versões
                </span>
              </div>
              <div className="flex items-center gap-1 rounded border border-white/[0.08] bg-black/25 p-0.5">
                {(Object.keys(channelMeta) as Channel[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setChannel(key)}
                    aria-pressed={channel === key}
                    className={cn(
                      "rounded-sm px-2 py-1 font-mono text-[7px] uppercase tracking-[0.08em] transition",
                      channel === key
                        ? "bg-pulse text-ink"
                        : "text-muted hover:bg-white/[0.05] hover:text-[#d4ddce]",
                    )}
                  >
                    {channelMeta[key].label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3">
              <p className="max-w-md text-[10.5px] leading-relaxed text-muted">
                {channelMeta[channel].description}
              </p>
              <div className="flex items-center gap-3 font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                <span>cadência: {channelMeta[channel].cadence}</span>
                <span
                  className={cn(
                    "rounded-sm border px-1.5 py-0.5",
                    channel === "stable"
                      ? "border-pulse/25 text-pulse"
                      : channel === "beta"
                        ? "border-white/15 text-[#cdd8c7]"
                        : "border-[#ff7658]/35 text-[#ff9473]",
                  )}
                >
                  {channelMeta[channel].risk}
                </span>
              </div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {entries.map((entry) => (
                <article key={entry.version} className="group px-4 py-4 transition hover:bg-white/[0.015] sm:px-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-[10px] font-semibold text-fog">v{entry.version}</span>
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-muted">
                      {entry.date} · {entry.size}
                    </span>
                    <span className="ml-auto flex flex-wrap items-center gap-1">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-sm border border-white/[0.09] px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.07em] text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[14px] font-semibold tracking-[-0.03em] text-[#e6eede]">
                    {entry.title}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {entry.notes.map((note) => (
                      <li key={note} className="flex gap-2 text-[10.5px] leading-relaxed text-muted">
                        <span className="mt-[6px] h-[3px] w-[3px] shrink-0 rounded-full bg-pulse/70" />
                        {note}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex items-center gap-3 opacity-0 transition group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => onNotify(`Notas de versão v${entry.version} abertas no changelog do app.`)}
                      className="flex items-center gap-1 font-mono text-[7px] uppercase tracking-[0.07em] text-pulse"
                    >
                      ver diff <ArrowUpRight className="h-2.5 w-2.5" />
                    </button>
                    <span className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted/70">
                      rollback disponível
                    </span>
                  </div>
                </article>
              ))}
              {entries.length === 0 && (
                <p className="px-5 py-8 text-[11px] text-muted">
                  Nenhuma publicação neste canal agora.
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.08] bg-[#090e0d] px-4 py-2.5">
              <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.07em] text-muted">
                <ShieldCheck className="h-2.5 w-2.5 text-pulse" />
                cada release publica instalador, hash e notas
              </span>
              <button
                type="button"
                onClick={() => onNotify("CHANGELOG.md registra o histórico completo de versões.")}
                className="font-mono text-[7px] uppercase tracking-[0.07em] text-muted transition hover:text-fog"
              >
                changelog completo
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-white/[0.09] bg-[#0b100f] p-4">
              <div className="flex items-center justify-between">
                <span className="mono-label">Checklist de release</span>
                <span
                  className={cn(
                    "font-mono text-[8px] tabular-nums",
                    ready ? "text-pulse" : "text-muted",
                  )}
                >
                  {progress}%
                </span>
              </div>
              <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                <span
                  className={cn(
                    "block h-full rounded-full transition-all duration-500",
                    ready ? "bg-pulse shadow-[0_0_12px_rgba(201,249,90,.5)]" : "bg-[#6f8a4c]",
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <ul className="mt-3 space-y-1">
                {checklist.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setDone((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="flex w-full items-center gap-2.5 rounded px-1 py-1.5 text-left transition hover:bg-white/[0.03]"
                      aria-pressed={done[item.id]}
                    >
                      <span
                        className={cn(
                          "grid h-3.5 w-3.5 shrink-0 place-items-center rounded-[3px] border transition",
                          done[item.id] ? "border-pulse bg-pulse text-ink" : "border-white/20",
                        )}
                      >
                        {done[item.id] && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                      </span>
                      <span
                        className={cn(
                          "text-[10px] transition",
                          done[item.id] ? "text-muted line-through" : "text-[#cfd9ca]",
                        )}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <div
                className={cn(
                  "mt-3 flex items-center gap-2 rounded border px-2.5 py-2 font-mono text-[7px] uppercase tracking-[0.07em] transition",
                  ready
                    ? "border-pulse/25 bg-pulse/[0.06] text-pulse"
                    : "border-[#ff7658]/20 bg-[#ff7658]/[0.05] text-[#ff9473]",
                )}
              >
                {ready ? (
                  <>
                    <Rocket className="h-3 w-3" /> Pronto para publicar
                  </>
                ) : (
                  <>
                    <TriangleAlert className="h-3 w-3" /> Blockers: conclua os itens restantes
                  </>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-white/[0.09] bg-[#0b100f] p-4">
              <span className="mono-label">Roadmap público</span>
              <div className="mt-3 space-y-4">
                {roadmap.map((block) => (
                  <div key={block.period}>
                    <p className="font-mono text-[7px] uppercase tracking-[0.08em] text-pulse">
                      {block.period}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-2 text-[10px] leading-relaxed text-muted">
                          <Circle className="mt-[3px] h-2 w-2 shrink-0 text-[#4c5a4f]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {[
            { title: "Rotinas do site", icon: Terminal, commands: siteCommands },
            { title: "Rotinas de release", icon: Rocket, commands: appCommands },
          ].map(({ title, icon: Icon, commands }) => (
            <div key={title} className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#080c0b]">
              <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-2.5">
                <Icon className="h-3 w-3 text-pulse" />
                <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-[#b6c2b2]">
                  {title}
                </span>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[6.5px] uppercase tracking-[0.07em] text-muted">
                  <Clipboard className="h-2.5 w-2.5" /> copie e rode
                </span>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {commands.map((command) => (
                  <button
                    key={command.label}
                    type="button"
                    onClick={() => copy(command.command)}
                    className="group flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-white/[0.02]"
                  >
                    <span className="w-[42%] shrink-0 text-[9.5px] font-medium text-[#c3cfbe]">
                      {command.label}
                    </span>
                    <code className="min-w-0 flex-1 truncate font-mono text-[8.5px] text-[#8fa189] group-hover:text-[#c9f95a]">
                      {command.command}
                    </code>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
