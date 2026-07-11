const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 12);
    await prisma.user.create({
      data: {
        username: "admin",
        password: hashed,
      },
    });
    console.log("Admin user created: admin / admin123");
  } else {
    console.log("Admin user already exists");
  }

  console.log("\n--- For Vercel deployment ---");
  console.log("Set these environment variables in your Vercel dashboard:");
  console.log('ADMIN_USERNAME="admin"');
  const hash = await bcrypt.hash("admin123", 12);
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log('JWT_SECRET="your-secure-random-secret"');
  console.log("------------------------------\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
