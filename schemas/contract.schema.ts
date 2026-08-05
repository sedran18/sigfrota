import z from "zod";
import { ContractFuelSchema, CreateContractFuelSchema } from "./contractFuel.schema";
import { FuelTypeSchema } from "./enums.schema";

export const ContractSchema = z.object({
  id: z.uuid({
    error: "ID do contrato inválido",
  }),

  gasStationId: z.uuid({
    error: "ID do posto inválido",
  }),

  contractNumber: z.string({error: 'Número de contrato precisa ser string'}).min(2),

  startDate: z.date({
    error: "A data de início é obrigatória",
  }),

  endDate: z.date({
    error: "A data de término é obrigatória",
  }),

  active: z.boolean({
    error: "O campo ativo deve ser verdadeiro ou falso",
  }),

  createdAt: z.date({
    error: "A data de criação é obrigatória",
  }),

  updatedAt: z.date({
    error: "A data de atualização é obrigatória",
  }),
});

export type ContractType = z.infer<typeof ContractSchema>

export const CreateContractSchema = ContractSchema.omit({
    id: true,
    active: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    contractFuels: z.array(CreateContractFuelSchema.omit({contractId: true})).min(1, "Adicione pelo menos um combustível")
})

export type CreateContractType = z.infer<typeof CreateContractSchema>;

export const ContractIdSchema = z.uuid({error: 'Id com formato inválido'});
export type ContractIdType = z.infer<typeof ContractIdSchema>;


export const GetContractsResponseSchema = ContractSchema.extend({
    contractFuels: z.array(ContractFuelSchema).min(1),
    isUsed: z.boolean()
})
export type GetContractsResponseType = z.infer<typeof GetContractsResponseSchema>;

export const UpdateContractSchema = CreateContractSchema.extend({
    active: z.boolean({error: 'Active precisa ser boolean'}).default(true),
}).partial();

export type UpdateContractType = z.infer<typeof UpdateContractSchema>;

export const GetContractFuelByGasStationAndFuelTypeSchema = z.object({
  gasStationId: z.uuid(),
  fuelType: FuelTypeSchema,
});

export type GetContractFuelByGasStationAndFuelTypeType = z.infer<typeof GetContractFuelByGasStationAndFuelTypeSchema>;