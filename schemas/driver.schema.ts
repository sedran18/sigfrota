import z from "zod";

export const DriverSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    phone: z.string().regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/).optional(),
    createdAt: z.date(),
    updatedAt: z.date(),    
})

export type DriverType = z.infer<typeof DriverSchema>;

export const CreateDriverSchema = DriverSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

export type CreateDriverType = z.infer<typeof CreateDriverSchema>

export const DriverIdSchema = z.uuid({
  error: "Id precisa ser um UUID válido",
});

export type DriverIdType = z.infer<typeof DriverIdSchema>;

export const UpdateDriverSchema = CreateDriverSchema.partial();
export type UpdateDriverType = z.infer<typeof UpdateDriverSchema>;