// lib/data.ts
// Пример списка врачей OnlyVet. Замените на реальные данные и пути к фотографиям.

export const doctors = [
  {
    id: "doc-ivanova",
    name: "Д-р Иванова Алина Сергеевна",
    email: "ivanova@example.com",
    specialty: "Терапевт",
    experience: 5,
    photo: "/images/doctors/ivanova.jpg", // поместите файл в public/images/doctors
    bio: "Ветеринарный врач-терапевт. Специализируется на внутренних болезнях собак и кошек, онлайн-консультациях, интерпретации анализов и комплексной оценке состояния животных.",
  },
  {
    id: "doc-petrov",
    name: "Д-р Петров Максим Андреевич",
    email: "petrov@example.com",
    specialty: "Кардиолог",
    experience: 7,
    photo: "/images/doctors/petrov.jpg",
    bio: "Ветеринарный кардиолог с опытом интерпретации ЭХО-КГ, рентгенологических и лабораторных исследований. Помогает дистанционно оценить состояние сердца животного.",
  },
  {
    id: "doc-sidorova",
    name: "Д-р Сидорова Мария Николаевна",
    email: "sidorova@example.com",
    specialty: "Дерматолог",
    experience: 4,
    photo: "/images/doctors/sidorova.jpg",
    bio: "Врач-дерматолог, специализируется на аллергиях, хронических кожных заболеваниях и зудящих состояниях. Проводит онлайн-консультации и составление плана терапии.",
  },
];

export const specialties = Array.from(new Set(doctors.map((d) => d.specialty)));
