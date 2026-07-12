import z from "zod";
import { FuelTypeSchema } from "./enums.schema";

export const ContractFuelSchema = z.object({
    id: z.uuid(),
    contractId: z.uuid(),
    fuelType: FuelTypeSchema,
    pricePerLiter: z.number().positive(),
    litersAvailable: z.number().nonnegative(),
    litersConsumed: z.number().nonnegative(),
    createdAt: z.date(),
    updatedAt: z.date()
});

export type ContractFuel = z.infer<typeof ContractFuelSchema>;