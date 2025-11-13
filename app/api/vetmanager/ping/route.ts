// app/api/vetmanager/ping/route.ts
import { NextResponse } from 'next/server';
import { vmPing } from '@/lib/vetmanager';

export async function GET(){
  try{
    const r = await vmPing();
    return NextResponse.json(r);
  }catch(e:any){
    return NextResponse.json({ ok: false, error: e.message||'vm error' }, { status: 500 });
  }
}
