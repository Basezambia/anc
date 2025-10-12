import { SectionHeading } from "./SectionHeading";

interface ChecklistItem {
  title: string;
  detail: string;
}

interface SecurityChecklistProps {
  safeguards: ChecklistItem[];
}

export function SecurityChecklist({ safeguards }: SecurityChecklistProps) {
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-8 sm:p-12 shadow-xl shadow-slate-900/40 backdrop-blur-lg">
      <div className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="Security & DX"
          title="Safe-by-default sandboxes with developer ergonomics"
          description="Preview builds run in isolated containers with explicit network allow-lists. Secrets stay in the vault, and every agent action ships with logs and diffs you can audit."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {safeguards.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-950/60 p-5"
            >
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-sm text-slate-300/80">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
