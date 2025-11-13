export type DoctorSlot = {
  id: string;
  label: string;
  type: string;
};

export function getDoctorSchedule(doctorId: string): DoctorSlot[] {
  // Заглушка: пара фиксированных слотов
  return [
    { id: 'slot1', label: 'Сегодня, 10:00–10:30', type: 'Онлайн' },
    { id: 'slot2', label: 'Сегодня, 12:00–12:30', type: 'Клиника' },
  ];
}
