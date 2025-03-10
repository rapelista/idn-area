import { prisma } from "~/utils/prisma";

export async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
