import { z } from "zod";
import { FuelTypeSchema } from "./enums.schema";
import { GasStationSchema } from "./gasStation.schema";
import { DriverSchema } from "./driver.schema";
import { VehicleSchema } from "./vehicle.schema";

export const FuelingSchema = z.object({
  id: z.uuid({ error: "ID do abastecimento inválido" }),
  vehicleId: z.uuid({ error: "ID do veículo inválido" }),
  driverId: z.uuid({ error: "ID do motorista inválido" }),
  requestId: z.uuid({ error: "ID da solicitação inválido" }),
  contractFuelId: z.uuid({ error: "ID do combustível do contrato inválido" }),
  fuelType: FuelTypeSchema,
  odometer: z
    .number({ error: "Odômetro precisa ser um número" })
    .int({ error: "Odômetro deve ser um número inteiro" })
    .nonnegative({ error: "Odômetro não pode ser negativo" }),
  liters: z
    .number({ error: "Litros precisa ser um número" })
    .positive({ error: "Litros deve ser maior que zero" }),
  pricePerLiter: z
    .number({ error: "Preço por litro precisa ser um número" })
    .positive({ error: "Preço por litro deve ser maior que zero" }),
  totalAmount: z
    .number({ error: "Valor total precisa ser um número" })
    .positive({ error: "Valor total deve ser maior que zero" }),
  distanceTraveled: z
    .number({ error: "Distância percorrida precisa ser um número" })
    .int({ error: "Distância percorrida deve ser um número inteiro" })
    .nonnegative({ error: "Distância percorrida não pode ser negativa" }),
  fuelEfficiency: z
    .number({ error: "Eficiência de combustível precisa ser um número" })
    .positive({ error: "Eficiência de combustível deve ser maior que zero" }),
  observations: z
    .string({ error: "Observações têm tipo inválido" })
    .max(500, { error: "Observações podem ter no máximo 500 caracteres" })
    .optional()
    .nullable(),
  createdAt: z.date({ error: "A data de criação é obrigatória" }),
  updatedAt: z.date({ error: "A data de atualização é obrigatória" }),
});
export type FuelingType = z.infer<typeof FuelingSchema>;

export const GetFuelingSchema = FuelingSchema.extend({
  createdBy: z.object({
    name: z.string({ error: "Nome do criador inválido" }),
    id: z.uuid({ error: "ID do criador inválido" }),
  }),
  contractFuel: z.object({
    contract: z.object({
      gasStation: GasStationSchema.pick({ name: true, id: true }),
    }),
  }),
  driver: DriverSchema.pick({ name: true, id: true }).optional().nullable(),
  vehicle: VehicleSchema.pick({
    brand: true,
    model: true,
    plate: true,
    id: true,
  }).optional().nullable(),
});
export type GetFuelingType = z.infer<typeof GetFuelingSchema>;

export const CreateFuelingSchema = FuelingSchema.pick({
  liters: true,
  odometer: true,
  observations: true,
  requestId: true,
});
export type CreateFuelingType = z.infer<typeof CreateFuelingSchema>;

export const FuelingIdSchema = z.uuid({ error: "Id inválido" });
export type FuelingIdType = z.infer<typeof FuelingIdSchema>;