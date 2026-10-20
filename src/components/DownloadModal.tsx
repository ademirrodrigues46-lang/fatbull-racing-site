import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Download,
  FileText,
  HardDrive,
  LoaderCircle,
  MonitorCheck,
  ShieldCheck,
  Sparkles,
  SquareArrowOutUpRight,
} from "lucide-react";
import { ModalShell } from "./ModalShell";
import { PulseMark } from "./Brand";
import { cn } from "@/utils/cn";

export function DownloadModal({
  open,
  onClose,
  onDocs,
  onNotify,
}: {
  open: boolean;
  onClose: () => void;
  onDocs: () => void;
  onNotify: (message: string) => void;
}) {
  const [state, setState] = useState<"idle" | "preparing" | "done">("idle");
  const [checksumVisible, setChecksumVisible] = useState(false);

  useEffect(() => {
    if (!open) setState("idle");
  }, [open]);

  useEffect(() => {
    if (state !== "preparing") return;
    const timer = window.setTimeout(() => setState("done"), 1500);
    return () => window.clearTimeout(timer);
  }, [state]);

  function handleDownload() {
    setState("preparing");
    onNotify("Preparando o instalador do FatBull Racing Overlay 2.4.1…");
  }

  return (
    <ModalShell open={open} onClose={onClose} label="Baixar FatBull Racing Overlay" className="max-w-[520px]">
      <div className="border-b border-white/[0.08] bg-[#0e1412] px-5 pb-4 pt-5">
        <span className="mono-label flex items-center gap-2">
          <Download className="h-3 w-3 text-pulse" />
          Central de download
        </span>
        <div className="mt-3 flex items-center gap-3">
          <PulseMark className="h-10 w-10" />
          <div>
            <h2 className="font-display text-[20px] font-semibold tracking-[-0.035em] text-fog">
              FatBull Racing Overlay
            </h2>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
              Versão 2.4.1 · Windows 64-bit
            </p>
          </div>
          <span className="ml-auto mr-7 rounded-full border border-pulse/25 bg-pulse/[0.07] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.08em] text-pulse">
            stable
          </span>
        </div>
      </div>

      <div className="max-h-[calc(93vh-170px)] overflow-y-auto p-5">
        <div className="rounded-lg border border-pulse/20 bg-pulse/[0.04] p-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded bg-pulse/10 text-pulse">
                <MonitorCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold text-fog">Windows 10 / 11</p>
                <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.07em] text-muted">
                  Instalador x64 · 18,4 MB
                </p>
              </div>
            </div>
            <Check className="h-4 w-4 text-pulse" />
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={state === "preparing"}
            className="btn-primary mt-4 h-11 w-full text-[12px] disabled:cursor-wait disabled:opacity-90"
          >
            {state === "idle" && (
              <>
                <Download className="h-4 w-4" /> Baixar instalador
              </>
            )}
            {state === "preparing" && (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" /> Preparando download…
              </>
            )}
            {state === "done" && (
              <>
                <Check className="h-4 w-4" /> Download iniciado
              </>
            )}
          </button>

          <p
            className={cn(
              "mt-2.5 text-center font-mono text-[8px] uppercase leading-relaxed tracking-[0.06em] transition",
              state === "done" ? "text-pulse" : "text-muted",
            )}
          >
            {state === "done"
              ? "O instalador abrirá em instantes. Verifique sua pasta de downloads."
              : "Sem cadastro. Sem cartão. 30 dias de avaliação completa."}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: FileText, value: "2.4.1", label: "versão" },
            { icon: HardDrive, value: "42 MB", label: "instalado" },
            { icon: ShieldCheck, value: "SHA-256", label: "verificado" },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded border border-white/[0.07] bg-white/[0.018] px-2.5 py-2">
              <Icon className="mb-2 h-3 w-3 text-muted" />
              <p className="font-mono text-[9px] font-medium text-[#dce5d7]">{value}</p>
              <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="mono-label">O que há de novo</span>
          <button
            type="button"
            onClick={() => onNotify("Você está na versão mais recente do canal Stable.")}
            className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.07em] text-muted transition hover:text-fog"
          >
            All versions <ChevronRight className="h-2.5 w-2.5" />
          </button>
        </div>

        <div className="mt-2.5 space-y-2">
          {[
            ["Novo editor visual", "Layouts por perfil, snap de 8 px e prévia instantânea."],
            ["Standings V2", "Intervalos por classe, melhor volta e atualização a 10 Hz."],
            ["Radar refinado", "Detecção de overlap mais estável em pelotões."],
          ].map(([title, description]) => (
            <div key={title} className="flex gap-2.5">
              <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-sm bg-pulse/10 text-pulse">
                <Sparkles className="h-2 w-2" />
              </span>
              <p className="text-[10px] leading-relaxed text-muted">
                <strong className="font-semibold text-[#dce4d6]">{title}</strong> — {description}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setChecksumVisible((value) => !value)}
          className="mt-4 w-full rounded border border-dashed border-white/10 px-3 py-2 text-left transition hover:border-white/20"
        >
          <span className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
            SHA-256 do instalador
            <ChevronRight
              className={cn("h-3 w-3 transition-transform", checksumVisible && "rotate-90")}
            />
          </span>
          {checksumVisible && (
            <code className="mt-1.5 block break-all font-mono text-[8px] leading-relaxed text-[#b8c5b4]">
              4f9a17d2c8e3b760a1f5d8c2e0497ab35d6f8c1e9a2b7405c3d1f8e6a4b0c297
            </code>
          )}
        </button>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onDocs();
            }}
            className="flex items-center gap-1.5 text-[10px] font-medium text-[#cbd6c7] transition hover:text-pulse"
          >
            <SquareArrowOutUpRight className="h-3 w-3" />
            Guia de instalação
          </button>
          <span className="font-mono text-[8px] uppercase tracking-[0.07em] text-muted">
            Windows 10+ · x64
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0a0f0e] px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.07em] text-muted">
          <span className="h-1 w-1 rounded-full bg-pulse" />
          Servidor de atualização online
        </span>
        <a
          href="https://www.iracing.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.07em] text-muted transition hover:text-fog"
        >
          iRacing.com <ArrowUpRight className="h-2.5 w-2.5" />
        </a>
      </div>
    </ModalShell>
  );
}
