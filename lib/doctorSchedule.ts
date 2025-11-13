// lib/doctorSchedule.ts
// Мок-расписание по врачам. Замените на реальные данные / Vetmanager.

export type DoctorSlot = {
  id: string;
  doctorEmail: string;
  startsAt: string; // ISO
  endsAt: string;   // ISO
};

const now = Date.now();

export const doctorSlots: DoctorSlot[] = [
  {
    id: 'slot-1',
    doctorEmail: 'ivanova@example.com',
    startsAt: new Date(now + 2 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now + 2.5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'slot-2',
    doctorEmail: 'ivanova@example.com',
    startsAt: new Date(now + 5 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now + 5.5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'slot-3',
    doctorEmail: 'petrov@example.com',
    startsAt: new Date(now + 3 * 60 * 60 * 1000).toISOString(),
    endsAt: new Date(now + 3.5 * 60 * 60 * 1000).toISOString(),
  },
];
