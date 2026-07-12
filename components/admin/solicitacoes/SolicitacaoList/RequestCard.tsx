"use client"

import { CheckCircle2, X, AlertCircle, XCircle, Fuel, User, Gauge, Calendar, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { dateToStringDate } from "@/lib/utils"


const statusConfig = {
  PENDING: { 
    bg: "bg-amber-50 text-amber-700 border-amber-200", 
    icon: <AlertCircle size={13} />, 
    label: "Pendente" 
  },
  COMPLETED: { 
    bg: "bg-emerald-50 text-emerald-800 border-emerald-200", 
    icon: <CheckCircle2 size={13} />, 
    label: "Concluído" 
  },
  CANCELED: { 
    bg: "bg-rose-50 text-rose-700 border-rose-200", 
    icon: <XCircle size={13} />, 
    label: "Cancelado" 
  }
}

const RequestCard = ({ data }: {data:  fuelingRequestType}) => {
  const currentStatus = statusConfig[data.status]
  const isPending = data.status === "PENDING"

  return (
    <div className={`
      relative flex flex-col justify-between gap-5 p-5 pt-3 bg-white border border-slate-200 transition-all rounded-none w-full
      ${isPending ? "hover:border-slate-300 hover:shadow-md before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-emerald-800" : "bg-slate-50/50"}
    `}>
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-3 min-w-0">
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide truncate max-w-[160px] sm:max-w-xs">
            {data.vehicleId}
          </h3>
        </div>
        
        <span className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border shrink-0 ${currentStatus.bg}`}>
          {currentStatus.icon}
          {currentStatus.label}
        </span>
      </div>
      <Button>
        <X />
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-slate-100 py-4 my-1 text-sm text-slate-600">
        <div className="flex items-center gap-2.5">
          <User size={14} className="shrink-0 text-slate-400" />
          <span>Condutor: <strong className="text-slate-800 font-bold uppercase">{data.driverId}</strong></span>
        </div>

        <div className="flex items-center gap-2.5">
          <Fuel size={14} className="shrink-0 text-slate-400" />
          <span>Combustível: <strong className="text-slate-800 font-bold">{data.fuelType}</strong></span>
        </div>

        <div className="flex items-center gap-2.5">
          <Gauge size={14} className="shrink-0 text-slate-400" />
          <span>Odômetro: <strong className="text-slate-800 font-mono font-bold">{data.odometer ? `${data.odometer.toLocaleString()} KM` : "Não informado"}</strong></span>
        </div>

        <div className="flex items-center gap-2.5">
          <Fuel size={14} className="shrink-0 text-slate-400" />
          <span>Volume Solicitado: <strong className="text-emerald-800 font-black uppercase">{data.liters === "full" ? "Tanque Cheio" : `${data.liters} L`}</strong></span>
        </div>
      </div>
        
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-1.5 font-medium text-[13px] text-slate-500">
          <Calendar size={15} className="text-slate-400" />
          <span>Criado: {dateToStringDate(data.createdAt)}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
          <Button 
            variant="outline"
            className="w-full sm:w-auto border-slate-300 text-slate-900 bg-white font-bold text-xs tracking-wider uppercase rounded-none h-9 px-3 gap-1.5 cursor-pointer hover:bg-slate-50 hover:text-slate-950 transition-all"
          >
            <Printer size={13} />
            Imprimir
          </Button>
          
          {isPending ? (
            <Button
              className="w-full sm:w-auto bg-[#093a1c] hover:bg-emerald-900 text-white font-bold text-xs tracking-wider uppercase rounded-none h-9 px-4 cursor-pointer transition-all shadow-sm"
            >
              Completar Solicitação
            </Button>
          ) : (
            <span className="w-full sm:w-auto text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 border border-slate-200/60 px-3 py-2 select-none">
              Finalizado em {dateToStringDate(data.updatedAt)}
            </span>
          )}
        </div>
      </div>

    </div>
  )
}

export default RequestCard