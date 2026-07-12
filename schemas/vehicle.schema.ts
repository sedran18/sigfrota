import { z } from "zod";
import {
  ConservationStatusSchema,
} from "./enums.schema";

export const VehicleSchema = z.object({
  id: z.uuid(),
  plate: z.string().min(7).max(8),
  model: z.string().min(2).max(100),
  brand: z.string().min(2).max(100),
  year: z.number().int().min(1900),
  fuelType: z.enum(['GASOLINA', 'ETANOL', 'DIESEL_COMUM', 'DIESEL_S10', 'FLEX']),
  tankCapacity: z.number().positive(),
  conservationStatus: ConservationStatusSchema,
  observation: z.string().max(500).nullable().optional(),
  averageConsumptionKmL: z.number().positive(),
  currentOdometer: z.number().int().nonnegative(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type VehicleType = z.infer<typeof VehicleSchema>;
