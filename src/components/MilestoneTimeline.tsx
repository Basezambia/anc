import { SectionHeading } from "./SectionHeading";

interface Milestone {
  phase: string;
  focus: string[];
  outcome: string;
  timeline: string;
}

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/80 p-8 sm:p-12 shadow-xl shadow-slate-900/40 backdrop-blur-lg">
      <div className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="Delivery Plan"
          title="Milestones that ship a usable builder fast"
          description="Start with an upload-to-wallet flow, then layer in payments, multi-wallet support, and developer-grade observability."
        />
        <ol className="grid gap-6 md:grid-cols-3">
          {milestones.map((milestone) => (
            <li
              key={milestone.phase}
              className="flex h-full flex-col gap-4 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-6"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400/80">
                <span>{milestone.phase}</span>
                <span>{milestone.timeline}</span>
              </div>
              <div className="text-sm text-slate-200/90">
                <p className="font-semibold text-white">Focus</p>
                <ul className="mt-2 grid gap-2">
                  {milestone.focus.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto rounded-xl border border-slate-800/60 bg-slate-900/70 p-4 text-sm text-slate-300/90">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Outcome</p>
                <p className="mt-2">{milestone.outcome}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
