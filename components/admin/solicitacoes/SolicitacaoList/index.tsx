
import { RequesStatusType } from "@/schemas/enums.schema";
import RequestCard from "./RequestCard";
import {GetFuelingRequestType } from "@/schemas/fuelingRequest.schema";


const SolicitacaoList = ({solicitacoes, status}:{solicitacoes:GetFuelingRequestType[], status: RequesStatusType}) => {
  return (
      <div className="grid p-1 md:p-2 lg:p-10 px-auto grid-cols-1 gap-4 w-full overflow-hidden">
        {solicitacoes.map((item) => (
          <RequestCard
            status={status}
            key={item.id} 
            data={item} 
          />
        ))}
      </div>
  )
}

export default SolicitacaoList