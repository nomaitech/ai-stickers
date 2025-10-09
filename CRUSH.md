CRUSH.md – Quickstart for agents in this repo

Build, run, lint, test
- Backend (Python FastAPI):
  - Install: uv pip install -r pyproject.toml deps (repo uses uv/pyproject). If uv not installed, use: pip install -U uv && uv sync --all-extras --dev
  - Run API locally: uv run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
  - Lint/format: uv run ruff check . ; uv run ruff format .
  - Alembic migrations: uv run alembic upgrade head
  - Docker: make build ; OPENAI_API_KEY=... make run
- Frontend (Vite + React + TS in client/):
  - Install: cd client && corepack enable && pnpm i (or npm i)
  - Dev server: cd client && pnpm dev
  - Build: cd client && pnpm build
  - Lint: cd client && pnpm lint

Single-test guidance
- No explicit Python test suite present. If adding tests, prefer pytest. Example single test: pytest tests/test_x.py::TestClass::test_case -q
- Frontend has no test runner configured; add vitest/jest if needed.

Environment
- Copy .envrc.example as needed. Required at runtime: OPENAI_API_KEY, database URL for Alembic/SQLAlchemy, Stripe keys, GCS creds.

Code style
- Python:
  - Imports: stdlib, third-party, local (src.*); absolute imports; no wildcard imports.
  - Formatting: ruff format; max line length 120; use type hints; prefer pydantic models in schemas.py.
  - Naming: snake_case for vars/functions, PascalCase for classes, UPPER_SNAKE for constants.
  - Errors: raise HTTPException from fastapi with detail and proper status; never leak secrets; log minimal messages.
  - DB: use SQLAlchemy models in models.py; migrations via Alembic; do not run DDL in app paths.
- TypeScript/React (client/):
  - Use functional components, hooks, and Redux Toolkit slices under src/store/*; prefer RTK Query APIs (e.g., genApi, authApi).
  - Imports: path-alias or relative; group external first, then internal; named exports preferred.
  - Formatting/Lint: follow eslint config; TypeScript strict types; avoid any; prefer union/enums; keep components small.
  - Naming: camelCase variables/functions, PascalCase components/types; action creators like doThingRequested.
  - Error handling: surface errors via UI slice alerts; never console.log secrets.

Cursor/Copilot rules
- No .cursor/rules or .cursorrules detected. No Copilot instructions file found.

Notes
- When adding commands, also mirror them into this CRUSH.md. Keep docker-compose and k8s manifests in sync with env vars.
