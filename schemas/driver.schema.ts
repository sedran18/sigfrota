import z from "zod";

export const DriverSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    phone: z.string().regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),    
})

export type DriverType = z.infer<typeof DriverSchema>;