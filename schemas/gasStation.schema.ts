import z from "zod";

export const GasStationSchema = z.object({
  id: z.uuid(),
  name: z.string().min(2).max(100),
  cnpj: z
    .string()
    .regex(/^\d{14}$/, "CNPJ deve conter 14 dígitos"),
  address: z.string().min(5).max(255),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type GasStationType = z.infer<typeof GasStationSchema>