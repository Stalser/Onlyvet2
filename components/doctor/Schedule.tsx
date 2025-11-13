"use client";

import React from "react";

/**
 * Заглушка расписания врача.
 * Сейчас просто показывает текст и пример одного слота.
 */
export default function Schedule() {
  return (
    <div className="space-y-2 text-sm text-gray-700">
      <p>Здесь будет визуальное расписание врача.</p>
      <div className="mt-3 rounded-xl border border-dashed border-gray-300 p-3">
        <div className="font-medium">Сегодня</div>
        <div className="text-xs text-gray-500">Пример слота: 10:00–10:30, онлайн-консультация</div>
      </div>
    </div>
  );
}
