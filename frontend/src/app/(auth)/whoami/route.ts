import { NextResponse } from "next/server";
import { auth } from "~/utils/auth";

export async function GET() {
  const session = await auth();

  console.log({ session });

  return NextResponse.json({
    ...session,
  });
}
