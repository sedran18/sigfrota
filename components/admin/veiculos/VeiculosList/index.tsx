import VeiculoCard from "./VehicleCard"
import { VehicleType } from "@/schemas/vehicle.schema"


const VeiculosList = ({ items }: {items: VehicleType[]}) => {
  return (
    <div className="grid p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full overflow-hidden">
      {items.map((veiculo) => (
        <VeiculoCard key={veiculo.id} vehicle={veiculo} />
      ))}
    </div>
  )
}

export default VeiculosList