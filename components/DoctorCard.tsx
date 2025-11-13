"use client";

import Link from "next/link";
import Stars from "@/components/Stars";
import type { Doctor } from "@/lib/data";
import { doctorServicesMap, servicesPricing } from "@/lib/pricing";

type Props = {
  doctor: Doctor;
};

export default function DoctorCard({ doctor }: Props) {
  // Берём коды услуг для врача (по id)
  const codes: string[] = doctorServicesMap[doctor.id] ?? [];

  // Фильтруем прайсы по этим кодам, без строгой типизации
  const items = (servicesPricing as any[]).filter((s: any) =>
    codes.length ? codes.includes(s.code) : true
  );

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-base">{doctor.name}</h3>
          <div className="text-xs text-gray-500 mt-0.5">
            {doctor.speciality}
          </div>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-600">
            <Stars value={doctor.rating ?? 5} />
            <span>{doctor.rating?.toFixed(1) ?? "5.0"}</span>
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-1 space-y-1">
          {items.map((s: any) => (
            <div
              key={s.id}
              className="flex items-center justify-between text-xs"
            >
              <span className="opacity-80">{s.name}</span>
              <span className="font-semibold">
                {s.priceRUB !== undefined
                  ? `${s.priceRUB.toLocaleString("ru-RU")} ₽`
                  : "уточняется"}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2 flex justify-between items-center">
        <Link
          href={`/doctors/${doctor.id}`}
          className="text-xs text-blue-600 underline underline-offset-2"
        >
          Подробнее о враче
        </Link>
        <Link
          href={`/booking?doctor=${doctor.id}`}
          className="px-3 py-1.5 rounded-xl bg-black text-white text-xs"
        >
          Записаться
        </Link>
      </div>
    </article>
  );
}
