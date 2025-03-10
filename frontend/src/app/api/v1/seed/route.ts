import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { prisma } from "~/utils/prisma";

export async function GET() {
  const password = await bcrypt.hash("superadmin@123", 10);

  const superadmin = {
    name: "Super Admin",
    email: "superadmin@gmail.com",
    image: "https://avatars.githubusercontent.com/u/61742518?v=4",
    username: "superadmin",
    password,
  };

  const user = await prisma.user.upsert({
    create: { ...superadmin },
    update: { ...superadmin },
    where: { email: superadmin.email },
  });

  return NextResponse.json({
    data: user,
  });
}
