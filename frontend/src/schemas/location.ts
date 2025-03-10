import { z } from "zod";

export const locationSchema = z.object({
  name: z.string(),
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export type LocationCreateType = z.infer<typeof locationSchema>;
