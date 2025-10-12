# Base Builder Studio

An "Opal-style" no-code/low-code studio that lets teams upload any website, drag Base components (Wallet, Base Pay, Swap, Mint, etc.), and rely on an AI agent to wire the code automatically. This repo contains a blueprint UI that showcases the product vision, user journeys, and technical architecture for bringing the experience to life.

## What you can explore

- **Builder tour** – Walk through the hero experience that mirrors the future drag-and-drop UI.
- **Framework-aware automation** – See how the agent plans injections for static HTML, React, Next.js, and other frameworks.
- **Component registry** – Review the Base primitives that the builder will surface, with the wiring work each drop performs.
- **Workflow console** – Understand the Opal-inspired step runner that exposes every AI action, diff, and rerunnable step.
- **Security & DX** – Inspect the guardrails (ephemeral sandboxes, secret vault, change tracking) that keep generated code safe and auditable.
- **Delivery milestones** – A six-week plan that gets from MVP to a fully-observable, multi-framework builder.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the concept UI. The page is static—no environment variables required.

## Tech stack

- **Next.js 15 (App Router)** for the marketing/blueprint experience
- **Tailwind CSS** for styling
- **React Icons** for iconography

## Project goals

This repo focuses on communicating the product direction. Future work will evolve it into a functional builder by:

1. Adding the upload/preview pipeline with stack detection.
2. Integrating the Base OnchainKit component registry and codemod tooling.
3. Shipping the Opal-style workflow console with rerunnable steps and detailed logs.
4. Delivering sandboxed previews, secret management, and Git-backed versioning.

Contributions, feedback, and feature suggestions are welcome—open an issue or reach out at [founders@awesomebuilder.xyz](mailto:founders@awesomebuilder.xyz).
