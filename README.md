# Stay on Track

A habit tracker. Sign up, add habits, tap days on a month grid to mark them done, and watch your streaks grow.

This is a learning project. It is small on purpose, but it has every piece a real app has: a screen, a backend, a database, login, tests, and a pipeline that checks and ships every change.

## Where the project is

| Phase | What you can see when it is done                 | Status      |
| ----- | ------------------------------------------------ | ----------- |
| 0     | A green check on GitHub for every change         | In progress |
| 1     | The app live at a public web address             | Next        |
| 2     | Check-ins are saved, even after a page reload    |             |
| 3     | Sign up and log in; each person sees only theirs |             |
| 4     | Alarms, a cost alert, backups, a test copy       |             |

The full map and every decision is in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## What is in each folder

| Folder              | What lives there                                           |
| ------------------- | ---------------------------------------------------------- |
| `web/`              | The screen people see and click (from Phase 1)             |
| `api/`              | The app's rules: streak math now, the backend from Phase 2 |
| `infra/`            | Every AWS resource, written as code (from Phase 1)         |
| `docs/`             | The plan, the map and the decisions                        |
| `.github/workflows` | The CI robot that checks every change                      |

## Run it on your own computer

You need Node 22. Then, in a terminal, inside this folder:

```sh
npm ci          # install the exact tool versions
npm run check   # run every check CI runs
npm run test:watch   # rerun tests every time a file is saved
```
