import { z } from "zod";
import { paramsSchema } from "~/schemas/core";

export type ParamsType = z.infer<typeof paramsSchema>;
