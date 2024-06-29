#!/bin/bash

# Run docker-compose
docker compose -f ./docker-compose.yml -p vitnode up -d --build

# Copy config.json from container to local
docker cp vitnode_frontend:/app/frontend/config.json ./frontend/utils/config.json

# Prune docker images
docker image prune -a -f