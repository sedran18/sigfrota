import { FuelingRequestType } from "@/schemas/fuelingRequest.schema";

export const  fuelingRequestsData: FuelingRequestType[] = [
    {
        id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
        vehicleId: "Vw Constellation (Placa ABC-1234)",
        driverId: "Carlos Henrique",
        createdBy: "Gabriel Nardes",
        contractFuelId: "CTR-2026-001",
        liters: "full",
        fuelType: "DIESEL_S10",
        odometer: 184500,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: "f9e8d7c6-b5a4-3f2e-1d0c-9b8a7f6e5d4c",
        vehicleId: "Fiat Fiorino (Placa XYZ-9876)", 
        driverId: "Roberto Souza",
        createdBy: "Supervisor Frota",
        contractFuelId: "CTR-2026-003",
        liters: 38.20,
        fuelType: "GASOLINA_COMUM",
        odometer: 62100,
        status: "COMPLETED",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]
