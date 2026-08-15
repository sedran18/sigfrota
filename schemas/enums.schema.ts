import { z } from "zod";

export const FuelTypeSchema = z.enum([
  "GASOLINA_COMUM",
  "ETANOL",
  "DIESEL_COMUM",
  "DIESEL_S10",
  "GASOLINA_ADITIVADA",
], {
  error: "Tipo de combustível inválido",
});
export type FuelType = z.infer<typeof FuelTypeSchema>;

export const ConservationStatusSchema = z.enum([
  "GOOD",
  "UNDER_MAINTENANCE",
  "DEFFECTED",
], {
  error: "Status de conservação inválido",
});
export type ConservationStatusType = z.infer<typeof ConservationStatusSchema>;

export const RequestStatusSchema = z.enum([
  "PENDING",
  "COMPLETED",
], {
  error: "Status da solicitação inválido",
});
export type RequestStatusType = z.infer<typeof RequestStatusSchema>;

export const UserRoleSchema = z.enum(["ADMIN", "OPERATOR"], {
  error: "Perfil de usuário inválido",
});
export type UserRoleType = z.infer<typeof UserRoleSchema>;

export const VehicleFuelTypeSchema = z.enum(
  ["GASOLINA", "ETANOL", "DIESEL_COMUM", "DIESEL_S10", "FLEX"],
  { error: "Tipo de combustível do veículo inválido" }
);
export type VehicleFuelTypeType = z.infer<typeof VehicleFuelTypeSchema>;