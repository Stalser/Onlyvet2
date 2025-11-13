"use client";

import React from "react";

type StarsProps = {
  value: number; // от 0 до 5
};

export default function Stars({ value }: StarsProps) {
  const full = Math.round(value);
  const stars = Array.from({ length: 5 }, (_, i) => i < full);

  return (
    <span className="inline-flex">
      {stars.map((filled, idx) => (
        <span key={idx} className={filled ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </span>
  );
}
