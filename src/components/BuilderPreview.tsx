"use client";

import { useState } from "react";
import { PillBadge } from "./PillBadge";

interface BuilderComponent {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface BuilderPreviewProps {
  components: BuilderComponent[];
}

export function BuilderPreview({ components }: BuilderPreviewProps) {
  const [selected, setSelected] = useState(components[0]?.id ?? "");
  const active = components.find((component) => component.id === selected) ?? components[0];

  return (
    <section className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/80 p-8 sm:p-12 shadow-2xl shadow-slate-950/60 backdrop-blur-lg">
      <div className="grid gap-10 lg:grid-cols-[320px,1fr]">
        <div className="flex flex-col gap-4">
          <PillBadge tone="sky">Drag & drop</PillBadge>
          <h2 className="text-3xl font-semibold text-white">Drop a Base primitive, watch the agent wire it up</h2>
          <p className="text-sm text-slate-300/80">
            The canvas mirrors your site. Choose where the Wallet, Pay, or Swap widget should live, and the agent handles packages, providers, and callbacks. No manual wiring.
          </p>
          <div className="mt-4 grid gap-3">
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => setSelected(component.id)}
                className={`flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left transition-all ${
                  component.id === active.id
                    ? "border-sky-500/60 bg-sky-500/10 text-white"
                    : "border-slate-700/60 bg-slate-900/50 text-slate-300 hover:border-slate-500/60 hover:bg-slate-900/80"
                }`}
              >
                <span className="text-sm font-semibold">{component.name}</span>
                <span className="text-xs text-slate-300/70">{component.description}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col gap-6 rounded-3xl border border-slate-700/40 bg-slate-950/70 p-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400/80">
            <span>Preview</span>
            <span>Live sandbox</span>
          </div>
          <div className="grid gap-4 rounded-2xl border border-slate-800/50 bg-slate-900/60 p-6 shadow-inner shadow-slate-950/60">
            <div className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400/70">/landing</span>
              <div className="h-2 w-full rounded-full bg-slate-800">
                <div className="h-full w-2/3 rounded-full bg-sky-500/70" />
              </div>
            </div>
            <div className="min-h-[220px] rounded-2xl border border-dashed border-slate-700/80 bg-slate-900/80 p-6">
              <p className="text-sm text-slate-300/80">{active.preview}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <PillBadge tone="emerald">Packages ready</PillBadge>
                <PillBadge tone="violet">Env prompts</PillBadge>
                <PillBadge tone="sky">Diff preview</PillBadge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-emerald-200">
              AI applied without breaking your repo
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
