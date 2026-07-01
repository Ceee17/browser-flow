# API Specification (High Level)

Base path: `/api/v1`

All responses return `{ "data": ... }` on success and `{ "error": { "code", "message" } }` on failure.

---

## Authentication

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/auth/login` | Returns `{ accessToken, refreshToken }` |
| POST | `/auth/refresh` | Rotate refresh token |

---

## Organizations

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/orgs` | List orgs for current user |
| POST | `/orgs` | Create org |

---

## Projects

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/projects` | List projects in org |
| POST | `/projects` | Create project |

---

## Workflows

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/projects/:projectId/workflows` | List workflows |
| POST | `/projects/:projectId/workflows` | Create workflow (new version) |
| PUT | `/projects/:projectId/workflows/:id` | Update workflow (new version) |
| GET | `/projects/:projectId/workflows/:id` | Get workflow |
| POST | `/projects/:projectId/workflows/:id/execute` | Trigger execution |
| DELETE | `/projects/:projectId/workflows/:id` | Delete workflow |

---

## Executions

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/executions` | List executions (filter by project, workflow, agent, status) |
| GET | `/executions/:id` | Get execution detail |
| GET | `/executions/:id/logs` | Paginated logs |
| POST | `/executions/:id/cancel` | Cancel running execution |

---

## Agent Runner Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/agents/register` | Register new agent |
| POST | `/agents/heartbeat` | Heartbeat + resource telemetry |
| GET | `/jobs/next` | Long-poll for next job |
| POST | `/executions/:id/logs` | Upload logs |
| POST | `/executions/:id/artifacts` | Upload artifacts |

---

## Vault

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/projects/:projectId/vault` | List secrets (metadata only) |
| POST | `/projects/:projectId/vault` | Create/update secret |
| DELETE | `/projects/:projectId/vault/:id` | Delete secret |

---

## Schedules

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/projects/:projectId/schedules` | List schedules |
| POST | `/projects/:projectId/schedules` | Create schedule |
| DELETE | `/projects/:projectId/schedules/:id` | Delete schedule |

---

## Webhook Events (Control Room → Runner)

Events are pushed via long-poll or WebSocket (v1+).

- `job:assigned` — runner received a job.
- `execution:complete` — execution finished.
- `execution:failed` — execution failed.

---

## WebSocket Events (Control Room UI)

- `execution.started`
- `execution.step.started`
- `execution.step.completed`
- `execution.step.failed`
- `execution.completed`
- `execution.log`

---

Note: This is a high-level overview. Detailed OpenAPI specs will live in `docs/api/`.
