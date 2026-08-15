import { z } from "zod";
import { FuelTypeSchema, RequestStatusSchema } from "./enums.schema";
import { GasStationIdSchema } from "./gasStation.schema";

export const FuelingRequestSchema = z.object({
  id: z.uuid({ error: "ID da solicitação inválido" }),
  vehicleId: z.uuid({ error: "ID do veículo inválido" }),
  driverId: z.uuid({ error: "ID do motorista inválido" }),
  // createdBy: z.uuid(),
  contractFuelId: z.uuid({ error: "ID do combustível do contrato inválido" }),
  liters: z
    .number({ error: "Litros precisa ser um número" })
    .positive({ error: "Litros deve ser maior que zero" })
    .or(z.literal("FULL")),
  fuelType: FuelTypeSchema,
  odometer: z
    .number({ error: "Odômetro precisa ser um número" })
    .int({ error: "Odômetro deve ser um número inteiro" })
    .nonnegative({ error: "Odômetro não pode ser negativo" })
    .optional()
    .nullable(),
  status: RequestStatusSchema,
  createdAt: z.date({ error: "A data de criação é obrigatória" }),
  updatedAt: z.date({ error: "A data de atualização é obrigatória" }),
});
export type FuelingRequestType = z.infer<typeof FuelingRequestSchema>;

export const GetFuelingRequestSchema = FuelingRequestSchema.extend({
  fuelingId: z.uuid({ error: "ID do abastecimento inválido" }),
  createdBy: z.object({
    name: z.string({ error: "Nome do criador inválido" }),
    id: z.uuid({ error: "ID do criador inválido" }),
  }),
  driver: z.object({
    id: z.uuid({ error: "ID do motorista inválido" }),
    name: z.string({ error: "Nome do motorista inválido" }),
  }),
  vehicle: z.object({
    brand: z.string({ error: "Marca do veículo inválida" }),
    model: z.string({ error: "Modelo do veículo inválido" }),
    year: z
      .number({ error: "Ano do veículo inválido" })
      .int({ error: "Ano do veículo deve ser um número inteiro" }),
    plate: z.string({ error: "Placa do veículo inválida" }),
  }),
  contractFuel: z.object({
    contract: z.object({
      gasStation: z.object({
        id: z.uuid({ error: "ID do posto inválido" }),
        name: z.string({ error: "Nome do posto inválido" }),
      }),
    }),
  }),
});
export type GetFuelingRequestType = z.infer<typeof GetFuelingRequestSchema>;

export const CreateFuelingRequestSchema = FuelingRequestSchema.omit({
  id: true,
  status: true,
  contractFuelId: true,
  createdAt: true,
  odometer: true,
  updatedAt: true,
}).extend({
  gasStationId: GasStationIdSchema,
});
export type CreateFuelingRequestType = z.infer<typeof CreateFuelingRequestSchema>;

export const FuelingRequestIdSchema = z.uuid({ error: "Id com formato inválido" });
export type FuelingRequestIdType = z.infer<typeof FuelingRequestIdSchema>;