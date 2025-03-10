import { EntityType } from "./entity";

export type DistrictType = EntityType & {
  regency_code: string;
};
