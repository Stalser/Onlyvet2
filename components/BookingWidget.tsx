"use client";

import React from "react";
import { doctorSlots } from "@/lib/doctorSchedule";

/**
 * Виджет записи на приём (заглушка).
 * Показывает несколько слотов и кнопку "Записаться".
 */
export default function BookingWidget() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-800">
      <h2 className="font-medium mb-2">Быстрая запись</h2>
      <ul className="space-y-1">
        {doctorSlots.map((slot) => (
          <li
            key={slot.id}
            className="flex items-center justify-between border-b last:border-b-0 border-gray-100 pb-1 last:pb-0"
          >
            <span>{slot.label}</span>
            <span className="text-xs text-gray-500">{slot.type}</span>
          </li>
        ))}
      </ul>
      <button className="mt-3 w-full px-4 py-2 rounded-xl bg-black text-white text-sm">
        Записаться
      </button>
    </div>
  );
}
