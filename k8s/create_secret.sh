#!/bin/bash

kubectl create secret generic ai-sticker-api-secrets --from-literal=OPENAI_API_KEY=$OPENAI_API_KEY