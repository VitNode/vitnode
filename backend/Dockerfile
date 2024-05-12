FROM node:20-alpine AS base
RUN npm i -g pnpm

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json ./
RUN pnpm i

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

EXPOSE 8080
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"