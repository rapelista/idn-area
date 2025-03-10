import { z } from "zod";
import { paramsSchema } from "./core";

export const villageParamsSchema = paramsSchema.extend({
  district_code: z.string().optional(),
});
