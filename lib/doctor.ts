/**
 * Временные заглушки для функций работы с приёмами врача.
 * Позже сюда можно добавить реальные запросы к Supabase.
 */

export type DoctorAppointment = {
  id: string;
  title?: string;
  startsAt?: string;
  endsAt?: string;
};

export async function getDoctorAppointments(doctorId: string): Promise<DoctorAppointment[]> {
  // TODO: заменить на реальную реализацию
  return [];
}

export async function getDoctorAppointmentById(id: string): Promise<DoctorAppointment | null> {
  // TODO: заменить на реальную реализацию
  return {
    id,
    title: "Тестовая консультация",
    startsAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
  };
}
