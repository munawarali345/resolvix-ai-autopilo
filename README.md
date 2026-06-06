# Resolvix AI

Resolvix AI is a production-ready monorepo foundation for building autonomous AI platforms, scalable web applications, SaaS products, hackathon projects, and modern full-stack systems.

The project follows a structured monorepo architecture with a dedicated frontend, backend, shared tooling, automated CI validation, and modern development workflows.

[![CI](https://github.com/munawarali345/resolvix-ai-autopilo/actions/workflows/ci.yml/badge.svg)](https://github.com/munawarali345/resolvix-ai-autopilo/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PNPM](https://img.shields.io/badge/pnpm-10.x-orange)](https://pnpm.io/)


### Monorepo Architecture

* PNPM Workspace Configuration
* Frontend & Backend Separation
* Shared Dependency Management
* Scalable Folder Structure

### Frontend Setup

* Next.js 15 (App Router)
* TypeScript
* Tailwind CSS
* shadcn/ui Components
* Zustand State Management
* TanStack Query
* Recharts Integration

### Backend Setup

* Express.js
* TypeScript (ESM)
* MongoDB (Mongoose)
* JWT Authentication Support
* bcryptjs Password Hashing
* Winston Logging

### Development Tooling

* PNPM Package Manager
* ESLint Configuration
* Prettier Formatting
* Husky Git Hooks
* GitHub Actions CI Pipeline
* Build Validation Workflow

## Project Structure

```text
resolvix-ai/
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── components/ui/
│   │   ├── lib/
│   │   └── types/
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── README.md
```

## Quick Start

### Install Dependencies

```bash
pnpm install
```

### Start Frontend

```bash
pnpm dev:frontend
```

Frontend runs at `http://localhost:3000`

### Start Backend

```bash
pnpm dev:backend
```

Backend runs at `http://localhost:5000`

## Available Scripts

### Development

```bash
pnpm dev:frontend
pnpm dev:backend
pnpm lint
pnpm format
```

### Production

```bash
pnpm build
pnpm start
```

## Environment Configuration

### Frontend

Create `frontend/.env.local`

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Backend

Create `backend/.env`

Add required environment variables according to your project requirements.

## CI/CD

GitHub Actions automatically validates:

* Dependency Installation
* Build Process
* Linting
* Test Execution

Every push and pull request triggers automated checks.

## Current Status

### Completed

* Monorepo Setup
* PNPM Workspace
* Frontend Foundation
* Backend Foundation
* TypeScript Configuration
* ESLint Configuration
* Husky Setup
* GitHub Actions CI Workflow

### In Progress

* API Development
* AI Agent Architecture
* Monitoring & Logging Enhancements

## License

MIT License