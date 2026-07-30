import z from "zod";
import { FuelTypeSchema, RequesStatusSchema } from "./enums.schema";

export const FuelingRequestSchema = z.object({
    id: z.uuid(),
    vehicleId: z.uuid(),
    driverId: z.uuid(),
    // createdBy: z.uuid(),
    contractFuelId: z.uuid(),
    liters: z.number().positive().or(z.literal("FULL")),
    fuelType: FuelTypeSchema,
    odometer: z.number().int().nonnegative().optional(),
    status: RequesStatusSchema,
    createdAt: z.date(),
    updatedAt: z.date(),    
})

export type FuelingRequestType = z.infer<typeof FuelingRequestSchema>;

export const CreateFuelingRequestSchema = FuelingRequestSchema.omit({
    id: true,
    status: true,
    createdAt: true, 
    updatedAt: true
});
export type CreateFuelingRequestType = z.infer<typeof CreateFuelingRequestSchema>

export const CreateFuelingRequestFormSchema = CreateFuelingRequestSchema.omit({
    contractFuelId: true,
}).extend({
    gasStationId: z.uuid(),
});

export type CreateFuelingRequestFormType = z.infer<typeof CreateFuelingRequestFormSchema>;
