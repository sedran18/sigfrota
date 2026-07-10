import React from 'react';

export type Paginas =  {
    icone: React.ComponentType,
    pagina: string,
    link: string

}

export type Status = "PENDING" | "COMPLETED" | "CANCELED"
export type FuelType = "GASOLINA COMUM" | "ETANOL" | "DIESEL S500" | "DIESEL S10" | "GASOLINA ADITIVADA"

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

export interface AbastecimentoData {
  id: string
  vehicle_id: string
  driver_id: string | null
  request_id: string
  posto: string
  fuel_type: FuelType
  odometer: number
  liters: number
  price_per_liter: number
  total_amount: number
  distance_traveled: number
  fuel_efficiency: number
  observations: string | null
  created_at: string
  updated_at: string
}

