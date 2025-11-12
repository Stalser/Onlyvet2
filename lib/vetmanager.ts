// lib/vetmanager.ts — совместимая версия с vmRequest и pushToVetmanager
const BASE = process.env.VETMANAGER_BASE_URL || '';
const TOKEN = process.env.VETMANAGER_TOKEN || '';

function ensureConfig() {
  if (!BASE || !TOKEN) {
    throw new Error('VETMANAGER_BASE_URL или VETMANAGER_TOKEN не заданы');
  }
}

export async function vmFetch(path: string, init?: RequestInit) {
  ensureConfig();
  const url = BASE.replace(/\/$/, '') + path;
  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    ...(init?.headers || {})
  };
  const res = await fetch(url, { ...init, headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Vetmanager ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function vmPing() {
  return { ok: !!BASE && !!TOKEN, base: !!BASE, token: !!TOKEN };
}

// Совместимость со старыми API-роутами: vmRequest
export async function vmRequest(path: string, options?: { method?: string; body?: any }) {
  const init: RequestInit = {
    method: options?.method || 'GET',
  };
  if (options?.body !== undefined) {
    init.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }
  return vmFetch(path, init);
}

// Совместимость со старым бронированием: pushToVetmanager
// TODO: заменить '/booking' и payload на реальный эндпоинт Vetmanager
export async function pushToVetmanager(payload: any) {
  try {
    await vmFetch('/booking', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch (e:any) {
    console.error('pushToVetmanager error', e);
    return { ok: false, error: e.message || 'vm error' };
  }
}

// --- Врачи (пример) ---
export type VmDoctor = { id: string; name: string; email?: string; specialty?: string };

export async function vmListDoctors(): Promise<VmDoctor[]> {
  const data = await vmFetch('/staff'); // TODO: реальный путь Vetmanager
  const raw = (data.items || data.staff || []) as any[];
  return raw.map((d) => ({
    id: String(d.id),
    name: d.name || d.fullName || d.title || 'Врач',
    email: d.email || d.emailAddress || '',
    specialty: d.specialty || d.position || ''
  }));
}

// --- Расписание врача (пример) ---
export type VmAppointment = {
  id: string;
  doctorId: string;
  patientName: string;
  startsAt: string;
  endsAt: string;
};

export async function vmListSchedule(doctorId: string): Promise<VmAppointment[]> {
  const data = await vmFetch(`/appointments?doctorId=${encodeURIComponent(doctorId)}`);
  const raw = (data.items || data.appointments || []) as any[];
  return raw.map((a) => ({
    id: String(a.id),
    doctorId,
    patientName: a.patientName || a.patient?.name || 'Пациент',
    startsAt: a.startsAt || a.start_time,
    endsAt: a.endsAt || a.end_time,
  }));
}
