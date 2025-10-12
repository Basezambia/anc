"use client";

import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { PillBadge } from "./PillBadge";

export interface StackStrategy {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  codePlan: string[];
}

interface StackStrategyTabsProps {
  strategies: StackStrategy[];
}

export function StackStrategyTabs({ strategies }: StackStrategyTabsProps) {
  const [selected, setSelected] = useState(strategies[0]?.id ?? "");
  const active = strategies.find((strategy) => strategy.id === selected) ?? strategies[0];

  return (
    <section className="w-full rounded-3xl border border-slate-700/40 bg-slate-900/60 shadow-xl shadow-slate-900/40 backdrop-blur-lg">
      <div className="flex flex-col gap-12 p-8 sm:p-12">
        <SectionHeading
          align="left"
          eyebrow="Code Injection Strategies"
          title="Framework-aware automation without guesswork"
          description="Each drop target gets a deterministic plan. The agent understands how your site is built, patches it safely, and leaves you with readable code you can ship."
        />
        <div className="grid gap-10 lg:grid-cols-[320px,1fr]">
          <div className="flex flex-col gap-4">
            {strategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => setSelected(strategy.id)}
                className={`group flex flex-col rounded-2xl border px-5 py-4 text-left transition-all ${
                  strategy.id === active.id
                    ? "border-sky-500/60 bg-sky-500/10 text-white"
                    : "border-slate-700/60 bg-slate-800/40 text-slate-300 hover:border-slate-500/50 hover:bg-slate-800/70"
                }`}
              >
                <span className="text-sm font-semibold uppercase tracking-wide text-slate-300/80">{strategy.title}</span>
                <p className="mt-2 text-sm text-slate-300/80 group-hover:text-slate-100/90">
                  {strategy.description}
                </p>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-6 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <PillBadge tone="sky">{active.title}</PillBadge>
              <PillBadge tone="emerald">Deterministic Plan</PillBadge>
            </div>
            <ul className="grid gap-3 text-sm text-slate-200/90">
              {active.highlights.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-slate-700/50 bg-slate-800/40 p-4">
                  <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-6 text-sm font-mono text-slate-300/90">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-slate-400/80">Agent checklist</p>
              <ol className="grid gap-3 list-decimal pl-4">
                {active.codePlan.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
