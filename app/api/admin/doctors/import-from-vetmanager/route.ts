// app/api/admin/doctors/import-from-vetmanager/route.ts
import { NextResponse } from 'next/server';
import { vmListDoctors } from '@/lib/vetmanager';
import { addDoctor } from '@/lib/doctorStore';

function isAdmin(req: Request) {
  return (req.headers.get('cookie') || '').includes('ov_admin=1');
}

export async function POST(req: Request) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

  try {
    const vmDoctors = await vmListDoctors();
    vmDoctors.forEach(d => {
      if (!d.email) return;
      addDoctor({
        email: d.email,
        name: d.name,
        specialty: d.specialty,
      });
    });
    return NextResponse.json({ ok: true, count: vmDoctors.length });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || 'vm sync error' }, { status: 500 });
  }
}
