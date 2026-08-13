import VeiculoCard from "./VehicleCard"
import { VehicleWithUsageType } from "@/schemas/vehicle.schema"

const VeiculosList = ({ items, isAdmin }: { items: VehicleWithUsageType[], isAdmin: boolean }) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 lg:p-8 w-full">
      {items.map((veiculo) => (
        <VeiculoCard key={veiculo.id} vehicle={veiculo} isAdmin={isAdmin} />
      ))}
    </div>
  )
}

export default VeiculosList