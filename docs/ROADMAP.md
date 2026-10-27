# V1 (MVP) roadmap

Har bir "kun" taxminan 3-4 soatlik blok. 3 soatlik kunda 1 blok, 6+ soatlik kunda 1.5-2 blok bajariladi.
Kun oxirida bajarilganlar `[x]` bilan belgilanadi va commit qilinadi.

## Asboblar (tooling)

| Soha            | Texnologiya                                                                   |
| --------------- | ----------------------------------------------------------------------------- |
| Format          | Prettier (ildizda bitta `.prettierrc.json`, tailwind plugin)                  |
| Lint            | ESLint 9 flat config (har bir paketda), `eslint-config-prettier`              |
| Git hook        | Husky + lint-staged (commitdan oldin Prettier)                                |
| Server testlari | Jest + Supertest (unit va e2e), CI'da Postgres va Redis service konteynerlari |
| Client testlari | Vitest + React Testing Library + jsdom                                        |
| E2E (brauzer)   | Playwright (Kun 10 dan)                                                       |
| Server xatolari | Global exception filter (`ErrorPayload` formatida), `nestjs-pino` loglari     |
| Client xatolari | `error.tsx` / `not-found.tsx` chegaralari, toast (sonner)                     |
| Monitoring      | Sentry (client va server, Kun 15)                                             |
| CI              | GitHub Actions: format, typecheck, lint, test, build, e2e                     |
| CD              | Vercel (client), Render deploy hook (server), CI `main`da o'tgandan keyin     |

## Kun 0: Muhit va boshlang'ich commit

- [x] PostgreSQL 16 (native) o'rnatish, `gamequest` user va DB yaratish
- [x] Memurai Developer (Redis) o'rnatish
- [x] Ikkala servisni Manual rejimga qo'yish
- [x] `pnpm dev` ishlashini tekshirish
- [x] `main` branch, birinchi commit, ushbu roadmap
- [x] CLAUDE.md'ga lokal DB/Redis sozlash izohi
- [x] Prettier, ESLint (3 paket), Husky + lint-staged, EditorConfig, `.gitattributes`
- [x] Vitest + RTL (client), Jest (server), `typecheck`/`test`/`format` skriptlari
- [x] GitHub Actions CI workflow
- [x] NestJS paketlarini 11 qatoriga, `prisma`ni 7.10.1 ga tenglashtirish
- [ ] GitHub repo yaratib push qilish, CI yashil ekanini tekshirish

## Kun 1: Prisma va ma'lumotlar bazasi

- [ ] `schema.prisma`: User, QuestionSet, Question, GameSession, GameResult
- [ ] Birinchi migration
- [ ] Global `PrismaModule`/`PrismaService`
- [ ] Seed: teacher + namuna to'plam
- [ ] `ConfigModule` + env validatsiyasi, global `ValidationPipe`
- [ ] Global exception filter (`ErrorPayload`), `nestjs-pino` logger
- [ ] Test DB (`gamequest_test`), CI'da `prisma migrate deploy`

## Kun 2: Auth (server)

- [ ] Register/login (bcrypt), access + refresh JWT
- [ ] `/auth/refresh`, `/auth/me`
- [ ] `JwtAuthGuard`, `RolesGuard`, `@Roles()`, CORS
- [ ] Unit + e2e testlar

## Kun 3: Client poydevori va auth UI

- [ ] next-intl (uz default, ru), `[locale]` routing, layout, til almashtirish
- [ ] API client (refresh bilan), Zustand `authStore`
- [ ] Login/register sahifalari, rolga qarab redirect, himoyalangan route'lar
- [ ] `error.tsx`, `not-found.tsx`, toast xabarlari; form komponentlari testlari

## Kun 4: Savollar to'plami (server)

- [ ] QuestionSet/Question CRUD, DTO validatsiyasi, egasini tekshirish
- [ ] Har bir savol turi uchun `correctAnswer` validatsiyasi
- [ ] Service testlari

## Kun 5: Savollar to'plami muharriri (client)

- [ ] Teacher dashboard: ro'yxat, yaratish, o'chirish
- [ ] Savol muharriri: 4 tur, kod bloki, variantlar, to'g'ri javob, vaqt, tartib

## Kun 6: Game engine, 1-qism (pure logika)

- [ ] `GameMode` interfeysi va mode registry
- [ ] Redis store `game:{pin}` (TTL bilan)
- [ ] `POST /games`: GameSession + unikal 6 xonali PIN
- [ ] `PublicQuestion` mapper, answer checker, testlar

## Kun 7: Game engine, 2-qism (socket va lobby)

- [ ] `/game` gateway, Redis adapter, tiplangan eventlar
- [ ] `host:create`, `player:join` (unikal nickname), `lobby:update`
- [ ] Reconnect token, ixtiyoriy JWT, disconnect

## Kun 8: Game engine, 3-qism (o'yin oqimi)

- [ ] `host:start`, savol yuborish, server taymerlari
- [ ] `player:answer` → `answer:result`, `host:next`, `host:end`
- [ ] `synchronized` / `self-paced` pacing, `onTick`
- [ ] Natijalarni `GameResult`ga yozish
- [ ] Fake mode bilan engine testlari

## Kun 9: Classic (server) va lobby UI

- [ ] Classic: tezlikka qarab ball, streak, leaderboard, view'lar, testlar
- [ ] O'yin yaratish sahifasi (to'plam + rejim)
- [ ] Host lobby: PIN, QR, o'yinchilar; `/join` sahifasi

## Kun 10: Classic (client)

- [ ] Socket hook, `gameStore`, client mode registry
- [ ] Classic `HostView` va `PlayerView`
- [ ] Yakun ekrani; ikki brauzerda to'liq o'yin sinovi
- [ ] Playwright o'rnatish, birinchi E2E: host o'yin ochadi, 2 o'yinchi qo'shiladi, o'yin tugaydi

## Kun 11: Crypto Hack (server)

- [ ] Sandiqdan mukofot, boshqa o'yinchini hack qilish (parol)
- [ ] Vaqt yoki maqsad summa bo'yicha tugash
- [ ] `onAction`, self-paced, unit testlar

## Kun 12: Crypto Hack (client)

- [ ] `PlayerView`: savol, sandiq, hack ekrani, "sizni hack qilishdi"
- [ ] `HostView`: jonli reyting, voqealar lentasi

## Kun 13: Natijalar va dashboardlar

- [ ] Teacher: o'yinlar tarixi va natijalar
- [ ] Student: "mening natijalarim"
- [ ] Reconnect, xatolar, loading holatlari

## Kun 14: Sayqallash

- [ ] uz/ru tarjimalari, mobil moslashuv
- [ ] Lint, testlar, bug fix
- [ ] Ikki rejimni boshidan oxirigacha qo'lda sinash
- [ ] Crypto Hack uchun Playwright E2E, test coverage hisobotini ko'rish

## Kun 15: Deploy (ixtiyoriy)

- [ ] Vercel (client), Render/Railway (server), Neon (DB), Upstash (Redis)
- [ ] Prod env, migration'lar, domen, CORS
- [ ] CD: CI `main`da yashil bo'lsa avtomatik deploy (Vercel Git integratsiyasi + Render deploy hook)
- [ ] Sentry (client va server), health-check endpoint
