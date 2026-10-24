# Ish tartibi (Git va GitHub)

## Asosiy qoida

`main` himoyalangan: unga to'g'ridan-to'g'ri push qilib bo'lmaydi. Har bir o'zgarish alohida branch'da qilinadi va PR orqali kiradi. PR faqat CI yashil bo'lganda **squash-merge** qilinadi. Merge'dan keyin branch avtomatik o'chadi.

## Branch nomi

Format: `<tur>/day<N>-<qisqa-nom>`. Roadmap'dagi biror kunga bog'liq bo'lmagan ishda `day<N>` qismi yozilmaydi.

| Tur        | Qachon                                             | Misol                      |
| ---------- | -------------------------------------------------- | -------------------------- |
| `feat`     | Yangi funksiya                                     | `feat/day2-auth`           |
| `fix`      | Xatoni tuzatish                                    | `fix/day7-reconnect-token` |
| `refactor` | Xatti-harakat o'zgarmaydi, kod tuzilmasi o'zgaradi | `refactor/game-store`      |
| `test`     | Faqat testlar                                      | `test/day8-engine`         |
| `docs`     | Hujjatlar                                          | `docs/roadmap-update`      |
| `chore`    | Sozlamalar, bog'liqliklar                          | `chore/deps-update`        |
| `ci`       | GitHub Actions                                     | `ci/e2e-migrations`        |
| `perf`     | Tezlikni oshirish                                  | `perf/leaderboard`         |

Odatda bitta kun-blok uchun 1 ta branch va 1 ta PR ochiladi. Blok katta bo'lsa, 2 ta PR bo'ladi (masalan, server va client alohida).

## Commit xabarlari

[Conventional Commits](https://www.conventionalcommits.org/) formatida, **ingliz tilida** yoziladi:

```
<tur>(<scope>): <qisqa matn, kichik harfda, oxirida nuqtasiz>
```

Scope'lar: `server`, `client`, `shared`, `engine`, `ci`, `deps`, `docs`. Scope yozish ixtiyoriy.

```
feat(server): add JWT auth module
fix(client): keep locale on redirect
test(engine): cover reconnect flow
chore(deps): bump next to 15.5.29
```

Xabar formatini `commit-msg` hook (commitlint) tekshiradi. Noto'g'ri formatdagi commit qabul qilinmaydi.

## PR sarlavhasi

Squash-merge'da `main`ga **PR sarlavhasi** commit bo'lib tushadi. Shuning uchun sarlavha ham Conventional Commits formatida yoziladi. Buni `PR title` workflow tekshiradi.

## Kunlik ish tartibi

```bash
git switch main && git pull                 # 1. eng so'nggi main
git switch -c feat/day1-prisma-schema       # 2. yangi branch
# ... kod yozish, kichik commitlar ...
git push -u origin feat/day1-prisma-schema  # 3. push
gh pr create --fill                         # 4. PR (shablon avtomatik qo'shiladi)
gh pr checks --watch                        # 5. CI natijasini kutish
gh pr merge --squash                        # 6. CI yashil bo'lsa merge
git switch main && git pull                 # 7. main'ni yangilash
```

PR ichida `docs/ROADMAP.md`dagi bajarilgan tasklar `[x]` bilan belgilanadi.

## Merge'dan oldin majburiy tekshiruvlar

- `Lint, typecheck, unit tests, build`
- `Server e2e tests`
- `Conventional PR title`

Commit qilishdan oldin lokalda tekshirib olish uchun: `pnpm format:check && pnpm typecheck && pnpm lint && pnpm test`.
