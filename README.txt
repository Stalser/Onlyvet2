OnlyVet Auth+DB v3 (clients only) — install guide
1) Add env on Vercel: DATABASE_URL = <your Postgres URL> (optional for demo).
2) (Optional for real DB) Add dependency 'pg' in package.json or via Vercel UI.
3) Upload files preserving paths. Deploy. Tables auto-create on first API call.
4) Flow: /auth/register -> code -> /auth/login -> enter code -> /account.
