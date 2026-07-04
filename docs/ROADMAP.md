# BrowserFlow Roadmap

## Status: Active

- [x] Sprint 0 — Core platform skeleton
- [ ] Sprint 1 — Control Room (web app) + basic auth flow
- [ ] Sprint 2 — Workflow builder + recorder extension MVP
- [ ] Sprint 3 — Agent runner polling + execution streaming
- [ ] Sprint 4 — Selector engine confidence-based recovery
- [ ] Sprint 5 — Scheduler + webhooks + API consumers
- [ ] Sprint 6 — Agent SDK + plugin system
- [ ] Sprint 7 — Observability, RBAC, audit logs
- [ ] Sprint 8 — Docker Compose + Helm + Terraform
- [ ] Sprint 9 — Public beta / documentation / demo

## Sprint 0

- [x] Monorepo bootstrap: pnpm workspaces + Turborepo
- [x] Governances: LICENSE, SECURITY, CONTRIBUTING, CODE_OF_CONDUCT
- [x] Architecture: PRD, SAD, DATABASE, API_SPEC, ROADMAP, TODO
- [x] Package: shared-types
- [x] Package: workflow-schema
- [x] Package: selector-engine
- [x] Package: browser-engine
- [x] Package: scheduler
- [x] Package: sdk
- [x] App: control-room API scaffold (NestJS)
- [x] Docker: docker-compose + apps/api Dockerfile
- [x] CI readiness: lint/test.json, root tsconfig, jest config fixed
