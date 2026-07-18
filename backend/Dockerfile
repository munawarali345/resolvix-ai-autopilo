
FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Backend package.json
COPY backend/package.json ./backend/

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build backend only
RUN pnpm --filter resolvix-ai-backend build

EXPOSE 3001

CMD ["pnpm", "--filter", "resolvix-ai-backend", "start"]
