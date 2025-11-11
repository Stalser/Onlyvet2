// lib/db.ts
// Hotfix: no 'pg' dependency required at build-time.
// Uses eval('require') so Next/SWC won't try to bundle 'pg' unless DATABASE_URL is set.
declare global {
  // eslint-disable-next-line no-var
  var __onlyvet_pool: any | undefined;
}

export function getPool(): any | null {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
  if (!url) return null; // demo mode

  try {
    if (!globalThis.__onlyvet_pool) {
      const req: any = eval('require');           // <= avoid static resolution
      const { Pool } = req('pg');
      globalThis.__onlyvet_pool = new Pool({
        connectionString: url,
        ssl: url.includes('vercel-storage') ? { rejectUnauthorized: false } : undefined,
      });
    }
    return globalThis.__onlyvet_pool;
  } catch (e) {
    // If 'pg' is not installed, stay in demo mode without crashing the build.
    return null;
  }
}

export async function ensureTables() {
  const p = getPool();
  if (!p) return; // demo
  await p.query(`
    create table if not exists users (
      id serial primary key,
      email text unique not null,
      name text,
      created_at timestamptz default now()
    );
    create table if not exists auth_codes (
      id serial primary key,
      email text not null,
      code text not null,
      expires_at timestamptz not null,
      created_at timestamptz default now()
    );
    create table if not exists pets (
      id serial primary key,
      user_email text not null,
      name text not null,
      species text,
      sex text,
      birth text,
      notes text,
      created_at timestamptz default now()
    );
    create table if not exists consultations (
      id serial primary key,
      user_email text not null,
      date text not null,
      doctor_id text,
      doctor_name text,
      service text,
      summary text,
      recommendations text,
      created_at timestamptz default now()
    );
  `);
}

export async function run(q: string, params?: any[]) {
  const p = getPool();
  if (!p) return { rows: [], demo: true }; // in demo mode
  const res = await p.query(q, params || []);
  return { rows: res.rows, demo: false };
}
