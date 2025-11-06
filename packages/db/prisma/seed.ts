import dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@cafe-app/db';

const prisma = new PrismaClient();

async function main() {
  const cafe1 = await prisma.cafe.create({
    data: {
      name: 'Starbucks',
      description: 'A global coffeehouse chain known for its premium coffee and cozy atmosphere.',
      location: 'Changi Airport',
      logo: 'https://example.com/starbucks-logo.png',
    },
  });

  const cafe2 = await prisma.cafe.create({
    data: {
      name: 'Local Brew Cafe',
      description: 'A local favorite offering artisanal coffee and fresh pastries.',
      location: 'Marina Bay',
      logo: 'https://example.com/local-brew-logo.png',
    },
  });

  const cafe3 = await prisma.cafe.create({
    data: {
      name: 'Sunrise Coffee House',
      description: 'A charming spot for morning coffee with a view of the sunrise.',
      location: 'Orchard Road',
    },
  });

  await prisma.employee.createMany({
    data: [
      {
        id: 'UI1234567',
        name: 'Alice Johnson',
        emailAddress: 'alice.johnson@example.com',
        phoneNumber: '81234567',
        gender: 'Female',
        startDate: new Date('2022-03-15'),
        cafeId: cafe1.id,
      },
      {
        id: 'UI2345678',
        name: 'Bob Smith',
        emailAddress: 'bob.smith@example.com',
        phoneNumber: '82345678',
        gender: 'Male',
        startDate: new Date('2021-07-22'),
        cafeId: cafe1.id,
      },
      {
        id: 'UI3456789',
        name: 'Charlie Brown',
        emailAddress: 'charlie.brown@example.com',
        phoneNumber: '83456789',
        gender: 'Male',
        startDate: new Date('2023-01-10'),
        cafeId: cafe2.id,
      },
      {
        id: 'UI4567890',
        name: 'Diana Prince',
        emailAddress: 'diana.prince@example.com',
        phoneNumber: '84567890',
        gender: 'Female',
        startDate: new Date('2020-11-05'),
        cafeId: cafe2.id,
      },
      {
        id: 'UI5678901',
        name: 'Eve Wilson',
        emailAddress: 'eve.wilson@example.com',
        phoneNumber: '85678901',
        gender: 'Female',
        startDate: new Date('2024-05-20'),
        cafeId: cafe3.id,
      },
      {
        id: 'UI6789012',
        name: 'Frank Miller',
        emailAddress: 'frank.miller@example.com',
        phoneNumber: '86789012',
        gender: 'Male',
        startDate: new Date('2019-09-30'),
        cafeId: cafe3.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });