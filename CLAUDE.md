# Notes for AI agents working in this repo

Read this before changing anything. The owner is learning to build software by directing agents, so every change should be easy to follow.

## The project

Stay on Track is a habit tracker built as a teaching project. The full plan, the architecture and the decisions behind it are in `docs/ARCHITECTURE.md`. Follow that plan; propose changes to it rather than drifting from it.

## Stack

- TypeScript everywhere, strict mode. Node 22.
- `web/`: React + Vite (Phase 1).
- `api/`: Hono on AWS Lambda (Phase 2). Pure logic such as `src/streaks.ts` has no AWS code in it.
- `infra/`: AWS CDK in TypeScript (Phase 1). Every AWS resource is defined here. Nothing is created by clicking in the console.
- DynamoDB, one table. Cognito for login (Phase 3). Region `us-east-1`.
- Tests: Vitest. Test files sit next to the code: `thing.ts` and `thing.test.ts`.

## Rules

1. Run `npm run check` before every commit. It must pass. CI runs the same checks.
2. Every new piece of logic gets unit tests in the same change.
3. Never commit secrets, keys, or account IDs. Config comes from CDK outputs into git-ignored env files.
4. GitHub Actions deploys to AWS through an IAM role it assumes with OIDC. Never add stored AWS keys anywhere.
5. Keep changes small: one idea per pull request.
6. Comments explain why, in plain words. Avoid unexplained acronyms.

## How to explain work to the owner

He is dyslexic and very visual. When reporting back: lead with the outcome, use short sentences, prefer a picture or a small table over a paragraph, and explain any new term in plain words the first time.
