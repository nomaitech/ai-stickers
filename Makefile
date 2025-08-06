build:
	docker build -t ai-sticker:latest .

run:
	docker run -e OPENAI_API_KEY=$OPENAI_API_KEY -t -i -p 8000:8000 ai-sticker:latest