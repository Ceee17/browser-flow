# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] — 2026-07-01

### Added
- Repository scaffolding with pnpm workspaces and Turborepo.
- Core documentation: PRD, SAD, Database schema, API spec, roadmap.
- Apache 2.0 license and governance docs.
- `workflow-schema` package initial Zod validation for workflow JSON.
- `selector-engine` package with selector resolution + confidence scoring.
- `browser-engine` package with Playwright action wrapper (14 browser actions).
- `scheduler` package skeleton with trigger types (manual, cron, webhook, API).
- `shared-types` package with shared domain interfaces.
- `sdk` package with REST API client scaffold.
- CI workflow with lint + test jobs.
- 6 packages with passing unit tests (19 total tests).
- Initial GitHub remote sync to github.com/Ceee17/browser-flow
- NestJS API app scaffold: health controller, Prisma schema, auth stub modules
- 4 core feature modules scaffolded: projects, workflows, executions, agents
