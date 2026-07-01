# Contributing to BrowserFlow

First, thank you for considering a contribution. This document explains how to participate.

## Code of Conduct

Be respectful, inclusive, and constructive. See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## How to Contribute

1. Fork and clone the repository.
2. Create a feature branch from `develop`.
3. Make your changes with tests.
4. Ensure `pnpm lint`, `pnpm test`, and `pnpm build` pass.
5. Open a pull request against `develop`.

## Branching Model

- `main` — release-ready code.
- `develop` — integration branch.
- `feature/*` — new work.
- `bugfix/*` — fixes.
- `release/*` — release preparation.

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(scope): summary
fix(scope): summary
refactor(scope): summary
test(scope): summary
docs(scope): summary
ci: summary
```

## Development Setup

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Testing

```bash
pnpm test          # all tests
pnpm test --filter=workflow-schema  # single package
```

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.
