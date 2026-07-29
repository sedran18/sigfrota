
import RequestCard from "./RequestCard"
import { FuelingRequestType } from "@/schemas/fuelingRequest.schema";


const SolicitacaoList = ({solicitacoes}:{solicitacoes:FuelingRequestType[]}) => {
  return (
      <div className="grid p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full overflow-hidden">
        {solicitacoes.map((item) => (
          <RequestCard
            key={item.id} 
            data={item} 
          />
        ))}
      </div>
  )
}

export default SolicitacaoList