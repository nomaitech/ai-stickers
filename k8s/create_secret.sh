#!/bin/bash

kubectl create secret generic ai-sticker-api-secrets \
    --from-literal=OPENAI_API_KEY="${PRODUCTION_OPENAI_API_KEY}" \
    --from-literal=JWT_PRIVATE_KEY="${PRODUCTION_JWT_PRIVATE_KEY}" \
    --from-literal=JWT_PUBLIC_KEY="${PRODUCTION_JWT_PUBLIC_KEY}" \
    --from-literal=DATABASE_URL="${PRODUCTION_DATABASE_URL}"

kubectl create secret generic sentry-bot-secrets \
  --from-literal=TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN}" \
  --from-literal=TELEGRAM_CHAT_ID="${TELEGRAM_CHAT_ID}" \
  --from-literal=WEBHOOK_SECRET="${WEBHOOK_SECRET}"