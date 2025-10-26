import { SectionHeading } from "./SectionHeading";

interface WorkflowStep {
  id: number;
  title: string;
  summary: string;
  status: "ready" | "running" | "success";
}

interface WorkflowConsoleProps {
  steps: WorkflowStep[];
}

const statusStyles: Record<WorkflowStep["status"], string> = {
  ready: "bg-slate-800/60 border-slate-700/60 text-slate-200/90",
  running: "bg-amber-500/10 border-amber-400/40 text-amber-200",
  success: "bg-emerald-500/10 border-emerald-400/40 text-emerald-200",
};

const statusLabel: Record<WorkflowStep["status"], string> = {
  ready: "ready",
  running: "running",
  success: "success",
};

export function WorkflowConsole({ steps }: WorkflowConsoleProps) {
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-8 sm:p-12 shadow-xl shadow-slate-900/40 backdrop-blur-lg">
      <div className="flex flex-col gap-8">
        <SectionHeading
          align="left"
          eyebrow="Workflow Console"
          title="Opal-style step runner for every agent action"
          description="See each decision, inspect diffs, and rerun a single step when something needs a tweak—no more opaque AI edits."
        />
        <div className="grid gap-4">
          {steps.map((step) => (
            <article
              key={step.id}
              className={`flex flex-col gap-2 rounded-2xl border px-5 py-4 transition-all ${statusStyles[step.status]}`}
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
                <span className="text-slate-400/80">Step {step.id.toString().padStart(2, "0")}</span>
                <span className="text-slate-200/90">{statusLabel[step.status]}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-slate-200/80">{step.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
