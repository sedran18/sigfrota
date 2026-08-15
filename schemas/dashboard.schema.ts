import { z } from "zod";

export const LineChartItemSchema = z.object({
  date: z.uuid({ error: "Data inválida" }), // ver observação no fim da resposta
  GASOLINA_COMUM: z.number({ error: "Valor de gasolina comum inválido" }).optional(),
  GASOLINA_ADITIVADA: z.number({ error: "Valor de gasolina aditivada inválido" }).optional(),
  ETANOL: z.number({ error: "Valor de etanol inválido" }).optional(),
  DIESEL_COMUM: z.number({ error: "Valor de diesel comum inválido" }).optional(),
  DIESEL_S10: z.number({ error: "Valor de diesel S10 inválido" }).optional(),
});
export type LineChartItemType = z.infer<typeof LineChartItemSchema>;

export const KPIItemSchema = z.object({
  title: z.string({ error: "Título inválido" }),
  value: z.union([z.string(), z.number()], { error: "Valor inválido" }),
  description: z.string({ error: "Descrição inválida" }).optional(),
});
export type KPIItemType = z.infer<typeof KPIItemSchema>;

export const FuelBarChartSchema = z.object({
  name: z.string({ error: "Nome inválido" }),
  liters: z.number({ error: "Quantidade de litros inválida" }),
});
export type FuelBarChartItemType = z.infer<typeof FuelBarChartSchema>;

export const FuelEfficiencyByVehicleSchema = z
  .object({
    carName: z.string({ error: "Nome do veículo inválido" }),
  })
  .catchall(z.union([z.string(), z.number()], { error: "Valor inválido" }));
export type FuelEfficiencyByVehicleType = z.infer<typeof FuelEfficiencyByVehicleSchema>;