// app/api/vetmanager/ping/route.ts — FIXED VERSION
import { NextResponse } from 'next/server';
import { vmPing } from '@/lib/vetmanager';

export async function GET() {
  try {
    const r = await vmPing();
    // vmPing уже содержит поле ok — не дублируем
    return NextResponse.json(r);
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message || 'vm error' },
      { status: 500 }
    );
  }
}
