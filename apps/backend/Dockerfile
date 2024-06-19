FROM node:20-alpine AS base
RUN npm i -g pnpm@9.3.0

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm i -g turbo@~2.0.4
COPY . .
RUN turbo telemetry disable
RUN turbo prune backend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
RUN pnpm i

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
COPY .prettierrc .prettierrc

RUN pnpm turbo build --filter=backend...

# FROM base AS runner
# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 nestjs
# RUN adduser --system --uid 1001 nestjs
# USER nestjs
# COPY --from=installer /app .

EXPOSE 8080
ENV PORT 8080
ENV HOSTNAME "0.0.0.0"
