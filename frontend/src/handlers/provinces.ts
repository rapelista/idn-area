import path from "path";
import { ProvinceType } from "~/types/province";
import { csvParser } from "~/utils";

export async function getProvinces() {
  const dir = path.resolve(process.cwd(), "shared/area/data/provinces.csv");
  const provinces: ProvinceType[] = await csvParser(dir);

  return provinces;
}
