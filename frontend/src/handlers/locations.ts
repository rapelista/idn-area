import { LocationCreateType } from "~/schemas/location";
import { prisma } from "~/utils/prisma";

export async function getLocations() {
  return await prisma.location.findMany();
}

export async function createLocation(location: LocationCreateType) {
  return await prisma.location.create({
    data: location,
  });
}
