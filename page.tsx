// app/booking/page.tsx
import { Suspense } from "react";
import BookingWidget from "@/components/BookingWidget";

export const metadata = {
  title: "Запись — OnlyVet",
};

export default function BookingPage() {
  return (
    <section className="container py-16">
      <Suspense fallback={<div>Загрузка формы записи…</div>}>
        <BookingWidget />
      </Suspense>
    </section>
  );
}
