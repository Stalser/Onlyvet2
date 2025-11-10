import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log('PAYMENT STARTED', body);
  // TODO: интеграция с эквайрингом (Stripe/ЮKassa/CloudPayments).
  return new Response(JSON.stringify({ ok: true, transactionId: 'demo-' + Date.now() }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
