// app/api/account/route.ts
import { getSession } from '@/lib/session';
import { ensureTables, run } from '@/lib/db';

export async function GET() {
  const session = getSession();
  if (!session.email) return new Response(JSON.stringify({ ok:false, error:'Unauthorized' }), { status: 401 });
  await ensureTables();
  const { rows: pets } = await run('select * from pets where user_email=$1 order by id desc', [session.email]);
  const { rows: consultations } = await run('select * from consultations where user_email=$1 order by id desc', [session.email]);
  return new Response(JSON.stringify({ ok:true, email: session.email, pets, consultations }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
