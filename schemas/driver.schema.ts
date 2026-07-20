import z from "zod";

export const DriverSchema = z.object({
    id: z.uuid({error: 'Id com formato inválido'}),
    name: z.string().min(2, {error: 'Nome deve ter no mínimo 2 caracteres'}).max(100, {error: 'Nome deve ter no máximo 100 caracteres'}),
    phone: z.string().regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, {error: 'Telefone inválido'}).optional(),
    // active: z.boolean({error: 'Active precisa ser boolean'}),
    createdAt: z.date({error: 'createdAt com formato inválido'}),
    updatedAt: z.date({error: 'updatedAt com formato inválido'}),    
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