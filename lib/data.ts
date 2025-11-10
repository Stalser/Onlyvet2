export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  bio: string;
  photo: string;
};
export const specialties: string[] = ['Терапевт','Дерматолог','Кардиолог','Офтальмолог','Стоматолог','Поведенист'];
export const doctors: Doctor[] = [
  { id: 'ivlev', name: 'Др. Мария Ивлева', specialty: 'Терапевт', experience: 8, bio: 'Общий приём кошек и собак, нутрициология, профилактика.', photo: '/doctors/doc1.svg' },
  { id: 'sokolov', name: 'Др. Павел Соколов', specialty: 'Дерматолог', experience: 11, bio: 'Аллергии, инфекции кожи и ушей, сложные случаи зуда.', photo: '/doctors/doc2.svg' },
  { id: 'kim', name: 'Др. Анна Ким', specialty: 'Кардиолог', experience: 10, bio: 'Кардиология мелких домашних животных, ЭХОКГ, план ведения.', photo: '/doctors/doc3.svg' },
  { id: 'ivanov', name: 'Др. Алексей Иванов', specialty: 'Поведенист', experience: 7, bio: 'Коррекция поведения, тревожность, адаптация щенков и котят.', photo: '/doctors/doc4.svg' },
  { id: 'petrova', name: 'Др. Елена Петрова', specialty: 'Офтальмолог', experience: 9, bio: 'Покраснение, травмы глаз, глаукома и катаракта.', photo: '/doctors/doc5.svg' },
  { id: 'smirnov', name: 'Др. Игорь Смирнов', specialty: 'Стоматолог', experience: 12, bio: 'Удаление зубного камня, пародонтит, подбор ухода.', photo: '/doctors/doc6.svg' }
];
