// lib/doctor.ts

export type Patient = {
  id: string;
  name: string;
  species: string;
  age: string;
};

export type Appointment = {
  id: string;
  patientId: string;
  startsAt: string;
  endsAt: string;
  comment?: string;
};

export const patients: Patient[] = [
  {
    id: '1',
    name: 'Мурзик',
    species: 'cat',
    age: '3 года',
  },
  {
    id: '2',
    name: 'Бобик',
    species: 'dog',
    age: '5 лет',
  },
];

export const appointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    startsAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    comment: 'Тестовая запись для OnlyVet',
  },
  {
    id: '2',
    patientId: '2',
    startsAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    endsAt: new Date(Date.now() + 90 * 60 * 1000).toISOString(),
    comment: 'Вторая тестовая запись',
  },
];

export async function getDoctorAppointments(doctorId: string): Promise<Appointment[]> {
  // Заглушка: возвращаем все записи
  return appointments;
}

export async function getDoctorAppointmentById(id: string): Promise<Appointment | null> {
  return appointments.find((a) => a.id === id) ?? null;
}
