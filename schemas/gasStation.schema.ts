import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const GasStationSchema = z.object({
  id: z.uuid({ error: "ID inválido" }),
  name: z
    .string({ error: "Nome tem tipo inválido" })
    .min(2, { error: "Nome precisa ter no mínimo 2 caracteres" })
    .max(100, { error: "Nome pode ter no máximo 100 caracteres" }),
  cnpj: z
    .string({ error: "CNPJ tem tipo inválido" })
    .transform((value) => value.replace(/\D/g, ""))
    .refine(cnpj.isValid, { error: "CNPJ inválido" }),
  active: z.boolean({ error: "Active precisa ser boolean" }),
  address: z
    .string({ error: "Endereço tem tipo inválido" })
    .min(5, { error: "Endereço precisa ter no mínimo 5 caracteres" })
    .max(255, { error: "Endereço pode ter no máximo 255 caracteres" }),
  createdAt: z.date({ error: "Data de criação inválida" }),
  updatedAt: z.date({ error: "Data de atualização inválida" }),
});
export type GasStationType = z.infer<typeof GasStationSchema>;

export const CreateGasStationSchema = GasStationSchema.omit({
  id: true,
  active: true,
  createdAt: true,
  updatedAt: true,
});
export type CreateGasStationType = z.infer<typeof CreateGasStationSchema>;

export const GasStationIdSchema = z.uuid({ error: "Id com formato inválido" });
export type GasStationIdType = z.infer<typeof GasStationIdSchema>;

export const UpdateGasStationSchema = CreateGasStationSchema.extend({
  active: z.boolean({ error: "Active precisa ser boolean" }).default(true),
}).partial();
export type UpdateGasStationType = z.infer<typeof UpdateGasStationSchema>;

export const GasStationWithUsageSchema = GasStationSchema.extend({
  isUsed: z.boolean({ error: "isUsed precisa ser boolean" }),
});
export type GasStationWithUsageType = z.infer<typeof GasStationWithUsageSchema>;

export const GasStationSelectSchema = z.object({
  id: z.boolean({ error: "Campo id inválido" }).optional(),
  name: z.boolean({ error: "Campo name inválido" }).optional(),
  cnpj: z.boolean({ error: "Campo cnpj inválido" }).optional(),
  active: z.boolean({ error: "Campo active inválido" }).optional(),
  address: z.boolean({ error: "Campo address inválido" }).optional(),
  createdAt: z.boolean({ error: "Campo createdAt inválido" }).optional(),
  updatedAt: z.boolean({ error: "Campo updatedAt inválido" }).optional(),
});
export type GasStationSelectType = z.infer<typeof GasStationSelectSchema>;