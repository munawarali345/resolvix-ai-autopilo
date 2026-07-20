FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Frontend package.json
COPY frontend/package.json ./frontend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy complete workspace
COPY . .

# Build frontend only
RUN pnpm --filter resolvix-ai-frontend build

# =====================================================

FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app .

EXPOSE 3000

CMD ["pnpm", "--filter", "resolvix-ai-frontend", "start"]