# Security Policy

## Reporting a Vulnerability

Please do not report security vulnerabilities through public GitHub issues.

Instead, email **security@browserflow.dev** with:

- A description of the issue.
- Steps to reproduce.
- Potential impact.

We will acknowledge within 72 hours and provide a detailed response within 7 days.

## Security Principles

- **Defense in depth:** validate at every boundary (API, runner, database).
- **Least privilege:** runner tokens are scoped; UI users have RBAC.
- **Encrypted secrets:** vault values are never stored plaintext.
- **Immutable records:** executions and logs are append-only.

## Runner Trust Model

- Runners authenticate with short-lived JWTs scoped to one agent.
- All communication is outbound (runner → control room).
- Compromised runner tokens only expose the associated project.

## Dependency Hygiene

- CI runs automated license checks and dependency audits.
- We prefer permissive licenses (MIT, Apache-2.0, BSD).
- No runtime evaluation of untrusted input (workflows are interpreted).
