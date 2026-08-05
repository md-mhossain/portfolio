# Portfolio Project

This repository contains two separate applications:

- `web/` — Next.js frontend
- `api/` — Express + Prisma backend

## Setup

Install dependencies for each app separately from the app folders:

```bash
cd api
npm install
cd ..\web
npm install
```

Create `.env` files if needed by copying the examples:

```bash
copy api\.env.example api\.env
copy web\.env.example web\.env
```

## Development

Run each app in its own terminal:

```bash
cd api
npm run dev
```

```bash
cd web
npm run dev
```

## Build

```bash
cd api
npm run build
```

```bash
cd web
npm run build
```

## Start

```bash
cd api
npm run start
```

```bash
cd web
npm run start
```

## Notes

- This repository is now configured as a plain multi-app project without a root `package.json`.
- Use the `api/` and `web/` folders directly for install, development, build, and start commands.
