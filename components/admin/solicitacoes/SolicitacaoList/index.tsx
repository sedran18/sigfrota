"use client"

import * as React from "react"
import RequestCard from "./RequestCard"
import { type RequestData } from "@/lib/types"

const dadosMock: RequestData[] = [
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    vehicle_id: "Vw Constellation (Placa ABC-1234)",
    driver_id: "Carlos Henrique",
    created_by: "Operador Regional",
    contract_fuel_id: "CTR-2026-001",
    liters: "full",
    fuel_type: "DIESEL S10",
    odometer: 184500,
    status: "PENDING",
    created_at: "08/07/2026 10:15",
    updated_at: "08/07/2026 10:15"
  },
  {
    id: "f9e8d7c6-b5a4-3f2e-1d0c-9b8a7f6e5d4c",
    vehicle_id: "Fiat Fiorino (Placa XYZ-9876)",
    driver_id: "Roberto Souza",
    created_by: "Supervisor Frota",
    contract_fuel_id: "CTR-2026-003",
    liters: 38.20,
    fuel_type: "GASOLINA COMUM",
    odometer: 62100,
    status: "COMPLETED",
    created_at: "07/07/2026 16:40",
    updated_at: "07/07/2026 17:12"
  }
]

const SolicitacaoList = () => {
  const [solicitacoes, setSolicitacoes] = React.useState<RequestData[]>(dadosMock)


  return (
    <div className="w-full min-h-screen p-4 md:p-3 bg-slate-100 flex flex-col gap-4">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {solicitacoes.map((item) => (
          <RequestCard
            key={item.id} 
            data={item} 
          />
        ))}
      </div>
    </div>
  )
}

export default SolicitacaoList