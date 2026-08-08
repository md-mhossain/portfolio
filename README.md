# Portfolio Project

This repository contains two separate applications:

- `client/` — Next.js frontend
- `server/` — Express + Prisma backend

## Setup

Install dependencies for each app separately from the app folders:

```bash
cd server
npm install
cd ..\client
npm install
```

Create `.env` files if needed by copying the examples:

```bash
copy server\.env.example server\.env
copy client\.env.example client\.env
```

## Development

Run each app in its own terminal:

```bash
cd server
npm run dev
```

```bash
cd client
npm run dev
```

## Build

```bash
cd server
npm run build
```

```bash
cd client
npm run build
```

## Start

```bash
cd server
npm run start
```

```bash
cd client
npm run start
```

## Notes

- This repository is now configured as a plain multi-app project without a root `package.json`.
- Use the `server/` and `client/` folders directly for install, development, build, and start commands.
