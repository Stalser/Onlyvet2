OnlyVet — Auth+Account DB Patch (CRUD for pets & consultations)

1) Add or set env var on Vercel:
   - DATABASE_URL = <your Postgres URL (Vercel Postgres / Neon / Supabase)>
   (If not set, the API works in demo mode and returns empty lists without errors.)

2) Install dependency 'pg' (locally or via Vercel UI):
   - npm i pg   (or yarn add pg / pnpm add pg)

3) Upload these files to the repo preserving paths. Deploy.
   Tables will be auto-created (users, pets, consultations).

4) Go to /auth/login → enter email → receive dev-code on screen and verify.
   Then open /account: you can add pets and consultations. APIs:
     GET/POST /api/pets, GET/POST /api/consultations, PUT/DELETE by id as included.
