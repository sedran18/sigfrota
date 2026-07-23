import z from "zod";
import { FuelTypeSchema, RequesStatusSchema } from "./enums.schema";

export const FuelingRequestSchema = z.object({
    id: z.uuid(),
    vehicleId: z.uuid(),
    driverId: z.uuid(),
    // createdBy: z.uuid(),
    contractFuelId: z.uuid(),
    liters: z.number().positive().or(z.literal("full")),
    fuelType: FuelTypeSchema,
    odometer: z.number().int().nonnegative(),
    status: RequesStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),    
})

export type FuelingRequestType = z.infer<typeof FuelingRequestSchema>;