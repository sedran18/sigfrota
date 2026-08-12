import {z} from "zod";

export const LineChartItemSchema = z.object({
    date: z.uuid(),    
    GASOLINA_COMUM: z.number().optional(),
    GASOLINA_ADITIVADA: z.number().optional(),
    ETANOL: z.number().optional(),
    DIESEL_COMUM: z.number().optional(),
    DIESEL_S10: z.number().optional()
});

export type LineChartItemType = z.infer<typeof LineChartItemSchema>;

export const KPIItemSchema = z.object({
    title: z.string(),
    value: z.union([z.string(), z.number()]),
    description: z.string().optional(),
});

export type KPIItemType = z.infer<typeof KPIItemSchema>;

export const FuelBarChartSchema = z.object({
  name: z.string(),
  liters: z.number()
});

export type FuelBarChartItemType = z.infer<typeof FuelBarChartSchema>;

export const FuelEfficiencyByVehicleSchema = z
  .object({
    carName: z.string(),
  })
  .catchall(z.union([z.string(), z.number()]));

export type FuelEfficiencyByVehicleType = z.infer<typeof FuelEfficiencyByVehicleSchema>;