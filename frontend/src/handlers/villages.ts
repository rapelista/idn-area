import path from "path";
import { VillageType } from "~/types/village";
import { csvParser } from "~/utils";

export async function getVillages() {
  const dir = path.resolve(process.cwd(), "shared/area/data/villages.csv");
  const villages: VillageType[] = await csvParser(dir);

  return villages;
}
