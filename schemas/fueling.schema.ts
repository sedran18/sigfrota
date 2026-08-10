import { z } from "zod";
import { FuelTypeSchema } from "./enums.schema";
import { GasStationSchema } from "./gasStation.schema";

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
  observations: z.string().max(500).optional().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type FuelingType = z.infer<typeof FuelingSchema>;

export const GetFuelingSchema = FuelingSchema.extend({
  contractFuel: z.object({
    contract: z.object({
      gasStation: GasStationSchema.pick({
        name: true, 
        id: true,
      })
    })
  })
});

export type GetFuelingType = z.infer<typeof GetFuelingSchema>;

export const CreateFuelingSchema = FuelingSchema.pick({
  liters: true,
  odometer: true, 
  observations: true,
  requestId: true,
})

export type CreateFuelingType = z.infer<typeof CreateFuelingSchema>;

export const FuelingIdSchema = z.uuid({error: 'Id inválido'});
export type FuelingIdType  = z.infer<typeof FuelingIdSchema>;