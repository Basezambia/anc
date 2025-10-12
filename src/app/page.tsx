import Link from "next/link";
import { FiArrowRight, FiUploadCloud, FiCpu, FiGitBranch } from "react-icons/fi";
import { BuilderPreview } from "../components/BuilderPreview";
import { StackStrategyTabs, type StackStrategy } from "../components/StackStrategyTabs";
import { ComponentLibrary } from "../components/ComponentLibrary";
import { WorkflowConsole } from "../components/WorkflowConsole";
import { SecurityChecklist } from "../components/SecurityChecklist";
import { MilestoneTimeline } from "../components/MilestoneTimeline";
import { SectionHeading } from "../components/SectionHeading";
import { PillBadge } from "../components/PillBadge";

const builderComponents = [
  {
    id: "wallet",
    name: "Wallet",
    description: "Adds Connect Wallet, dropdown, and identity banner",
    preview:
      "On drop, the agent wraps your app with OnchainKitProvider, installs wagmi + viem, and injects a responsive Wallet modal wherever you placed it.",
  },
  {
    id: "pay",
    name: "Base Pay",
    description: "Accept USDC on Base with one click",
    preview:
      "Server actions spin up pay() calls, success webhooks write receipts, and the UI renders a Base Pay button that respects live/test modes.",
  },
  {
    id: "swap",
    name: "Swap",
    description: "Let users trade without leaving the mini-app",
    preview:
      "The Swap widget mounts with prefilled pairs, sets RPCs, and logs lifecycle events to your analytics bus.",
  },
  {
    id: "mint",
    name: "Mint",
    description: "Spin up gated mints or collectibles",
    preview:
      "Templates generate mint pages with attestation checks, metadata forms, and callbacks for fulfillment.",
  },
];

const stackStrategies: StackStrategy[] = [
  {
    id: "static",
    title: "Static HTML",
    description: "Wrap legacy sites with a lightweight Vite shell and React islands for Base widgets.",
    highlights: [
      "Detect HTML uploads, scaffold Vite + React adapter layer",
      "Inject <script type='module'> mount points with safe hydration",
      "Use WalletConnect EIP-1193 provider for multi-wallet support",
    ],
    codePlan: [
      "Create vite.config + entry to hydrate islands",
      "Install @base-org/onchainkit and provider shim",
      "Add Wallet/Pay mounts targeting data-component anchors",
      "Emit .env.example with Base RPC + keys",
    ],
  },
  {
    id: "react",
    title: "React / Vite / CRA",
    description: "Patch existing React trees with providers, routes, and hooks.",
    highlights: [
      "Add OnchainKitProvider at the root with Base + WalletConnect",
      "Update router to include Checkout success/cancel routes",
      "Guard client-only widgets with lazy imports to avoid SSR issues",
    ],
    codePlan: [
      "Detect package manager + install @base-org/onchainkit, wagmi, viem",
      "Wrap src/main.tsx with providers",
      "Insert component JSX at drop target via AST codemod",
      "Write checklist + diff summary for review",
    ],
  },
  {
    id: "next",
    title: "Next.js (App Router)",
    description: "Lean on server actions + route handlers for secure payments.",
    highlights: [
      "Update app/layout.tsx with provider + theme",
      "Generate app/actions/pay.ts server action for Base Pay",
      "Add middleware for route protection when payments required",
    ],
    codePlan: [
      "Add provider + theme to layout",
      "Create Base Pay action + success webhook",
      "Inject Wallet/Pay components into selected segment",
      "Prompt for env: BASE_RPC_URL, BASE_PAY_PUBLIC_KEY, WALLETCONNECT_PROJECT_ID",
    ],
  },
  {
    id: "vue",
    title: "Vue / Svelte / Others",
    description: "Mount a micro React host or ship Web Component wrappers.",
    highlights: [
      "Bundle React island exposed as <base-kit-widget>",
      "Map props/events to the host framework",
      "Document handshake so teams can extend the bridge",
    ],
    codePlan: [
      "Generate wrapper package inside project",
      "Install peer deps scoped to the wrapper",
      "Inject custom element into selected template",
      "Add typed events + usage docs",
    ],
  },
];

const libraryComponents = [
  {
    name: "Wallet",
    category: "Identity",
    summary: "Modal connect flow with dropdown, ENS/avatar, and network guardrails.",
    actions: [
      "Installs @base-org/onchainkit, wagmi, viem",
      "Configures providers + WalletConnect project id",
      "Injects <Wallet /> and updates layout copy",
    ],
  },
  {
    name: "Base Pay",
    category: "Payments",
    summary: "USDc acceptance with lifecycle callbacks and analytics hooks.",
    actions: [
      "Creates pay() server utilities or REST handler",
      "Adds success/cancel routes with status UI",
      "Prompts env for API keys + testnet toggles",
    ],
  },
  {
    name: "Swap",
    category: "DeFi",
    summary: "Configurable swap widget tuned for Base liquidity pairs.",
    actions: [
      "Sets default tokens + slippage controls",
      "Persists analytics events to project log",
      "Surfaces fallback copy for unsupported regions",
    ],
  },
  {
    name: "Tokens",
    category: "Data",
    summary: "Show wallet balances, onchain activity, and gated content slots.",
    actions: [
      "Adds GraphQL queries via Base data APIs",
      "Maps balances into cards with sorting + filters",
      "Caches responses in react-query for instant reloads",
    ],
  },
  {
    name: "Mint",
    category: "Commerce",
    summary: "Launch collectibles or passes with attestation gates.",
    actions: [
      "Generates mint API + metadata storage hooks",
      "Creates admin-only edit form for supply + price",
      "Links drop lifecycle into workflow console",
    ],
  },
  {
    name: "Automation",
    category: "Agent Tools",
    summary: "Run multi-step codemods, package installs, and schema updates.",
    actions: [
      "Detects repo layout + package manager",
      "Runs dry-run diffs before applying",
      "Commits to session branch with PR summary",
    ],
  },
];

