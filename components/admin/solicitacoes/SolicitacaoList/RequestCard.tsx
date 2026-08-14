import { CheckCircle2, AlertCircle, XCircle, Fuel, User, Gauge, Calendar, ExternalLink } from "lucide-react"
import { dateToStringDate } from "@/lib/utils"
import { GetFuelingRequestType } from "@/schemas/fuelingRequest.schema"
import DeleteBtn from "./DeleteBtn"
import AddRequest from "../AddRequest"
import PrintOrderButton from "../PrintOrderButton"
import AddFueling from "../../abastecimentos/AddFueling"
import Link from "next/link"

const statusConfig = {
  PENDING: { 
    bg: "bg-amber-50 text-amber-900 border-amber-200", 
    icon: <AlertCircle size={13} />, 
    label: "Pendente" 
  },
  COMPLETED: { 
    bg: "bg-emerald-50 text-emerald-950 border-emerald-200", 
    icon: <CheckCircle2 size={13} />, 
    label: "Concluído" 
  },
  CANCELED: { 
    bg: "bg-rose-50 text-rose-900 border-rose-200", 
    icon: <XCircle size={13} />, 
    label: "Cancelado" 
  }
}

const RequestCard = ({ data }: { data: GetFuelingRequestType }) => {
  const currentStatus = statusConfig[data.status]
  const isPending = data.status === "PENDING"
  
  return (
    <div className={`
      relative flex flex-col justify-between gap-3 sm:gap-5 p-3.5 sm:p-5 pt-3 bg-white border border-slate-200 transition-all rounded-none w-full
      ${isPending ? "hover:border-slate-300 hover:shadow-md before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-emerald-800" : "bg-slate-50/50"}
    `}>
      <div className="w-full flex justify-end">
        <DeleteBtn status={data.status} fuelingRequestId={data.id}/>
      </div>
      
      <div className="flex justify-between items-start gap-2.5 sm:gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-wide truncate max-w-[200px] sm:max-w-xs">
            {data.vehicle.brand}, {data.vehicle.model}, {data.vehicle.plate}, {data.vehicle.year}
          </h3>
        </div>
        
        <span className={`flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border shrink-0 ${currentStatus.bg}`}>
          {currentStatus.icon}
          {currentStatus.label}
        </span>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 gap-x-4 border-t border-b border-slate-100 py-3 sm:py-4 my-0.5 text-xs sm:text-sm text-slate-900">
        <div className="flex items-center gap-2">
          <User size={13} className="shrink-0 text-slate-900 sm:w-3.5 sm:h-3.5" />
          <span className="text-slate-900">Condutor: <strong className="text-slate-900 font-bold uppercase">{data.driver.name}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <Fuel size={13} className="shrink-0 text-slate-900 sm:w-3.5 sm:h-3.5" />
          <span className="text-slate-900">Combustível: <strong className="text-slate-900 font-bold">{data.fuelType.includes('_') ? data.fuelType.replace('_', ' ') : data.fuelType}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <Gauge size={13} className="shrink-0 text-slate-900 sm:w-3.5 sm:h-3.5" />
          <span className="text-slate-900">Odômetro: <strong className="text-slate-900 font-mono font-bold">{data.odometer ? `${data.odometer.toLocaleString()} KM` : "Não informado"}</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <Fuel size={13} className="shrink-0 text-slate-900 sm:w-3.5 sm:h-3.5" />
          <span className="text-slate-900">Volume Solicitado: <strong className="text-slate-900 font-black uppercase">{data.liters === "FULL" ? "Tanque Cheio" : `${data.liters} L`}</strong></span>
        </div>
      </div>
        
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-1">
        <div className="flex items-center gap-1.5 font-medium text-[11px] sm:text-[13px] text-slate-900">
          <Calendar size={13} className="text-slate-900 sm:w-3.5 sm:h-3.5" />
          <span className="text-slate-900">Criado: {dateToStringDate(data.createdAt)}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 w-full sm:w-auto">
          <AddRequest request={data} key={'update'}/>
          {
            data.status === 'PENDING' && (
              <PrintOrderButton data={data}/>
            )
          }

          
          {isPending && !data.fuelingId ? (
            <AddFueling requestId={data.id}/>
          ) : (
          <Link
            href={`/admin/abastecimentos/${data.fuelingId}`} 
            className="w-full sm:w-auto h-10 sm:h-11 border border-slate-300 text-slate-900 bg-white hover:bg-slate-50 font-bold text-[10px] sm:text-xs tracking-wider uppercase rounded-none px-4 gap-2 flex items-center justify-center transition-all shadow-sm shrink-0"
          >
            <ExternalLink size={14} className="sm:w-4 sm:h-4 shrink-0 text-slate-700" />
            <span>Ver Abastecimento</span>
          </Link>
          )}
        </div>
      </div>

    </div>
  )
}

export default RequestCard