import z from "zod";
import { CreateContractFuelSchema } from "./contractFuel.schema";

export const ContractSchema = z.object({
  id: z.uuid({
    error: "ID do contrato inválido",
  }),

  gasStationId: z.uuid({
    error: "ID do posto inválido",
  }),

  contractNumber: z
    .number({
      error: "O número do contrato deve ser um número",
    })
    .int({
      error: "O número do contrato deve ser um número inteiro",
    }),

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
    createdAt: true,
    updatedAt: true,
}).extend({
    contractFuels: z.array(CreateContractFuelSchema.omit({contractId: true}))
});

export type CreateContractType = z.infer<typeof CreateContractSchema>;

export const ContractIdSchema = z.uuid({error: 'Id com formato inválido'});
export type ContractIdType = z.infer<typeof ContractIdSchema>;


export const GetContractsResponseSchema = ContractSchema.extend({
    contractFuels: z.array(CreateContractFuelSchema.omit({contractId: true})).min(1, "Adicione pelo menos um combustível"),
})
export type GetContractsResponseType = z.infer<typeof GetContractsResponseSchema>;

