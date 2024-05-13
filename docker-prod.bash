#!/bin/bash

# Stop and remove all containers
# docker rm vitnode_database --force
# docker rm vitnode_backend --force
# docker rm vitnode_frontend --force

# Run docker-compose
docker-compose -f ./docker-compose.yml -p vitnode up -d --build

# Copy config.json from container to local
docker cp vitnode_frontend:/app/config.json ./frontend/config/config.json