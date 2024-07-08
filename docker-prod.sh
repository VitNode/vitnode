#!/bin/bash

# Run docker-compose
docker compose -f ./docker-compose.yml -p vitnode up -d --build

# Prune docker images
docker image prune -a -f