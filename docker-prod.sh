#!/bin/bash

# Run docker-compose
docker compose -f ./docker-compose.yml -p vitnode up -d --build

# Copy config.json from container to local
docker cp vitnode_frontend:/app/frontend/config/config.json ./frontend/config/config.json

# Prune docker images
docker image prune -a -f