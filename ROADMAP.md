# Roadmap

## Status Legend
- [x] Completed
- [~] In Progress
- [ ] Planned

---

## Phase 0: Foundation (Sprint 0)

- [x] Repository scaffolding (monorepo, pnpm, Turbo)
- [x] `workflow-schema` package (JSON schema + Zod validation)
- [x] `selector-engine` package initial structure
- [x] `browser-engine` package initial structure
- [x] `scheduler` package initial structure
- [ ] NestJS API scaffolding with Postgres + Redis + BullMQ
- [ ] Agent runner scaffolding (register/poll/execute)
- [ ] Docker Compose for local dev
- [x] GitHub Actions CI (lint + test)

---

## Phase 1: MVP (v0.1–v0.3) — ~12 weeks

### v0.1 — Core Runtime (Weeks 1–4)
- [ ] Workflow JSON schema v1 finalized
- [ ] Browser engine: 15 core Playwright actions
- [ ] Selector engine: XPath, CSS, ARIA, text candidates + confidence
- [ ] Agent runner: register, poll, execute, heartbeat
- [ ] API: auth, projects, workflows, executions, agent endpoints
- [ ] End-to-end: runner executes workflow, uploads logs + screenshot

### v0.2 — Basic Control Room (Weeks 5–8)
- [ ] Next.js frontend scaffolded
- [ ] Auth UI (email/password)
- [ ] Dashboard: project list, workflow list, execution history
- [ ] React Flow workflow builder (10 node types)
- [ ] Real-time execution logs via WebSocket
- [ ] Agent health monitoring

### v0.3 — Production Ready (Weeks 9–12)
- [ ] Credential vault (encrypted secrets)
- [ ] Scheduler (cron + manual)
- [ ] Browser recorder extension (Chrome MV3)
- [ ] Windows Service + Linux systemd runner installers
- [ ] Docker image for runner published
- [ ] Observability: trace IDs, structured logs

---

## Phase 2: Browser Automation Complete (v1.0) — ~8 weeks

- [ ] Visual workflow builder with full node library
- [ ] Recorder extension stable + publish to Chrome Web Store
- [ ] Teams + role-based permissions
- [ ] Audit logs
- [ ] Hosted cloud SaaS launch (trial)
- [ ] Pricing + billing infrastructure
- [ ] Community launch + documentation site

---

## Phase 3: Intelligent Automation (v2.0) — TBD

- [ ] AI-assisted selector generation
- [ ] Self-healing selectors (silent re-resolution)
- [ ] Natural language → workflow (LLM)
- [ ] AI debugging assistant
- [ ] Multi-channel automation (API, DB, SSH)
- [ ] Desktop automation bridge
- [ ] MCP integrations

---

## Phase 4: Universal Platform (v3.0) — TBD

- [ ] Mobile automation
- [ ] Marketplace for workflow templates and connectors
- [ ] Enterprise SSO (SAML/OIDC)
- [ ] Advanced RBAC + audit retention
- [ ] OEM / white-label licensing
