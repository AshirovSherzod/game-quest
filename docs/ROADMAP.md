# V1 (MVP) roadmap

Har bir "kun" taxminan 3-4 soatlik blok. 3 soatlik kunda 1 blok, 6+ soatlik kunda 1.5-2 blok bajariladi.
Kun oxirida bajarilganlar `[x]` bilan belgilanadi va commit qilinadi.

## Kun 0: Muhit va boshlang'ich commit
- [ ] PostgreSQL 16 (native) o'rnatish, `gamequest` user va DB yaratish
- [ ] Memurai Developer (Redis) o'rnatish
- [ ] Ikkala servisni Manual rejimga qo'yish
- [ ] `pnpm dev` ishlashini tekshirish
- [x] `main` branch, birinchi commit, ushbu roadmap
- [ ] CLAUDE.md'ga lokal DB/Redis sozlash izohi

## Kun 1: Prisma va ma'lumotlar bazasi
- [ ] `schema.prisma`: User, QuestionSet, Question, GameSession, GameResult
- [ ] Birinchi migration
- [ ] Global `PrismaModule`/`PrismaService`
- [ ] Seed: teacher + namuna to'plam
- [ ] `ConfigModule` + env validatsiyasi, global `ValidationPipe`

## Kun 2: Auth (server)
- [ ] Register/login (bcrypt), access + refresh JWT
- [ ] `/auth/refresh`, `/auth/me`
- [ ] `JwtAuthGuard`, `RolesGuard`, `@Roles()`, CORS
- [ ] Unit + e2e testlar

## Kun 3: Client poydevori va auth UI
- [ ] next-intl (uz default, ru), `[locale]` routing, layout, til almashtirish
- [ ] API client (refresh bilan), Zustand `authStore`
- [ ] Login/register sahifalari, rolga qarab redirect, himoyalangan route'lar

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

## Kun 15: Deploy (ixtiyoriy)
- [ ] Vercel (client), Render/Railway (server), Neon (DB), Upstash (Redis)
- [ ] Prod env, migration'lar, domen, CORS
