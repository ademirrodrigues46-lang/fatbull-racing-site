import { useState } from "react";
import { ArrowUpRight, ChevronDown, Download, Menu, X } from "lucide-react";
import { Brand } from "./Brand";
import { cn } from "@/utils/cn";

const navLinks = [
  { label: "Recursos", href: "#recursos" },
  { label: "Overlays", href: "#overlays" },
  { label: "Estúdio", href: "#estudio" },
  { label: "Marca", href: "#identidade" },
  { label: "Instalação", href: "#instalacao" },
  { label: "Release", href: "#release" },
];

export function Header({
  onDownload,
  onDocs,
}: {
  onDownload: () => void;
  onDocs: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#070a0a]/85 backdrop-blur-xl">
      <div className="page-shell flex h-[66px] items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label="RacePulse — página inicial">
          <Brand />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-underline font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-[#98a49a] transition-colors hover:text-fog"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onDocs}
            className="link-underline flex items-center gap-1 font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-[#98a49a] transition-colors hover:text-fog"
          >
            Docs
            <ArrowUpRight className="h-2.5 w-2.5" />
          </button>
        </nav>

        <div className="flex items-center gap-2.5">
          <span className="hidden items-center gap-2 border-r border-white/10 pr-3 font-mono text-[8px] uppercase tracking-[0.08em] text-muted xl:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-pulse shadow-[0_0_7px_rgba(201,249,90,0.65)]" />
            All systems ready
          </span>
          <button
            type="button"
            onClick={onDownload}
            className="hidden h-[34px] items-center gap-2 rounded-[5px] bg-pulse px-3 font-sans text-[10px] font-extrabold tracking-[-0.01em] text-ink transition hover:bg-[#dcff8d] sm:flex"
          >
            <Download className="h-3.5 w-3.5" />
            Baixar app
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-8 w-8 place-items-center rounded border border-white/10 text-[#d8e0d4] transition hover:border-white/25 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-white/[0.07] bg-[#090d0c] transition-all duration-300 lg:hidden",
          open ? "max-h-[380px] border-t" : "max-h-0",
        )}
      >
        <nav className="page-shell flex flex-col py-3" aria-label="Navegação móvel">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-white/[0.06] py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-[#c6d0c3]"
            >
              {link.label}
              <ChevronDown className="h-3 w-3 -rotate-90 text-muted" />
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDocs();
            }}
            className="flex items-center justify-between border-b border-white/[0.06] py-3 text-left font-mono text-[10px] uppercase tracking-[0.1em] text-[#c6d0c3]"
          >
            Documentação
            <ArrowUpRight className="h-3 w-3 text-muted" />
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onDownload();
            }}
            className="mt-3 flex h-10 items-center justify-center gap-2 rounded bg-pulse text-[11px] font-extrabold text-ink"
          >
            <Download className="h-3.5 w-3.5" />
            Baixar para Windows
          </button>
        </nav>
      </div>
    </header>
  );
}
