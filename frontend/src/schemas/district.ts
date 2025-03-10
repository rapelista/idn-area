import { z } from "zod";
import { paramsSchema } from "./core";

export const districtParamsSchema = paramsSchema.extend({
  regency_code: z.string().optional(),
});
