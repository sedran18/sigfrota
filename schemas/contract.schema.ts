import z from "zod";

export const ContractSchema = z.object({
    id: z.uuid(),
    gasStationId: z.uuid(),
    contractNumber: z.number().int(),
    startDate: z.date(),
    endDate: z.date(),
    active: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export type ContractType = z.infer<typeof ContractSchema>