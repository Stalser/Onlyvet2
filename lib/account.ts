// lib/account.ts
export type User = { id: string; name: string; email: string };
export type Pet = { id: string; name: string; species: string; sex?: string; birth?: string; notes?: string };
export type Consultation = {
  id: string; date: string; doctorId?: string; doctorName?: string; service?: string;
  summary?: string; recommendations?: string;
};

// DEMO store on client via localStorage; server endpoints proxy to Vetmanager if env set
export const STORAGE_KEY = 'onlyvet:account';

export function loadAccount(): { user?: User; pets: Pet[]; consultations: Consultation[] } {
  if (typeof window === 'undefined') return { pets: [], consultations: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { pets: [], consultations: [] };
}

export function saveAccount(data: { user?: User; pets: Pet[]; consultations: Consultation[] }) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function newId(prefix='id'): string {
  return `${prefix}_${Math.random().toString(36).slice(2,8)}_${Date.now().toString(36)}`;
}
