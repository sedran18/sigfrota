import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import BasicFilters from "@/components/admin/BasicFilters";
import AbastecimentosList from "@/components/admin/abastecimentos/AbastecimentosList";
import { AbastecimentoData } from "@/lib/types";


export const MOCK_ABASTECIMENTOS: AbastecimentoData[] = [
  {
    id: "f83b9c2a-1234-4bc1-b552-3a8db29d1101",
    vehicle_id: "abc-1234-flex-sedan-2024",
    driver_id: "user-8831-joao-silva",
    request_id: "req-9910-a",
    posto: "Santos",
    fuel_type: "GASOLINA COMUM",
    odometer: 45210,
    liters: 42.5,
    price_per_liter: 5.79,
    total_amount: 246.08,
    distance_traveled: 480,
    fuel_efficiency: 11.29,
    observations: "Abastecimento padrão na saída do turno.",
    created_at: "08/07/2026 08:30:22",
    updated_at: "08/07/2026 08:32:00"
  },
  {
    id: "a31c8e9b-5678-4df2-a113-4b9ec30e2212",
    vehicle_id: "xyz-9876-cargo-truck",
    driver_id: "user-4412-marcos-souza",
    request_id: "req-9911-b",
    posto: "Plinio",
    fuel_type: "DIESEL S10",
    odometer: 128450,
    liters: 120.0,
    price_per_liter: 6.12,
    total_amount: 734.40,
    distance_traveled: 960,
    fuel_efficiency: 8.0,
    observations: null,
    created_at: "07/07/2026 17:15:00",
    updated_at: "07/07/2026 17:15:00"
  },
  {
    id: "e42d9f0c-9012-4ef3-c224-5c0fd41f3323",
    vehicle_id: "pqr-4521-hatch-utilitario",
    driver_id: "user-9923-ana-oliveira",
    request_id: "req-9912-c",
    posto: "Santa Marta",
    fuel_type: "ETANOL",
    odometer: 18930,
    liters: 35.0,
    price_per_liter: 3.89,
    total_amount: 136.15,
    distance_traveled: 295,
    fuel_efficiency: 8.43,
    observations: "Ar condicionado ligado 100% do tempo em rota urbana.",
    created_at: "06/07/2026 11:02:14",
    updated_at: "06/07/2026 11:05:00"
  }
]

const Abastecimentos = () => {
  return (
    <div className="w-full flex flex-col">
      <HeaderTemplate 
        title="Abastecimentos"
        description="Lista de todos os abastecimentos registrados"
      >
        <DateCalendarPicker />
      </HeaderTemplate>
      
      <BasicFilters />
      <div className="m-2 lg:m-10">
        <AbastecimentosList items={MOCK_ABASTECIMENTOS} />
      </div>
    </div>
  )
}

export default Abastecimentos