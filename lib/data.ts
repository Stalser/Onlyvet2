export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  bio: string;
  photo: string;
  vetmanagerId?: string;
  interests?: string[];
  languages?: string[];
  education?: string[];
  achievements?: string[];
  publications?: string[];
};

export const specialties: string[] = ['Терапевт','Дерматолог','Кардиолог','Офтальмолог','Стоматолог','Поведенист'];

export const doctors: Doctor[] = [
  { id:'ivlev', name:'Др. Мария Ивлева', specialty:'Терапевт', experience:8, bio:'Общий приём кошек и собак, нутрициология, профилактика.', photo:'/doctors/doc1.svg',
    vetmanagerId:'vm-1001', interests:['Профилактика','Питание','Хронические дерматозы'], languages:['RU','EN'], education:['ВГМХА, 2017','ESAVS Internal Medicine, 2021'], achievements:['Протокол профилактики ожирения у кошек'], publications:['Нутрициология питомцев, 2023']},
  { id:'sokolov', name:'Др. Павел Соколов', specialty:'Дерматолог', experience:11, bio:'Аллергии, инфекции кожи и ушей, сложные случаи зуда.', photo:'/doctors/doc2.svg',
    vetmanagerId:'vm-1002', interests:['Аллергология','Отология'], languages:['RU'], education:['СПбГАВМ, 2014','ESAVS Dermatology, 2020'], achievements:['ESVD Congress 2022'], publications:['Случай хронического отита, 2022']},
  { id:'kim', name:'Др. Анна Ким', specialty:'Кардиолог', experience:10, bio:'Кардиология мелких домашних животных, ЭХОКГ, план ведения.', photo:'/doctors/doc3.svg',
    vetmanagerId:'vm-1003', interests:['ХСН','Врожденные пороки'], languages:['RU','EN'], education:['МГАВМиБ, 2015','ACVIM Cardiology modules, 2022'], achievements:['Лекции по ЭХОКГ'], publications:['Сравнение терапий ХСН, 2021']},
  { id:'ivanov', name:'Др. Алексей Иванов', specialty:'Поведенист', experience:7, bio:'Коррекция поведения, тревожность, адаптация щенков и котят.', photo:'/doctors/doc4.svg',
    vetmanagerId:'vm-1004', interests:['Поведенческая медицина','Котики-домоседы'], languages:['RU'], education:['КГАВМ, 2016','ISFM Behaviour, 2021'], achievements:['Курс социализации котят'], publications:[]},
  { id:'petrova', name:'Др. Елена Петрова', specialty:'Офтальмолог', experience:9, bio:'Покраснение, травмы глаз, глаукома и катаракта.', photo:'/doctors/doc5.svg',
    vetmanagerId:'vm-1005', interests:['Роговица','Глаукома'], languages:['RU'], education:['МГАВМиБ, 2015','ESAVS Ophthalmology, 2020'], achievements:['Лучший постер ESVO 2021'], publications:['Кератит у кошек, 2020']},
  { id:'smirnov', name:'Др. Игорь Смирнов', specialty:'Стоматолог', experience:12, bio:'Удаление зубного камня, пародонтит, подбор ухода.', photo:'/doctors/doc6.svg',
    vetmanagerId:'vm-1006', interests:['Пародонтология'], languages:['RU'], education:['СПбГАВМ, 2012','Dentistry CPD, 2019'], achievements:['Лектор по профилактике пародонтита'], publications:[]}
];
