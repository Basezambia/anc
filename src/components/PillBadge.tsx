import type { ReactNode } from "react";

interface PillBadgeProps {
  children: ReactNode;
  tone?: "sky" | "violet" | "emerald" | "slate";
}

const toneClasses: Record<Required<PillBadgeProps>["tone"], string> = {
  sky: "bg-sky-500/10 text-sky-300 border-sky-500/30",
  violet: "bg-violet-500/10 text-violet-200 border-violet-500/30",
  emerald: "bg-emerald-500/10 text-emerald-200 border-emerald-500/30",
  slate: "bg-slate-500/10 text-slate-200 border-slate-500/20",
};

export function PillBadge({ children, tone = "slate" }: PillBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
