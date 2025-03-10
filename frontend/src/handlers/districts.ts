import path from "path";
import { DistrictType } from "~/types/district";
import { csvParser } from "~/utils";

export async function getDistricts() {
  const dir = path.resolve(process.cwd(), "shared/area/data/districts.csv");
  const districts: DistrictType[] = await csvParser(dir);

  return districts;
}
