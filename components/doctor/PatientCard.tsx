"use client";

import React from "react";

type Patient = {
  id: string;
  name: string;
  species?: string;
  age?: string;
};

type PatientCardProps = {
  patient: Patient;
};

/**
 * Карточка пациента (заглушка).
 */
export default function PatientCard({ patient }: PatientCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-800">
      <div className="font-semibold mb-1">{patient.name}</div>
      <div className="text-xs text-gray-500">
        Вид: {patient.species || "не указан"}
      </div>
      <div className="text-xs text-gray-500">
        Возраст: {patient.age || "не указан"}
      </div>
      <div className="mt-2 text-[11px] text-gray-400">ID: {patient.id}</div>
    </div>
  );
}
