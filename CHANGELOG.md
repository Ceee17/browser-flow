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
- CI workflow with lint + test jobs.
- 6+ passing unit tests across packages.
