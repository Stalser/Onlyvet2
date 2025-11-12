// lib/doctor.ts
export type DoctorUser = {
  id: string;
  name: string;
  email: string;
  role: 'doctor';
  specialty: string;
};

export type Patient = {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  age?: string;
  weightKg?: number;
  owner?: { name: string; phone?: string; email?: string };
  notes?: string;
};

export type Appointment = {
  id: string;
  startsAt: string; // ISO
  endsAt: string;   // ISO
  patientId: string;
  service: string;
  status: 'scheduled'|'done'|'cancelled';
  channel: 'chat'|'video';
};

export const mockDoctor: DoctorUser = {
  id: 'doc-001',
  name: 'Д-р Иванова',
  email: 'doctor@example.com',
  role: 'doctor',
  specialty: 'Терапевт'
};

export const patients: Record<string, Patient> = {
  'p-101': { id: 'p-101', name: 'Симба', species: 'dog', breed: 'СПБ', age: '4 года', weightKg: 18.2,
    owner: { name: 'Петрова А.А.', phone: '+7 900 000-00-01', email: 'owner1@example.com' },
    notes: 'Аллергии нет, вакцинирован' },
  'p-102': { id: 'p-102', name: 'Локи', species: 'cat', breed: 'шотландец', age: '2 года 6 мес', weightKg: 5.1,
    owner: { name: 'Сафонова Е.А.', phone: '+7 900 000-00-02', email: 'owner2@example.com' },
    notes: 'Рвота, отказ от еды (подозрение на ЖКТ)' }
};

export const appointments: Appointment[] = [
  { id: 'a-1', startsAt: new Date(Date.now()+60*60*1000).toISOString(), endsAt: new Date(Date.now()+90*60*1000).toISOString(), patientId: 'p-102', service: 'Онлайн-консультация', status: 'scheduled', channel: 'video' },
  { id: 'a-2', startsAt: new Date(Date.now()+3*60*60*1000).toISOString(), endsAt: new Date(Date.now()+3.5*60*60*1000).toISOString(), patientId: 'p-101', service: 'Повторная консультация', status: 'scheduled', channel: 'chat' }
];
