// app/api/vetmanager/schedule/route.ts
import { NextResponse } from 'next/server';
import { vmListSchedule } from '@/lib/vetmanager';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId') || '';
  if (!doctorId) {
    return NextResponse.json({ error: 'doctorId required' }, { status: 400 });
  }
  try {
    const items = await vmListSchedule(doctorId);
    return NextResponse.json({ ok: true, items });
  } catch (e:any) {
    return NextResponse.json({ ok: false, error: e.message || 'vm schedule error' }, { status: 500 });
  }
}
