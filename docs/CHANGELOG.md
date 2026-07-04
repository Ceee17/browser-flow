# Changelog

## Unreleased

### Added
- Sprint 0 workspace packages: `shared-types`, `workflow-schema`, `selector-engine`, `browser-engine`, `scheduler`, `sdk`
- `apps/api` NestJS scaffold with Prisma, auth stubs, health controller
- Projects, workflows, executions, agents API endpoints
- `docker-compose.yml` and `apps/api/Dockerfile`
- Root `tsconfig.json` reference project
- Docs: ROADMAP, TODO structure

### Changed
- Moved `jest.config.js` into `src/test` to match test rootDir (CI fix)
- Root ESLint config retained with `parserOptions.project`

### Docs
- Added `docs/ROADMAP.md` with sprint checklist
