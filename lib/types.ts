import React from 'react';

export type Paginas =  {
    icone: React.ComponentType,
    pagina: string,
    link: string

}

export type Status = "PENDING" | "COMPLETED" | "CANCELED"
export type FuelType = "GASOLINA COMUM" | "ETANOL" | "DIESEL S500" | "DIESEL S10" | "GASOLINA ADITIVADA"

export interface  FuelingRequestType {
  id: string
  vehicleId: string
  driverId: string
  createdBy: string
  contractFuelId: string
  liters: number | "full"
  fuelType: FuelType
  odometer: number | null
  status: Status
  createdAt: Date
  updatedAt: Date
}

export interface  FuelingType {
  id: string
  vehicleId: string
  driverId?: string
  requestId: string
  gasStation: string
  fuelType: FuelType
  odometer: number
  liters: number
  pricePerLiter: number
  totalAmount: number
  distanceTraveled: number
  fuelEfficiency: number
  observations?: string
  createdAt: Date
  updatedAt: Date
}

export interface DriverType {
  id: string
  name: string
  phone?: string
  created_at: string
}

type ConservationStatus = 'GOOD' | 'UNDER_MAINTENANCE' | 'DEFFECTED'

export interface VehicleType {
  id: string
  plate: string
  model: string
  brand: string
  year: number
  fuelType: FuelType
  tankCapacity: number
  conservationStatus: ConservationStatus
  observation?: string
  averageConsumptionKmL: number
  currentOdometer: number
}

export interface GasStationType {
  id: string
  name: string
  cnpj: string
  address: string
  phone: string
}

export interface ContractType {
  id: string
  gasStation: string
  contractNumber: number
  startDate: Date
  endDate: Date
  active: boolean
}

export type ResponseType<T> = 
    {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };
    
export type OptionType = string | { id: string; name: string, active?: boolean } | {id: string, brand: string, model: string, plate: string, year: number, active?: boolean}


export interface FilterConfig {
  title: string
  paramName: string
  campos: OptionType[]
}

export interface RawFuelEfficiencyItem {
  "vehicle brand": string
  "vehicle model": string
  "vehicle plate": string
  driver: string
  efficiency: number
}