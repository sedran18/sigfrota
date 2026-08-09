import { z } from "zod";
import { FuelTypeSchema } from "./enums.schema";

export const FuelingSchema = z.object({
  id: z.uuid(),
  vehicleId: z.uuid(),
  driverId: z.uuid(),
  requestId: z.uuid(),
  contractFuelId: z.uuid(),
  fuelType: FuelTypeSchema,
  odometer: z.number().int().nonnegative(),
  liters: z.number().positive(),
  pricePerLiter: z.number().positive(),
  totalAmount: z.number().positive(),
  distanceTraveled: z.number().int().nonnegative(),
  fuelEfficiency: z.number().positive(),
  observations: z.string().max(500).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type FuelingType = z.infer<typeof FuelingSchema>;

export const AddFuelingSchema = FuelingSchema.omit({
    id: true,
    pricePerLiter: true,
    totalAmount: true,
    distanceTraveled: true,
    createdAt: true,
    updatedAt: true
})

export type AddFuelingType = z.infer<typeof AddFuelingSchema>;