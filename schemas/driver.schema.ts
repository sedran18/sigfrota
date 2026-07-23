import z from "zod";

export const DriverSchema = z.object({
    id: z.uuid({error: 'Id com formato inválido'}),
    name: z.string().min(2, {error: 'Nome deve ter no mínimo 2 caracteres'}).max(100, {error: 'Nome deve ter no máximo 100 caracteres'}),
    phone: z.string().regex(/^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/, {error: 'Telefone inválido'}).nullish(),
    active: z.boolean({error: 'Active precisa ser boolean'}).default(true),
    createdAt: z.date({error: 'createdAt com formato inválido'}),
    updatedAt: z.date({error: 'updatedAt com formato inválido'}),    
})

export type DriverType = z.infer<typeof DriverSchema>;

export const CreateDriverSchema = DriverSchema.omit({
    id: true,
    active: true,
    createdAt: true,
    updatedAt: true,
})

export type CreateDriverType = z.infer<typeof CreateDriverSchema>

export const DriverIdSchema = z.uuid({
  error: "Id precisa ser um UUID válido",
});

export type DriverIdType = z.infer<typeof DriverIdSchema>;

export const UpdateDriverSchema = CreateDriverSchema.extend({
    active: z.boolean({error: 'Active precisa ser boolean'}).default(true),
}).partial();
export type UpdateDriverType = z.infer<typeof UpdateDriverSchema>;

export const DriverWithUsageSchema = DriverSchema.extend({
    isUsed: z.boolean({error: 'isUsed precisa ser boolean'})
})

export type DriverWithUsageType = z.infer<typeof DriverWithUsageSchema>