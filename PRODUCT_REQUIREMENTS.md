# Product Requirements

## 1. Overview

BrowserFlow is an open-core browser automation platform. The MVP delivers a minimal but complete cloud control room and a local agent runner that executes JSON-defined browser workflows using Playwright.

## 2. User Stories (MVP)

### Control Room (Operator)
- As an operator, I can create an organization and invite users.
- As an operator, I can create a project.
- As an operator, I can upload a workflow JSON.
- As an operator, I can trigger a workflow execution on a registered agent.
- As an operator, I can view execution status, logs, and screenshots.
- As an operator, I can schedule a workflow via cron or webhook.
- As an operator, I can store secrets in a credential vault.
- As an operator, I can monitor agent health.

### Agent Runner (Runner)
- As a runner, I can register with the control room.
- As a runner, I can poll for jobs.
- As a runner, I can download and validate workflow JSON.
- As a runner, I can execute a workflow using Playwright.
- As a runner, I can upload logs, screenshots, and artifacts.
- As a runner, I can heartbeat without inbound exposure.

### Developer
- As a developer, I can author workflows as JSON.
- As a developer, I can call REST APIs to trigger executions.
- As a developer, I can extend the platform with custom packages.

## 3. Non-Functional Requirements (MVP)

| Attribute | Target |
|-----------|--------|
| Latency | Workflow start < 5s after trigger |
| Throughput | Control room handles 100 RPS API |
| Availability | 99.9% uptime target for SaaS tier |
| Scale | 1,000 concurrent runners in MVP architecture |
| Security | All traffic TLS; vault secrets encrypted at rest |
| Observability | Structured logs with trace IDs; exportable logs |
| Compatibility | Runner runs on Ubuntu 22.04+, Windows Server 2019+ |

## 4. Licensing Constraints

All dependencies must be MIT, Apache-2.0, or BSD. No GPL/copyleft unless explicitly approved.

Commercial resale must be possible without copyleft contamination.

## 5. Out of Scope for MVP

- Desktop automation
- Mobile automation
- AI-assisted automation
- Self-healing selectors
- Natural language generation
- Visual workflow builder (comes in v0.2)
- Browser recorder extension (comes in v0.3)
