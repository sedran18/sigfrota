import z from "zod";
import { FuelTypeSchema, RequestStatusSchema } from "./enums.schema";
import { GasStationIdSchema } from "./gasStation.schema";

export const FuelingRequestSchema = z.object({
    id: z.uuid(),
    vehicleId: z.uuid(),
    driverId: z.uuid(),
    // createdBy: z.uuid(),
    contractFuelId: z.uuid(),
    liters: z.number().positive().or(z.literal("FULL")),
    fuelType: FuelTypeSchema,
    odometer: z.number().int().nonnegative().optional().nullable(),
    status: RequestStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),    
})

export type FuelingRequestType = z.infer<typeof FuelingRequestSchema>;

export const GetFuelingRequestSchema = FuelingRequestSchema.extend({
  fuelingId: z.uuid(),
  createdBy: z.object({
    name: z.string(),
    id: z.uuid()
  }),
  driver: z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  vehicle: z.object({
    brand: z.string(),
    model: z.string(),
    year: z.number().int(),
    plate: z.string(),
  }),
  contractFuel: z.object({
    contract: z.object({
      gasStation: z.object({
        id: z.uuid(),
        name: z.string(),
      }),
    }),
  }),
});

export type GetFuelingRequestType = z.infer<typeof GetFuelingRequestSchema>;

export const CreateFuelingRequestSchema = FuelingRequestSchema.omit({
    id: true,
    status: true,
    contractFuelId: true, 
    createdAt: true, 
    odometer: true,
    updatedAt: true
}).extend({
    gasStationId: GasStationIdSchema,
});
export type CreateFuelingRequestType = z.infer<typeof CreateFuelingRequestSchema>

export const FuelingRequestIdSchema = z.uuid({error: 'Id com formato inválido'});
export type FuelingRequestIdType = z.infer<typeof FuelingRequestIdSchema>;
