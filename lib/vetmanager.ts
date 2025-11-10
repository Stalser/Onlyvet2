export type AppointmentPayload = {
  ownerName: string; email: string; phone: string;
  petName: string; petType: string;
  specialty: string; doctorId: string; date: string; time: string; notes?: string;
};
export async function pushToVetmanager(payload: AppointmentPayload) {
  const base = process.env.VETMANAGER_BASE_URL;
  const key = process.env.VETMANAGER_API_KEY;
  if (!base || !key) return { ok: true, skipped: true, message: 'VETMANAGER_* not set — demo mode' };
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/vetmanager`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (e: any) {
    return { ok: false, error: e?.message || 'Vetmanager push failed' };
  }
}
