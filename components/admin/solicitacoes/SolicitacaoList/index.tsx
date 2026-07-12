import { useState } from "react"
import RequestCard from "./RequestCard"
import {  fuelingRequestType} from "@/lib/types"


const SolicitacaoList = ({items}:{items:  fuelingRequestType[]}) => {
  const [solicitacoes, setSolicitacoes] = useState(items)


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