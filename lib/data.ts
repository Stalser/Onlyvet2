
export const doctors = [
  {
    id: "doc-ivanova",
    name: "Д-р Иванова Алина Сергеевна",
    email: "ivanova@example.com",
    specialty: "Терапевт",
    experience: 5,
    photo: "/images/doctors/ivanova.jpg",
    bio: "Ветеринарный врач-терапевт.",
  },
  {
    id: "doc-petrov",
    name: "Д-р Петров Максим Андреевич",
    email: "petrov@example.com",
    specialty: "Кардиолог",
    experience: 7,
    photo: "/images/doctors/petrov.jpg",
    bio: "Ветеринарный кардиолог.",
  },
];

export const specialties = Array.from(new Set(doctors.map(d=>d.specialty)));
