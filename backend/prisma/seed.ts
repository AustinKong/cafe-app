import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const cafes = await Promise.all([
    prisma.cafe.create({
      data: {
        name: 'Starbucks',
        description: 'A global coffeehouse chain known for its premium coffee and cozy atmosphere.',
        location: 'Changi Airport',
        logo: 'https://1000logos.net/wp-content/uploads/2016/12/Starbucks-logo.jpg',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Local Brew',
        description: 'A local favorite offering artisanal coffee and fresh pastries in a welcoming environment.',
        location: 'Marina Bay',
        logo: 'https://1000logos.net/wp-content/uploads/2022/09/Stars-Coffee-Logo.png',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Sun Cafe',
        description: 'A charming spot for morning coffee with beautiful sunrise views and comfortable seating.',
        location: 'Orchard Road',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Coffee Den',
        description: 'A cozy coffee den perfect for work or relaxation with high-speed internet available.',
        location: 'Raffles Place',
        logo: 'https://1000logos.net/wp-content/uploads/2018/08/Nescaf%C3%A9-logo.jpg',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Brew House',
        description: 'Specializing in craft beers and gourmet coffee with a modern industrial design.',
        location: 'Tiong Bahru',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Corn Brew',
        description: 'A neighborhood corner cafe serving fresh brews and homemade pastries daily.',
        location: 'Little India',
        logo: 'https://1000logos.net/wp-content/uploads/2020/09/McCafe-Logo.png',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Urban Cafe',
        description: 'An urban coffee grinding experience with locally sourced beans and expert baristas.',
        location: 'Clarke Quay',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Morning Mug',
        description: 'Start your day right with our signature mugs and freshly brewed specialty coffees.',
        location: 'Bugis Junction',
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/Tim-Hortons-Logo-500x281.png',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Espres Bar',
        description: 'Authentic Italian espresso bar with traditional methods and imported coffee machines.',
        location: 'Sentosa Island',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Java Joint',
        description: 'A casual java joint where coffee lovers gather to share stories and enjoy brews.',
        location: 'Chinatown',
        logo: 'https://1000logos.net/wp-content/uploads/2018/10/DunkinLogo-500x281.png',
      },
    }),
    prisma.cafe.create({
      data: {
        name: 'Bean Scene',
        description: 'Experience the bean scene with our curated selection of rare and exotic coffee beans.',
        location: 'Holland Village',
      },
    }),
  ]);

  await prisma.employee.createMany({
    data: [
      {
        id: 'UI1234567',
        name: 'Alice John',
        emailAddress: 'alice.john@example.com',
        phoneNumber: '81234567',
        gender: 'Female',
        startDate: new Date('2022-03-15'),
        cafeId: cafes[0].id,
      },
      {
        id: 'UI2345678',
        name: 'Bob Smith',
        emailAddress: 'bob.smith@example.com',
        phoneNumber: '82345678',
        gender: 'Male',
        startDate: new Date('2021-07-22'),
        cafeId: cafes[0].id,
      },
      {
        id: 'UI3456789',
        name: 'Charlie B',
        emailAddress: 'charlie.brown@example.com',
        phoneNumber: '83456789',
        gender: 'Male',
        startDate: new Date('2023-01-10'),
        cafeId: cafes[0].id,
      },
      {
        id: 'UI4567890',
        name: 'Diana P',
        emailAddress: 'diana.prince@example.com',
        phoneNumber: '84567890',
        gender: 'Female',
        startDate: new Date('2020-11-05'),
        cafeId: cafes[1].id,
      },
      {
        id: 'UI5678901',
        name: 'Eve Wilson',
        emailAddress: 'eve.wilson@example.com',
        phoneNumber: '85678901',
        gender: 'Female',
        startDate: new Date('2024-05-20'),
        cafeId: cafes[1].id,
      },
      {
        id: 'UI6789012',
        name: 'Frank M',
        emailAddress: 'frank.miller@example.com',
        phoneNumber: '86789012',
        gender: 'Male',
        startDate: new Date('2019-09-30'),
        cafeId: cafes[2].id,
      },
      {
        id: 'UI7890123',
        name: 'Grace Lee',
        emailAddress: 'grace.lee@example.com',
        phoneNumber: '87890123',
        gender: 'Female',
        startDate: new Date('2023-08-14'),
        cafeId: cafes[2].id,
      },
      {
        id: 'UI8901234',
        name: 'Henry Ford',
        emailAddress: 'henry.ford@example.com',
        phoneNumber: '88901234',
        gender: 'Male',
        startDate: new Date('2021-12-01'),
        cafeId: cafes[3].id,
      },
      {
        id: 'UI9012345',
        name: 'Ivy Chen',
        emailAddress: 'ivy.chen@example.com',
        phoneNumber: '89012345',
        gender: 'Female',
        startDate: new Date('2022-06-18'),
        cafeId: cafes[3].id,
      },
      {
        id: 'UI0123456',
        name: 'Jack Wong',
        emailAddress: 'jack.wong@example.com',
        phoneNumber: '80123456',
        gender: 'Male',
        startDate: new Date('2020-04-25'),
        cafeId: cafes[4].id,
      },
      {
        id: 'UI1234568',
        name: 'Karen Tan',
        emailAddress: 'karen.tan@example.com',
        phoneNumber: '81234568',
        gender: 'Female',
        startDate: new Date('2023-11-07'),
        cafeId: cafes[4].id,
      },
      {
        id: 'UI2345679',
        name: 'Liam Davis',
        emailAddress: 'liam.davis@example.com',
        phoneNumber: '82345679',
        gender: 'Male',
        startDate: new Date('2022-09-12'),
        cafeId: cafes[5].id,
      },
      {
        id: 'UI3456780',
        name: 'Maya Patel',
        emailAddress: 'maya.patel@example.com',
        phoneNumber: '83456780',
        gender: 'Female',
        startDate: new Date('2021-03-28'),
        cafeId: cafes[5].id,
      },
      {
        id: 'UI4567891',
        name: 'Noah Kim',
        emailAddress: 'noah.kim@example.com',
        phoneNumber: '84567891',
        gender: 'Male',
        startDate: new Date('2024-01-15'),
        cafeId: cafes[6].id,
      },
      {
        id: 'UI5678902',
        name: 'Olivia Liu',
        emailAddress: 'olivia.liu@example.com',
        phoneNumber: '85678902',
        gender: 'Female',
        startDate: new Date('2023-07-03'),
        cafeId: cafes[7].id,
      },
      {
        id: 'UI6789013',
        name: 'Peter Z',
        emailAddress: 'peter.zhang@example.com',
        phoneNumber: '86789013',
        gender: 'Male',
        startDate: new Date('2022-10-19'),
        cafeId: cafes[8].id,
      },
      {
        id: 'UI7890124',
        name: 'Quinn Ng',
        emailAddress: 'quinn.ng@example.com',
        phoneNumber: '87890124',
        gender: 'Female',
        startDate: new Date('2021-05-11'),
        cafeId: cafes[9].id,
      },
      {
        id: 'UI8901235',
        name: 'Ryan Park',
        emailAddress: 'ryan.park@example.com',
        phoneNumber: '88901235',
        gender: 'Male',
        startDate: new Date('2020-08-22'),
        cafeId: cafes[10].id,
      },
    ],
  });

  console.log('Database seeded successfully with 11 cafes and 18 employees!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });