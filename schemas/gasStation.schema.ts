import z from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const GasStationSchema = z.object({
  id: z.uuid({ error: "ID inválido" }),

  name: z
    .string({ error: "Nome tem tipo inválido" })
    .min(2, { error: "Nome precisa ter no mínimo 2 caracteres" })
    .max(100, { error: "Nome pode ter no máximo 100 caracteres" }),

  cnpj: z
    .string({ error: "CNPJ tem tipo inválido" })
    .transform(value => value.replace(/\D/g, ""))
    .refine(cnpj.isValid, {
      error: "CNPJ inválido",
    }),

  address: z
    .string({ error: "Endereço tem tipo inválido" })
    .min(5, { error: "Endereço precisa ter no mínimo 5 caracteres" })
    .max(255, { error: "Endereço pode ter no máximo 255 caracteres" }),

  createdAt: z.date({ error: "Data de criação inválida" }),

  updatedAt: z.date({ error: "Data de atualização inválida" }),
});

export type GasStationType = z.infer<typeof GasStationSchema>

export const CreateGasStationSchema = GasStationSchema.omit({
  id: true, 
  createdAt: true,
  updatedAt: true
});

export type CreateGasStationType = z.infer<typeof CreateGasStationSchema>;

export const GasStationIdSchema = z.uuid({error: 'Id com formato inválido'});
export type GasStationIdType = z.infer<typeof GasStationIdSchema>