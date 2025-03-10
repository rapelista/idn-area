import path from "path";
import { RegencyType } from "~/types/regency";
import { csvParser } from "~/utils";

export async function getRegencies() {
  const dir = path.resolve(process.cwd(), "shared/area/data/regencies.csv");
  const regencies: RegencyType[] = await csvParser(dir);

  return regencies;
}
