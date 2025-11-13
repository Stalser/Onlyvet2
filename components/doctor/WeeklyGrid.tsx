"use client";

import React from "react";

type WeeklyGridProps = {
  appointments?: {
    id: string;
    title?: string;
    startsAt?: string;
    endsAt?: string;
  }[];
};

/**
 * Заглушка недельного расписания врача.
 * Сейчас просто выводит список приёмов.
 */
export default function WeeklyGrid({ appointments = [] }: WeeklyGridProps) {
  if (!appointments.length) {
    return <p>Пока нет запланированных приёмов.</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {appointments.map((a) => (
        <div
          key={a.id}
          style={{
            padding: 8,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "white",
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500 }}>
            {a.title || `Приём #${a.id}`}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>
            {a.startsAt} — {a.endsAt}
          </div>
        </div>
      ))}
    </div>
  );
}
