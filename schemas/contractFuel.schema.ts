import { z } from "zod";
import { FuelTypeSchema } from "./enums.schema";

export const ContractFuelSchema = z.object({
  id: z.uuid({ error: "ID do combustível inválido" }),
  contractId: z.uuid({ error: "ID do contrato inválido" }),
  fuelType: FuelTypeSchema,
  pricePerLiter: z
    .number({ error: "O preço por litro deve ser um número" })
    .positive({ error: "O preço por litro deve ser maior que zero" }),
  litersContracted: z
    .number({ error: "A quantidade de litros contratados deve ser um número" })
    .positive({ error: "A quantidade de litros contratados deve ser maior que zero" }),
  litersAvailable: z
    .number({ error: "A quantidade de litros disponíveis deve ser um número" })
    .nonnegative({ error: "A quantidade de litros disponíveis não pode ser negativa" }),
  litersConsumed: z
    .number({ error: "A quantidade de litros consumidos deve ser um número" })
    .nonnegative({ error: "A quantidade de litros consumidos não pode ser negativa" }),
  createdAt: z.date({ error: "A data de criação é obrigatória" }),
  updatedAt: z.date({ error: "A data de atualização é obrigatória" }),
});
export type ContractFuelType = z.infer<typeof ContractFuelSchema>;

export const CreateContractFuelSchema = ContractFuelSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  litersAvailable: true,
  litersConsumed: true,
});
export type CreateContractFuelType = z.infer<typeof CreateContractFuelSchema>;