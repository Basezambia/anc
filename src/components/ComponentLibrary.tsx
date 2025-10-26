import { SectionHeading } from "./SectionHeading";
import { PillBadge } from "./PillBadge";

interface LibraryComponent {
  name: string;
  category: string;
  summary: string;
  actions: string[];
}

interface ComponentLibraryProps {
  components: LibraryComponent[];
}

export function ComponentLibrary({ components }: ComponentLibraryProps) {
  return (
    <section className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-8 sm:p-12 shadow-xl shadow-slate-900/40 backdrop-blur-lg">
      <div className="flex flex-col gap-10">
        <SectionHeading
          align="left"
          eyebrow="Component Registry"
          title="Base primitives, ready to drop"
          description="Wallets, Base Pay, swaps, and more—surfaced with the props, env vars, and server hooks the agent needs to wire them into any stack."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {components.map((component) => (
            <article
              key={component.name}
              className="flex h-full flex-col gap-4 rounded-2xl border border-slate-700/50 bg-slate-950/60 p-6 transition-all hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-lg hover:shadow-slate-900/30"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                <PillBadge tone="violet">{component.category}</PillBadge>
              </div>
              <p className="text-sm text-slate-300/90">{component.summary}</p>
              <ul className="mt-auto grid gap-2 text-xs text-slate-300/80">
                {component.actions.map((action) => (
                  <li key={action} className="flex gap-3 rounded-xl border border-slate-800/60 bg-slate-900/70 p-3">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-emerald-400" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
