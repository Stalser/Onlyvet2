// lib/db.ts
import type { Pool } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool | null {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
  if (!url) return null;
  if (!pool) {
    const { Pool } = require('pg') as typeof import('pg');
    pool = new Pool({ connectionString: url, ssl: url.includes('vercel-storage') ? { rejectUnauthorized: false } : undefined });
  }
  return pool;
}

export async function ensureTables() {
  const p = getPool();
  if (!p) return;
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
  if (!p) return { rows: [], demo: true };
  const res = await p.query(q, params || []);
  return { rows: res.rows, demo: false };
}
