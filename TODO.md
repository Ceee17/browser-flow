# TODO

High-level backlog. Updated after each session.

## Sprint 0 — Repository Foundation

- [x] Initialize Git + branch structure (main, develop)
- [x] Root package.json with pnpm + Turbo scripts
- [x] pnpm-workspace.yaml
- [x] turbo.json
- [x] .gitignore
- [x] LICENSE (Apache-2.0)
- [x] README.md
- [x] PROJECT_VISION.md
- [x] PRODUCT_REQUIREMENTS.md
- [x] SOFTWARE_ARCHITECTURE.md
- [x] DATABASE.md
- [x] API_SPEC.md
- [x] ROADMAP.md
- [x] TODO.md
- [x] CHANGELOG.md
- [ ] CONTRIBUTING.md
- [ ] SECURITY.md
- [ ] CODE_OF_CONDUCT.md
- [ ] `.claude` or agent rules file
- [ ] License-audit script
- [ ] Docker Compose scaffolding
- [ ] GitHub Actions CI (lint + test)
- [x] `packages/workflow-schema` package initialized
- [x] `packages/selector-engine` package initialized
- [x] `packages/browser-engine` package initialized
- [x] `packages/scheduler` package initialized

---

## v0.1 — Core Runtime (Next)

- [ ] Finalize workflow-schema Zod schema
- [ ] `packages/browser-engine` Playwright wrapper
- [ ] `packages/selector-engine` multi-strategy selector scoring
- [ ] `apps/api` NestJS with auth + projects + workflows + executions + agents
- [ ] `apps/agent-runner` Node.js runner daemon
- [ ] End-to-end test: runner executes workflow and returns artifacts

---

## v0.2 — Basic Control Room (Next)

- [ ] Next.js frontend
- [ ] Dashboard UI
- [ ] React Flow builder
- [ ] WebSocket real-time logs

---

## v0.3 — Production Ready (Next)

- [ ] Credential vault
- [ ] Scheduler
- [ ] Recorder extension scaffold
- [ ] Runner installer artifacts
