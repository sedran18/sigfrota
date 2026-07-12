import {type  FuelingType } from "../types";

export const fuelingsData:  FuelingType[] = [
    {
    id: "f83b9c2a-1234-4bc1-b552-3a8db29d1101",
    vehicleId: "abc-1234-flex-sedan-2024",
    driverId: "user-8831-joao-silva",
    requestId: "req-9910-a",
    gasStation: "Santos",
    fuelType: "GASOLINA COMUM",
    odometer: 45210,
    liters: 42.5,
    pricePerLiter: 5.79,
    totalAmount: 246.08,
    distanceTraveled: 480,
    fuelEfficiency: 11.29,
    observations: "Abastecimento padrão na saída do turno.",
    createdAt:  new Date(),
    updatedAt: new Date()
  },
  {
    id: "a31c8e9b-5678-4df2-a113-4b9ec30e2212",
    vehicleId: "xyz-9876-cargo-truck",
    driverId: "user-4412-marcos-souza",
    requestId: "req-9911-b",
    gasStation: "Plinio",
    fuelType: "DIESEL S10",
    odometer: 128450,
    liters: 120.0,
    pricePerLiter: 6.12,
    totalAmount: 734.40,
    distanceTraveled: 960,
    fuelEfficiency: 8.0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "e42d9f0c-9012-4ef3-c224-5c0fd41f3323",
    vehicleId: "pqr-4521-hatch-utilitario",
    driverId: "user-9923-ana-oliveira",
    requestId: "req-9912-c",
    gasStation: "Santa Marta",
    fuelType: "ETANOL",
    odometer: 18930,
    liters: 35.0,
    pricePerLiter: 3.89,
    totalAmount: 136.15,
    distanceTraveled: 295,
    fuelEfficiency: 8.43,
    observations: "Ar condicionado ligado 100% do tempo em rota urbana.",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
