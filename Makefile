build:
	docker build -t ai-sticker:latest .

run:
	docker run \
	  -e OPENAI_API_KEY=$OPENAI_API_KEY \
	  -p 8000:8000 \
	  -t -i ai-sticker:latest

build-bot:
	docker build -t sentry-bot:latest .

run-bot:
	docker run \
	  -e TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN \
	  -e TELEGRAM_CHAT_ID=$TELEGRAM_CHAT_ID \
	  -e WEBHOOK_SECRET=$WEBHOOK_SECRET \
	  -p 8001:8000 \
	  -t -i sentry-bot:latest