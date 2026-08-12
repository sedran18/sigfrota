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