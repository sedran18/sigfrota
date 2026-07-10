import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddVeiculo from "@/components/admin/veiculos/AddVeiculo";
import VeiculosList from "@/components/admin/veiculos/VeiculosList";

import { VeiculoData } from "@/components/admin/veiculos/VeiculosList/VeiuloCard";

export const MOCK_VEICULOS: VeiculoData[] = [
  {
    id: "v1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    plate: "BRA2E19",
    brand: "TOYOTA",
    model: "HILUX CD 4X4",
    year: 2024,
    fuel_type: "DIESEL S10",
    tank_capacity: 80,
    conservation_status: "GOOD",
    observation: "Veículo destinado à equipe de operações de campo. Revisão em dia.",
    average_consumption_km_l: 10.5,
    current_odometer: 32450,
    created_at: "09/07/2026 08:00:00",
    updated_at: "09/07/2026 08:00:00"
  },
  {
    id: "v6e5d4c3-b2a1-0f9e-8d7c-6b5a4f3e2d1c",
    plate: "QUR7H44",
    brand: "VOLKSWAGEN",
    model: "GOL 1.0 MPI",
    year: 2022,
    fuel_type: "FLEX",
    tank_capacity: 55,
    conservation_status: "UNDER_MAINTENANCE",
    observation: "Troca preventiva de pastilhas de freio e óleo do motor agendada.",
    average_consumption_km_l: 13.2,
    current_odometer: 78120,
    created_at: "08/07/2026 11:30:00",
    updated_at: "08/07/2026 14:00:00"
  },
  {
    id: "v1a3b5c7-2e4f-6g8h-0i9j-1k2l3m4n5o6p",
    plate: "RBD4F21",
    brand: "FIAT",
    model: "STRADA FREEDOM",
    year: 2023,
    fuel_type: "GASOLINA",
    tank_capacity: 55,
    conservation_status: "DEFFECTED",
    observation: "Apresentou falha na bomba de combustível. Aguardando guincho e entrada na oficina.",
    average_consumption_km_l: 12.1,
    current_odometer: 45980,
    created_at: "05/07/2026 09:15:00",
    updated_at: "09/07/2026 15:30:00"
  }
]

const Veiculos = () => {
    return (<>
        <HeaderTemplate title="Veículos">
          <AddVeiculo />
        </HeaderTemplate>
        <div className="m-2 lg:m-10">
            <VeiculosList items={MOCK_VEICULOS}/>
        </div>
    </>)
}

export default Veiculos;
