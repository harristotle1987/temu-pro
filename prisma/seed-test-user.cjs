const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = process.env.TEST_SELLER_EMAIL || 'playwright@test.local';
  const password = process.env.TEST_SELLER_PASSWORD || 'password123';

  const hashed = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log('Test seller already exists:', email);
    return;
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: 'Playwright Seller',
      role: 'SELLER',
    },
  });

  console.log('Created test seller:', user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
