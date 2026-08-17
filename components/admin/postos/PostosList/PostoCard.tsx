import { FileText, MapPin } from "lucide-react"
import {GasStationWithUsageType } from "@/schemas/gasStation.schema";
import AddGasStation from "../AddGasStation";
import DeleteGasStationBtn from "./DeleteGasStationBtn";


const PostoCard = ({ gasStation, isAdmin }: {gasStation: GasStationWithUsageType, isAdmin: boolean}) => {
  return (
    <div className="relative flex flex-col justify-between gap-6 p-5 sm:p-6 bg-white text-slate-900 border border-slate-200 transition-all
     rounded-none hover:border-slate-400 hover:shadow-lg group w-full border-l-4 border-l-[var(--secondary-color)]">
      {
        isAdmin && (
          <div className="w-full flex justify-end">
            <DeleteGasStationBtn gasStationId={gasStation.id} isUsed={gasStation.isUsed} active={gasStation.active}/>
          </div>
        )
      }
      <div className="flex flex-col gap-1 min-w-0">
        <h3 className="text-base font-black text-slate-900 tracking-wide uppercase   mt-0.5">
          {gasStation.name}
        </h3>
      </div>

      
      <div className="flex flex-col gap-4 border-t border-b border-slate-200/80 py-4 text-xs font-bold tracking-wide uppercase text-slate-500">
        <div className="flex items-center gap-3">
          <FileText size={16} className="text-slate-900 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] font-sans normal-case font-medium text-slate-900">Documentação</span>
            <span className="text-base font-black text-slate-900 font-mono tracking-tight">CNPJ: {gasStation.cnpj}</span>
          </div>
        </div>

        <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
          <MapPin size={16} className="text-slate-900 shrink-0 mt-0.5" />
          <div className="flex flex-col min-w-0 w-full">
            <span className="text-[10px] font-sans normal-case font-medium text-slate-900 mb-0.5">Localização</span>
            <span className="text-xs font-bold text-slate-700 uppercase leading-relaxed font-sans tracking-wide break-words">
              {gasStation.address || "Não informado"}
            </span>
          </div>
        </div>
      </div>
      {
        isAdmin && (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-3 text-xs h-10">
          <AddGasStation gasStation={gasStation}/>
        </div>
        )
      }
      

    </div>
  )
}

export default PostoCard;