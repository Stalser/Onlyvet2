// lib/vetmanager.ts — совместимая версия с vmRequest(path, body, method) и pushToVetmanager
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

// --- vmRequest: 1) vmRequest(path, {method, body})  2) vmRequest(path, body, method) ---
export async function vmRequest(path: string, bodyOrOptions?: any, method?: string) {
  let init: RequestInit = {};
  if (typeof bodyOrOptions === 'object' && (bodyOrOptions?.method || bodyOrOptions?.body)) {
    // стиль vmRequest('/path', { method, body })
    init.method = bodyOrOptions.method || 'GET';
    if (bodyOrOptions.body !== undefined) {
      init.body = typeof bodyOrOptions.body === 'string' ? bodyOrOptions.body : JSON.stringify(bodyOrOptions.body);
    }
  } else {
    // стиль vmRequest('/path', body, 'POST')
    init.method = method || 'GET';
    if (bodyOrOptions !== undefined) {
      init.body = typeof bodyOrOptions === 'string' ? bodyOrOptions : JSON.stringify(bodyOrOptions);
    }
  }
  return vmFetch(path, init);
}

// --- pushToVetmanager: заглушка бронирования (адаптируем под реальный эндпоинт) ---
export async function pushToVetmanager(payload: any) {
  try {
    await vmFetch('/booking', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return { ok: true };
  } catch (e: any) {
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
