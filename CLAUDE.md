# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Game Quest: a Blooket/Kahoot-style web platform for learning programming through games. A teacher builds a question set (programming questions), hosts a live game in a chosen **game mode**, and students join by PIN or QR code. Later versions add self-paced courses for students (HTML, CSS, JS...). The UI is in Uzbek (default) and Russian. The user communicates in Uzbek.

V1 scope: auth (TEACHER / STUDENT roles), question sets, live games with the `classic` (Kahoot) and `crypto-hack` (Blooket Crypto Hack-style) modes. More modes will be added, so the mode system must stay pluggable.

## Layout

pnpm workspace monorepo:
- `client/` — Next.js 15 (App Router, `src/`, Tailwind v4, next-intl, socket.io-client, Zustand). Port 3000.
- `server/` — NestJS 11 (Prisma + PostgreSQL, Redis, Socket.io gateway, JWT). Port 4000.
- `shared/` — `@game-quest/shared`: TS types shared by both sides (question types, mode ids, socket event contracts). Compiled to `shared/dist` (CommonJS). **Rebuild it after changing it** (`pnpm --filter @game-quest/shared build`, or it rebuilds in watch mode during `pnpm dev`).

## Commands

Run from the repo root:
- `pnpm install`
- `docker compose up -d` — Postgres + Redis (Docker is not installed on the dev machine yet; local installs work too, see `server/.env`)
- `pnpm dev` — builds `shared`, then runs shared watch, client and server in parallel
- `pnpm build` / `pnpm lint` / `pnpm test`
- One server test: `pnpm --filter @game-quest/server test -- <file-or-pattern>` (e.g. `classic.mode.spec.ts`)
- Server e2e tests: `pnpm --filter @game-quest/server test:e2e`

Env files: `server/.env` and `client/.env.local` (copy from the `.env.example` files).

## Architecture (planned, built in stages)

- **Persistent data** (Prisma, `server/prisma/schema.prisma`): User, QuestionSet, Question (types `MULTIPLE_CHOICE`, `CODE_OUTPUT`, `TRUE_FALSE`, `TEXT_INPUT`), GameSession (pin, mode, settings, status), GameResult.
- **Live game state** lives in Redis under `game:{pin}` and is written to `GameResult` when the game ends. Socket.io uses the Redis adapter; one room per PIN, namespace `/game`.
- **Answers are checked only on the server.** A question sent to players (`PublicQuestion`) never contains the correct answer.
- **Socket event contracts** are typed in `shared/src/events.ts` (`ClientToServerEvents` / `ServerToClientEvents`). Change the contract there first; both sides use it.
- **Game engine vs. modes:** the engine (`server/src/game-engine/`) handles lobby, question delivery, timers, answer checking, start/end and reconnects for every mode. A mode only implements scoring and mechanics through the `GameMode` interface (`game-engine/modes/game-mode.interface.ts`): `init`, `onPlayerJoin`, `onAnswer`, optional `onAction` / `onTick`, `isFinished`, `hostView`, `playerView`. Pacing is `synchronized` (everyone on the same question) or `self-paced`. Keep mode logic pure, so it can be unit tested without sockets or Redis.
- **Adding a game mode:** add its id to `GAME_MODES` in `shared/src/modes.ts`. Then add `server/src/game-engine/modes/<id>/` and `client/src/modes/<id>/` (`HostView.tsx`, `PlayerView.tsx`, `index.ts`) and register the mode in both registries. Don't change engine code to add a mode.
- Players join with only a nickname (no account needed). If they are logged in, their result is linked to their user.
