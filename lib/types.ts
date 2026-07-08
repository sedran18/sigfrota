import React from 'react';

export type Paginas =  {
    icone: React.ComponentType,
    pagina: string,
    link: string

}

export type Status = "PENDING" | "COMPLETED" | "CANCELED"
export type FuelType = "GASOLINA" | "ETANOL" | "DIESEL S500" | "DIESEL S10"

export interface RequestData {
  id: string
  vehicle_id: string
  driver_id: string
  created_by: string
  contract_fuel_id: string
  liters: number | "full"
  fuel_type: FuelType
  odometer: number | null
  status: Status
  created_at: string
  updated_at: string
}