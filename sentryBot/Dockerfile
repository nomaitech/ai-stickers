FROM python:3.12-slim-bookworm

ENV UV_COMPILE_BYTECODE=1

COPY --from=ghcr.io/astral-sh/uv:0.8.5 /uv /uvx /bin/

WORKDIR /app

COPY . /app

RUN uv sync --locked --no-install-project

CMD ["uv", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]