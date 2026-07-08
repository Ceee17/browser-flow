# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-07-06

### Added
- Real JWT auth backed by Postgres + Prisma + bcrypt
- `POST /api/v1/auth/register` for self-service signup
- `POST /api/v1/auth/login` with bcrypt password verification
- `GET /api/v1/auth/me` protected endpoint returning current user
- Swagger UI at `/docs` with bearer auth
- `apps/agent-runner`: NestJS microservice daemon scaffold
- Prisma initial migration (`0001_init`) with pgcrypto extension
- Docker Compose for local dev (Postgres, Redis, API, agent-runner)

### Changed
- Replaced stub `AuthService` with real implementation using PrismaService
- Marked v0.1 Core Runtime items complete in `ROADMAP.md`

### Fixed
- TypeScript build errors: guard imports, strategy import, config module rename
- Jest `rootDir` mismatch causing CI to miss tests
- Missing root `tsconfig.json` for ESLint parserOptions.project

### Security
- Switched Git auth to SSH; configured global URL rewrite to prevent HTTPS credential leakage
- Passwords hashed with bcrypt (cost 10) before storage
- JWT signed with HS256 and env-configured secret

## [0.0.1] - 2026-07-02

### Added
- Monorepo bootstrap with pnpm workspaces + Turborepo
- `packages/workflow-schema`: Zod-validated JSON workflow schema
- `packages/selector-engine`: Multi-strategy selector resolution
- `packages/browser-engine`: Playwright wrapper scaffold
- `packages/scheduler`: Trigger types scaffold
- `packages/shared-types`: Shared TypeScript types
- `packages/sdk`: BrowserFlow SDK scaffold
- `apps/api`: NestJS scaffold with health controller + auth stubs
- GitHub Actions CI (lint + test)
- Apache-2.0 license
