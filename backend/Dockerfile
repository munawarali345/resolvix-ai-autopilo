
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Backend package.json
COPY backend/package.json ./backend/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build backend only
RUN pnpm --filter resolvix-ai-backend build

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["pnpm", "--filter", "resolvix-ai-backend", "start"]
