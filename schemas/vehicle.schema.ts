import { z } from "zod";
import {
  ConservationStatusSchema,
  VehicleFuelTypeSchema,
} from "./enums.schema";

export const VehicleSchema = z.object({
  id: z.uuid({ error: 'ID inválido' }),

  plate: z
    .string({ error: 'Placa tem tipo inválido' })
    .length(7, { error: "A placa deve conter exatamente 7 caracteres" }),

  model: z
    .string({ error: 'Modelo tem tipo inválido' })
    .min(2, { error: 'Modelo precisa ter no mínimo 2 caracteres' })
    .max(100, { error: 'Modelo precisa ter no máximo 100 caracteres' }),

  brand: z
    .string({ error: 'Marca tem tipo inválido' })
    .min(2, { error: 'Marca precisa ter no mínimo 2 caracteres' })
    .max(100, { error: 'Marca precisa ter no máximo 100 caracteres' }),

  year: z
    .number({ error: 'Ano tem tipo inválido' })
    .int({ error: 'Ano deve ser um número inteiro' })
    .min(1900, { error: 'Ano precisa ser no mínimo 1900' }),

  fuelType: VehicleFuelTypeSchema,

  tankCapacity: z
    .number({ error: 'Capacidade do tanque precisa ser um número' })
    .positive({ error: 'Capacidade do tanque deve ser maior que zero' }),

  conservationStatus: ConservationStatusSchema,

  observation: z
    .string({ error: 'Observação tem tipo inválido' })
    .max(500, { error: 'Observação pode ter no máximo 500 caracteres' })
    .nullable()
    .optional(),

  averageConsumption: z
    .number({ error: 'Consumo médio precisa ser um número' })
    .positive({ error: 'Consumo médio deve ser maior que zero' }),

  active: z.boolean(),
  
  currentOdometer: z
    .number({ error: 'Quilometragem atual precisa ser um número' })
    .int({ error: 'Quilometragem atual deve ser um número inteiro' })
    .nonnegative({ error: 'Quilometragem atual não pode ser negativa' }),
  // active: z.boolean(),
  createdAt: z.date({ error: 'Data de criação inválida' }),

  updatedAt: z.date({ error: 'Data de atualização inválida' }),
});

export type VehicleType = z.infer<typeof VehicleSchema>;

export const CreateVehicleSchema = VehicleSchema.omit({
  id: true,
  active: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateVehicleType = z.infer<typeof CreateVehicleSchema>;

export const VehicleIdSchema = z.uuid({error: 'Id com formato inválido'})
export type VehicleIdType = z.infer<typeof VehicleIdSchema>

export const UpdateVehicleSchema = CreateVehicleSchema.extend({
    active: z.boolean({error: 'Active precisa ser boolean'}).default(true),
}).partial();

export type UpdateVehicleType = z.infer<typeof UpdateVehicleSchema>;

export const VehicleWithUsageSchema = VehicleSchema.extend({
    isUsed: z.boolean({error: 'isUsed precisa ser boolean'})
})

export type VehicleWithUsageType = z.infer<typeof VehicleWithUsageSchema>