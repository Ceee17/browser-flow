# BrowserFlow

**AI-Native Browser Automation Platform**

Open core. Cloud-native. Browser-first.

[Apache 2.0](LICENSE) · [Roadmap](ROADMAP.md) · [Contributing](CONTRIBUTING.md)

## What is this?

BrowserFlow is an open-core browser automation platform designed to replace legacy RPA (UiPath, Automation Anywhere, Power Automate) for cloud-native teams. It focuses exclusively on browser automation in the MVP, with a modular architecture that will expand into desktop, API, database, SSH, mobile, and AI-agent automation over time.

## Key Concepts

- **Workflows are JSON** — portable, versionable, diffable.
- **Selectors are multi-strategy** — XPath, CSS, ARIA, text, semantics, with confidence scoring.
- **Runners are outbound-only** — no inbound firewall rules required.
- **Control Room never executes** — it only orchestrates.
- **Apache 2.0 core** — commercial SaaS and enterprise features on top.

## Quickstart (Docker Compose)

```bash
git clone https://github.com/browserflow/core.git
cd core
cp .env.example .env
docker compose up -d
```

Access:
- Control Room: http://localhost:3000
- API: http://localhost:4000
- Docs: http://localhost:4000/api/docs

## Repository Structure

- `apps/` — control-room, api, agent-runner, recorder-extension
- `packages/` — workflow-schema, workflow-engine, browser-engine, selector-engine, sdk, shared-types
- `infra/` — docker, k8s, terraform, ci
- `docs/` — PRD, SAD, ADRs, API spec

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## License

Apache 2.0. See [LICENSE](LICENSE).
