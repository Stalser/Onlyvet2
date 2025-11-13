export type Doctor = {
  id: string;
  name: string;
  speciality: string;
  bio?: string;
  rating?: number;
};

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Д-р Иванов Иван',
    speciality: 'Терапевт, кошки и собаки',
    bio: 'Занимается общей терапией, вакцинацией и профилактикой хронических заболеваний.',
    rating: 4.9,
  },
];

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}
