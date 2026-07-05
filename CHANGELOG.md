# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-07-04

### Added
- Monorepo bootstrap with pnpm workspaces + Turborepo
- `packages/workflow-schema`: Zod-validated JSON workflow schema v1 (15 step types, selector confidence scoring)
- `packages/selector-engine`: Multi-strategy selector resolution with primary/fallback ordering and confidence scoring
- `packages/browser-engine`: Playwright wrapper with 14 browser actions
- `packages/scheduler`: Trigger types for manual, cron, webhook, and API execution
- `packages/shared-types`: Shared TypeScript types for cross-package usage
- `packages/sdk`: BrowserFlow SDK for workflow interaction
- `apps/api`: NestJS app with health controller, Prisma schema, auth stubs, and 4 feature modules (projects, workflows, executions, agents)
- `apps/agent-runner`: Node.js NestJS microservice daemon scaffold for register/poll/execute
- Docker Compose for local development (Postgres, Redis, API, agent-runner)
- Prisma initial migration (`0001_init`) with proper schema versioning
- Swagger UI (`@nestjs/swagger`) for interactive API documentation at `/docs`
- `.eslintrc.json` with strict TypeScript parser options
- GitHub Actions CI workflow (lint + test)

### Fixed
- Root `tsconfig.json` missing for ESLint parserOptions.project reference
- Jest `rootDir` mismatch causing CI to miss tests
- Agent registration raw SQL replaced with Prisma Client native query
- Added `Agent` model to Prisma schema for proper type safety

### Security
- Switched Git remote from HTTPS to SSH for all operations
- Configured global Git URL rewrite rule to prevent accidental HTTPS credential usage
- Retained Apache-2.0 license for unrestricted commercial distribution
