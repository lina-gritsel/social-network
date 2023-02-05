import { News } from '../../../components/NewsCard/NewsCard'

const getRandomInt = (max: number, min: number): number => {
  return Math.floor(Math.random() * (max - min)) + min
}

export const getRandomColor = (): string => {
  return `rgb(${getRandomInt(0, 256)}, ${getRandomInt(0, 256)}, ${getRandomInt(
    0,
    256,
  )})`
}

export const userNews: News[] = [
  {
    name: 'Alina',
    date: '20.01.2023',
    img: 'https://i.pinimg.com/originals/ba/bd/0a/babd0a70c6b6118c75bbc443e23fe05d.jpg',
    content:
      'Гора́ (мн. ч. — го́ры) — форма рельефа, изолированное резкое поднятие местности с выраженными склонами и подножием[1] или вершина в горной стране[2].',
    moreContent:
      'По характеру вершины выделяют пикообразные, куполообразные, платообразные и другие горы. Вершины подводных гор могут представлять собой острова. По происхождению говорят о тектоноденудационных горах и вулканических[3].',
    avatarColor: getRandomColor(),
  },
  {
    name: 'Angelina',
    date: '20.01.2023',
    img: 'https://kartinkin.net/uploads/posts/2022-12/1670006687_41-kartinkin-net-p-fon-dlya-rabochego-stola-gori-krasivo-42.jpg',
    content:
      'Гора́ (мн. ч. — го́ры) — форма рельефа, изолированное резкое поднятие местности с выраженными склонами и подножием[1] или вершина в горной стране[2].',
    avatarColor: getRandomColor(),
  },
  {
    name: 'Pasha',
    date: '20.01.2023',
    content:
      'Гора́ (мн. ч. — го́ры) — форма рельефа, изолированное резкое поднятие местности с выраженными склонами и подножием[1] или вершина в горной стране[2].',
    moreContent:
      'По характеру вершины выделяют пикообразные, куполообразные, платообразные и другие горы. Вершины подводных гор могут представлять собой острова. По происхождению говорят о тектоноденудационных горах и вулканических[3].',
    avatarColor: getRandomColor(),
  },
  {
    name: 'Peter',
    date: '20.01.2023',
    img: 'https://i.artfile.ru/2048x1365_1403428_%5Bwww.ArtFile.ru%5D.jpg',
    content:
      'Гора́ (мн. ч. — го́ры) — форма рельефа, изолированное резкое поднятие местности с выраженными склонами и подножием[1] или вершина в горной стране[2].',
    moreContent:
      'По характеру вершины выделяют пикообразные, куполообразные, платообразные и другие горы. Вершины подводных гор могут представлять собой острова. По происхождению говорят о тектоноденудационных горах и вулканических[3].',
    avatarColor: getRandomColor(),
    avatarImg:
      'https://w7.pngwing.com/pngs/531/103/png-transparent-eremas-wartoto-businessperson-business-plan-management-business-people-public-relations-business-man.png',
  },
  {
    name: 'Ula',
    date: '20.01.2023',
    img: 'https://vsegda-pomnim.com/uploads/posts/2022-04/1650923332_62-vsegda-pomnim-com-p-gori-italii-foto-70.jpg',
    content:
      'Гора́ (мн. ч. — го́ры) — форма рельефа, изолированное резкое поднятие местности с выраженными склонами и подножием[1] или вершина в горной стране[2].',
    moreContent:
      'По характеру вершины выделяют пикообразные, куполообразные, платообразные и другие горы. Вершины подводных гор могут представлять собой острова. По происхождению говорят о тектоноденудационных горах и вулканических[3].',
    avatarColor: getRandomColor(),
    avatarImg:
      'https://shopikk.ru/wp-content/uploads/b/3/4/b34b45927a64dc700ca4490b09c31100.jpeg',
  },
]

export const friends = [
    {
      name: 'Alina',
      avatarColor: getRandomColor(),
      avatarImg:
        'https://shopikk.ru/wp-content/uploads/b/3/4/b34b45927a64dc700ca4490b09c31100.jpeg',
      isOnline: true,
    },
    {
      name: 'Anna',
      avatarColor: getRandomColor(),
      isOnline: true,
    },
    {
      name: 'Tim',
      avatarColor: getRandomColor(),
      isOnline: false,
    },
    {
      name: 'Barik',
      avatarColor: getRandomColor(),
      isOnline: true,
    },
    {
      name: 'Angelina',
      avatarColor: getRandomColor(),
      isOnline: true,
    },
    {
      name: 'Max',
      avatarColor: getRandomColor(),
      isOnline: false,
    },
    {
      name: 'Simon',
      avatarColor: getRandomColor(),
      isOnline: true,
    },
    {
      name: 'Pasha',
      avatarColor: getRandomColor(),
      isOnline: true,
    },
    {
      name: 'Alina',
      avatarColor: getRandomColor(),
      isOnline: false,
    },
  ]
  