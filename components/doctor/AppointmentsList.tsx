"use client";

import React from "react";

/**
 * Заглушка списка ближайших приёмов.
 */
export default function AppointmentsList() {
  const demo = [
    { id: "1", time: "10:00", patient: "Мурзик", type: "Онлайн" },
    { id: "2", time: "11:30", patient: "Бобик", type: "Клиника" },
  ];

  return (
    <ul className="space-y-2 text-sm text-gray-700">
      {demo.map((a) => (
        <li
          key={a.id}
          className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2"
        >
          <div>
            <div className="font-medium">{a.time}</div>
            <div className="text-xs text-gray-500">
              {a.patient} • {a.type}
            </div>
          </div>
          <span className="text-xs text-gray-400">#{a.id}</span>
        </li>
      ))}
    </ul>
  );
}
