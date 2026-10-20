import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

export function ModalShell({
  open,
  onClose,
  children,
  label,
  className,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  label: string;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-[6px]"
        onClick={onClose}
        aria-label="Fechar janela"
      />
      <div
        className={cn(
          "animate-modal-in relative max-h-[93vh] w-full overflow-hidden rounded-t-2xl border border-white/12 bg-[#0c1110] shadow-[0_40px_120px_rgba(0,0,0,0.8)] sm:rounded-xl",
          className ?? "max-w-lg",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 grid h-7 w-7 place-items-center rounded border border-white/10 bg-black/20 text-muted transition hover:border-white/25 hover:text-fog"
          aria-label="Fechar"
        >
          <X className="h-3.5 w-3.5" />
        </button>
        {children}
      </div>
    </div>
  );
}
