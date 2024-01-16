FROM node:20-alpine AS base

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN apk add --no-cache libc6-compat

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* ./
COPY ./frontend/package.json ./frontend/package.json
COPY ./backend/package.json ./backend/package.json
RUN pnpm i






# RUN pnpm i
# RUN pnpm backend:init

# WORKDIR /app/frontend
# RUN pnpm build


# ENV NODE_ENV production

# EXPOSE 3000

# ENV PORT 3000
# # set hostname to localhost
# ENV HOSTNAME "0.0.0.0"

# # server.js is created by next build from the standalone output
# # https://nextjs.org/docs/pages/api-reference/next-config-js/output
# CMD ["node", ".next/standalone/frontend/server.js"]