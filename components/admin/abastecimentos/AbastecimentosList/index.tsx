import { GetFuelingType } from "@/schemas/fueling.schema"
import AbastecimentosCard from "./AbastecimentosCard"


const AbastecimentosList = ({ data }: {data: GetFuelingType[]}) => {

  return (
    <div className="flex flex-col gap-3">
      {data.map((item) => (
        <AbastecimentosCard key={item.id} data={item} />
      ))}
    </div>
  )
}

export default AbastecimentosList