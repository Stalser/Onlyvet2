export function createTimeSlots(startHour: number, endHour: number, stepMinutes: number): string[] {
  const slots: string[] = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const hh = h.toString().padStart(2, '0');
      const mm = m.toString().padStart(2, '0');
      const time = `${hh}:${mm}`;
      if (time >= '10:00' && time <= '20:00') slots.push(time);
    }
  }
  return slots;
}
