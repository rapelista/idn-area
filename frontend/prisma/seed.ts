import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("superadmin@123", 10);

  await prisma.user.create({
    data: {
      name: "superadmin",
      email: "superadmin@gmail.com",
      image: "https://avatars.githubusercontent.com/u/61742518?v=4",
      password,
    },
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
