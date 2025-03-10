import { z } from "zod";
import { paramsSchema } from "./core";

export const regencyParamsSchema = paramsSchema.extend({
  province_code: z.string().optional(),
});
