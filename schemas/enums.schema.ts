import { z } from "zod";

// Fuel Type
export const FuelTypeSchema = z.enum([
  "GASOLINA_COMUM",
  "ETANOL",
  "DIESEL_COMUM",
  "DIESEL_S10",
  "GASOLINA_ADITIVADA"
]);

export type FuelType = z.infer<typeof FuelTypeSchema>;


// Conservation Status
export const ConservationStatusSchema = z.enum([
  "GOOD",
  "UNDER_MAINTENANCE",
  "DEFFECTED"
])  

export type ConservationStatusType= z.infer<typeof ConservationStatusSchema>;


// Request Status
export const RequesStatusSchema = z.enum([
  'PENDING', 
  'COMPLETED', 
  'CANCELED'
]);

export type RequesStatusType = z.infer<typeof RequesStatusSchema>;


// User Role
export const UserRoleSchema = z.enum(['ADMIN', 'OPERATOR']);

export type UserRoleType = z.infer<typeof UserRoleSchema>;


//Vehicle Fuel Type
 export const VehicleFuelTypeSchema = z.enum(['GASOLINA', 'ETANOL', 'DIESEL_COMUM', 'DIESEL_S10', 'FLEX']);
 export type VehicleFuelTypeType = z.infer<typeof VehicleFuelTypeSchema>
