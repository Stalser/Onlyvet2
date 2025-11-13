// lib/data.ts
// Расширенный список врачей OnlyVet. Замените на реальные данные при необходимости.

export const doctors = [
  {
    id: "doc-ivanova",
    name: "Д-р Иванова Алина Сергеевна",
    email: "ivanova@example.com",
    specialty: "Терапевт",
    experience: 6,
    photo: "/images/doctors/ivanova.jpg",
    bio: "Ветеринарный врач-терапевт. Опыт работы в клинике более 6 лет. Уделяет внимание деталям, любит объяснять владельцам суть происходящего простым языком.",
  },
  {
    id: "doc-kuznetsov",
    name: "Д-р Кузнецов Дмитрий Олегович",
    email: "kuznetsov@example.com",
    specialty: "Терапевт",
    experience: 8,
    photo: "/images/doctors/kuznetsov.jpg",
    bio: "Практикующий врач-терапевт. Специализируется на сложных внутренних болезнях и ведении длительных пациентов в формате онлайн-наблюдения.",
  },
  {
    id: "doc-petrov",
    name: "Д-р Петров Максим Андреевич",
    email: "petrov@example.com",
    specialty: "Кардиолог",
    experience: 7,
    photo: "/images/doctors/petrov.jpg",
    bio: "Ветеринарный кардиолог. Занимается разбором ЭХО-КГ, рентгенологических исследований и сложных сердечных случаев у собак и кошек.",
  },
  {
    id: "doc-sidorova",
    name: "Д-р Сидорова Мария Николаевна",
    email: "sidorova@example.com",
    specialty: "Дерматолог",
    experience: 5,
    photo: "/images/doctors/sidorova.jpg",
    bio: "Врач-дерматолог. Специализируется на хронических кожных заболеваниях, аллергиях и зудящих состояниях. Работает с пациентами, требующими длительной коррекции терапии.",
  },
  {
    id: "doc-orlov",
    name: "Д-р Орлов Андрей Викторович",
    email: "orlov@example.com",
    specialty: "Кардиолог",
    experience: 10,
    photo: "/images/doctors/orlov.jpg",
    bio: "Кардиолог с большим клиническим опытом. Консультирует по сложным кардиологическим случаям, ведёт пациентов после операций и с хронической сердечной недостаточностью.",
  },
  {
    id: "doc-smirnova",
    name: "Д-р Смирнова Елена Юрьевна",
    email: "smirnova@example.com",
    specialty: "Терапевт",
    experience: 4,
    photo: "/images/doctors/smirnova.jpg",
    bio: "Терапевт. Помогает владельцам ориентироваться в анализах и назначениях, выстраивает поэтапный план диагностики и лечения в удобном формате.",
  },
  {
    id: "doc-borisov",
    name: "Д-р Борисов Алексей Игоревич",
    email: "borisov@example.com",
    specialty: "Терапевт",
    experience: 9,
    photo: "/images/doctors/borisov.jpg",
    bio: "Терапевт общего профиля. Уделяет особое внимание качественной коммуникации с владельцем и реалистичному плану ведения пациента.",
  },
  {
    id: "doc-kozlova",
    name: "Д-р Козлова Наталья Сергеевна",
    email: "kozlova@example.com",
    specialty: "Дерматолог",
    experience: 6,
    photo: "/images/doctors/kozlova.jpg",
    bio: "Дерматолог. Занимается сложными хроническими дерматитами, аллергиями и отитами, помогает подобрать схему ухода и лечения в долгую.",
  },
];

// Список специализаций — используется в фильтрах и форме записи.
export const specialties = Array.from(new Set(doctors.map((d) => d.specialty)));
