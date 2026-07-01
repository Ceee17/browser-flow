# Software Architecture Document

## 1. Introduction

This document describes the architecture of BrowserFlow, an open-core AI-native browser automation platform.

## 2. Architectural Principles

- **Cloud-native first** — stateless control plane; fungible runners.
- **Outbound-only** — runners never expose inbound ports.
- **Immutable workflows** — workflows as JSON documents; edits create new versions.
- **Separation of concerns** — control room orchestrates; runners execute.
- **Type-safety everywhere** — TypeScript strict mode; Zod validation for all boundaries.
- **Auditability** — every execution, edit, and vault access is logged.
- **Scalable by default** — horizontal scaling through queue-based job dispatch.

## 3. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Cloud Control Room                         │
│  Next.js (Frontend)  +  NestJS (API)                        │
│  PostgreSQL  +  Redis  +  S3-compatible Object Storage       │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / WSS (outbound from runners)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                     Agent Runner                              │
│  Node.js daemon (Docker / Windows Service / systemd)        │
│  Registers, polls, executes workflows, uploads artifacts    │
└──────────────────────────┬──────────────────────────────────┘
                           │ spawns per execution
                           ▼
              ┌────────────────────────┐
              │    Playwright Worker    │
              │  (Chromium/Firefox/WebKit) │
              └────────────────────────┘
```

### 3.1 Control Room Responsibilities
- Authenticate users and API clients.
- Manage organizations, projects, workflows, agents, executions, schedules, vault secrets.
- Expose REST API + WebSocket events.
- Persist execution records and logs.
- Provide dashboard UI.
- **Never execute automation directly.**

### 3.2 Agent Runner Responsibilities
- Authenticate with a scoped bearer token.
- Register host metadata (OS, Playwright version, browsers installed).
- Poll for jobs every N seconds with backoff.
- Download workflow JSON + assets.
- Execute via Playwright in isolated browser contexts.
- Stream logs, screenshots, artifacts back to control room.
- Heartbeat every 30s.

## 4. Communication Contracts

### Runner → Control Room
| Method | Purpose | Auth |
|--------|---------|------|
| POST `/api/v1/agents/register` | Provision runner | Bearer JWT |
| POST `/api/v1/agents/heartbeat` | Liveness + resource report | Bearer JWT |
| GET `/api/v1/jobs/next` | Acquire next job | Bearer JWT |
| POST `/api/v1/executions/:id/logs` | Upload logs | Bearer JWT |
| POST `/api/v1/executions/:id/artifacts` | Upload artifacts | Bearer JWT |

### Control Room → UI
- REST for CRUD operations.
- WebSocket for real-time execution progress.

## 5. Workflow Execution Model

A workflow execution is a **snapshot** of a JSON workflow at a point in time. The runner downloads the exact JSON and executes it. No server-side interpretation is required.

## 6. State Model

- Control room is stateless beyond DB and Redis.
- Runners are stateless workers; they pull work and push results.
- All state lives in PostgreSQL (workflows, executions, logs, vault) or Redis (queue).

## 7. Security Model

- JWT access tokens (15m) + refresh tokens.
- Short-lived runner tokens scoped to one agent/project.
- Vault secrets encrypted with AES-256-GCM; key in env variable.
- TLS 1.3 required for all external traffic.
- Workflows are interpreted (not executed as code) to prevent RCE.

## 8. Observability

- Structured JSON logs with `traceId` propagated from control room → runner → execution.
- Execution timeline: step start/end timestamps, duration, status.
- Screenshot on failure (configurable).
- Future: OpenTelemetry traces.

## 9. Deployment Topology

### MVP (Docker Compose on single VM)
- Nginx reverse proxy (ports 80/443)
- Next.js app
- NestJS API
- PostgreSQL
- Redis
- MinIO (S3-compatible)

### Production (K8s)
- Ingress controller (Cloudflare / nginx)
- Next.js replicas + NestJS replicas
- Managed Postgres + Redis
- S3-compatible storage (R2 / S3 / MinIO)
- Agent runners installed on customer premises