const workflowSteps = [
  {
    id: 1,
    title: "Unpack upload & detect framework",
    summary: "Stack detector scans package.json, lockfiles, configs, and infers package manager + framework.",
    status: "success" as const,
  },
  {
    id: 2,
    title: "Plan component insertion",
    summary: "Agent builds a step plan: packages, provider edits, routes, env prompts, and dry-run diff.",
    status: "running" as const,
  },
  {
    id: 3,
    title: "Apply diff & run preview build",
    summary: "Ephemeral sandbox installs deps, runs lint/tests, and posts artifacts back to the UI.",
    status: "ready" as const,
  },
];

const safeguards = [
  {
    title: "Ephemeral sandboxes",
    detail: "Firecracker-backed containers boot per run with outbound allow-lists and auto-teardown.",
  },
  {
    title: "Secret vault",
    detail: "Env vars never hit the repo. Server-only keys are scoped per run and redacted from logs.",
  },
  {
    title: "Change tracking",
    detail: "Every agent action produces a diff, commit message, and human-readable summary before merge.",
  },
  {
    title: "Observability",
    detail: "Structured logs + metrics let you replay steps or run them in parallel Opal-style.",
  },
];

const milestones = [
  {
    phase: "MVP",
    timeline: "Weeks 1-2",
    focus: [
      "Upload → detect → preview for Static/React/Next",
      "Drag-drop Wallet with provider wiring",
      "One-click mini-app template on Base Sepolia",
    ],
    outcome: "A working builder where users can upload a site and drop in Wallet/Pay primitives with env prompts.",
  },
  {
    phase: "Expansion",
    timeline: "Weeks 3-4",
    focus: [
      "Base Pay drag-drop with lifecycle webhooks",
      "WalletConnect/Reown provider support",
      "Media library + content mapping",
    ],
    outcome: "Teams can accept payments, top-up funds, and map media into their site without manual edits.",
  },
  {
    phase: "DX & Scale",
    timeline: "Weeks 5-6",
    focus: [
      "Visual step debugger + parallel runs",
      "Branch-based versioning + rollback",
      "Vue/Svelte adapters via Web Components",
    ],
    outcome: "Opal-style debugging with multi-framework reach and production-ready workflows.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.12),_transparent_55%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-24 sm:px-8">
        <header className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-10 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <PillBadge tone="sky">Opal-style builder for Base</PillBadge>
            <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Upload any site. Drag Base primitives. Let the agent ship the diff.
            </h1>
            <p className="text-pretty text-base text-slate-300/90 sm:text-lg">
              Awesome idea—now a concrete blueprint. This studio ingests any frontend, detects the stack, and lets non-developers drop Wallet, Pay, Swap, and Mint blocks. The agent wires everything automatically using Base OnchainKit and Base Pay best practices.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#get-started"
                className="inline-flex items-center gap-2 rounded-full border border-sky-500/60 bg-sky-500/20 px-6 py-3 text-sm font-semibold text-sky-100 transition hover:border-sky-400/80 hover:bg-sky-500/30"
              >
                Start building
                <FiArrowRight className="text-lg" />
              </Link>
              <Link
                href="https://docs.base.org/"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500/60 hover:bg-slate-900/60"
              >
                Base docs
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: <FiUploadCloud className="text-2xl text-sky-300" />, 
                  title: "Upload → preview",
                  copy: "Drop a zip or Git URL. We boot a preview in seconds with zero config.",
                },
                {
                  icon: <FiCpu className="text-2xl text-sky-300" />,
                  title: "AI agents, visible steps",
                  copy: "Every edit surfaces a plan, diff, and rerunnable step log—Opal style.",
                },
                {
                  icon: <FiGitBranch className="text-2xl text-sky-300" />,
                  title: "Branch per session",
                  copy: "Auto-commits your diff with PR notes so teams can review and merge fast.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-800/60 bg-slate-950/60 p-4 text-left">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                  </div>
                  <p className="mt-2 text-sm text-slate-300/80">{item.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <BuilderPreview components={builderComponents} />

        <StackStrategyTabs strategies={stackStrategies} />

        <ComponentLibrary components={libraryComponents} />

        <WorkflowConsole steps={workflowSteps} />

        <SecurityChecklist safeguards={safeguards} />

        <MilestoneTimeline milestones={milestones} />

        <section
          id="get-started"
          className="rounded-3xl border border-slate-700/40 bg-slate-900/60 p-10 text-center shadow-2xl shadow-slate-950/40 backdrop-blur-xl"
        >
          <SectionHeading
            title="Ready to build the Base mini-app studio?"
            description="Hook up your Base credentials, invite your team, and ship wallet-enabled experiences in hours, not weeks."
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:founders@awesomebuilder.xyz"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/60 bg-emerald-500/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-400/80 hover:bg-emerald-500/30"
            >
              Book a walkthrough
              <FiArrowRight className="text-lg" />
            </Link>
            <Link
              href="https://blog.google/technology/developers/introducing-opal/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500/60 hover:bg-slate-900/60"
            >
              Learn from Opal
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
