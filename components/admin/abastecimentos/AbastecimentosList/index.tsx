import { GetFuelingType } from "@/schemas/fueling.schema"
import AbastecimentosCard from "./AbastecimentosCard"

const AbastecimentosList = ({ data }: { data: GetFuelingType[] }) => {
  return (
    <div className="grid m-2 lg:m-4 grid-cols-1  gap-4">
      {data.map((item) => (
        <AbastecimentosCard key={item.id} data={item} />
      ))}
    </div>
  )
}

export default AbastecimentosList