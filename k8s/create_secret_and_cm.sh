#!/bin/bash

kubectl create secret generic ai-sticker-api-secrets \
    --from-literal=OPENAI_API_KEY="${PRODUCTION_OPENAI_API_KEY}" \
    --from-literal=JWT_PRIVATE_KEY="${PRODUCTION_JWT_PRIVATE_KEY}" \
    --from-literal=JWT_PUBLIC_KEY="${PRODUCTION_JWT_PUBLIC_KEY}" \
    --from-literal=DATABASE_URL="${PRODUCTION_DATABASE_URL}" \
    --from-literal=STRIPE_SECRET_KEY="${PRODUCTION_STRIPE_SECRET_KEY}" \
    --from-literal=STRIPE_WEBHOOK_SECRET="${PRODUCTION_STRIPE_WEBHOOK_SECRET}" \
    --from-file=GOOGLE_APPLICATION_CREDENTIALS_JSON="${PRODUCTION_GOOGLE_APPLICATION_CREDENTIALS}" \
    --from-literal=TELEGRAM_BOT_TOKEN="${PRODUCTION_TELEGRAM_BOT_TOKEN}"

kubectl create configmap ai-sticker-api-config \
    --from-literal=GCS_BUCKET_NAME="${PRODUCTION_GCS_BUCKET_NAME}" \
    --from-literal=FRONTEND_URL="${PRODUCTION_FRONTEND_URL}"