// app/api/account/route.ts
import { getSession } from '@/lib/session';
import { ensureTables, run } from '@/lib/db';

export async function GET() {
  const session = getSession();
  if (!session.email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  await ensureTables();
  const { rows: users } = await run('select email, full_name, phone from users where email=$1 limit 1', [session.email]);
  const user = users[0] || null;
  return new Response(JSON.stringify({ ok:true, user }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
