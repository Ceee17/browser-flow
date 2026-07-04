# TODO

## Sprint 1 — Control Room core

- [ ] Implement real JWT auth with users + orgs
- [ ] Add RBAC guards (owner/admin/member)
- [ ] Web app scaffold: Next.js app router
- [ ] Dashboard pages: workspace/projects list
- [ ] Workflow detail page with JSON editor
- [ ] Execution history page with live logs
- [ ] Postgres migration files for schema evolution

## Known Issues
- Native `tsc --noEmit` hangs locally in this environment; CI validation needed
- No `@nestjs/swagger` dependency installed yet
