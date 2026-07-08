"use client"

import * as React from "react"
import { CheckCircle2, AlertCircle, XCircle, Fuel, User, Gauge, Calendar, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type RequestData} from "@/lib/types"

interface RequestProps {
  data: RequestData
}

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

const Request = ({ data }: RequestProps) => {
  const currentStatus = statusConfig[data.status]
  const isPending = data.status === "PENDING"

  return (
    <div className={`
      relative flex flex-col justify-between gap-5 p-5 pt-3 bg-white border border-slate-200 transition-all rounded-none
      ${isPending ? "hover:border-slate-300 hover:shadow-md before:absolute before:top-0 before:left-0 before:w-full before:h-[3px] before:bg-emerald-800" : "bg-slate-50/50"}
    `}>
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-3">
          
          <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide truncate max-w-[160px] sm:max-w-xs">
            {data.vehicle_id}
          </h3>
        </div>
        
        <span className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border ${currentStatus.bg}`}>
          {currentStatus.icon}
          {currentStatus.label}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 border-t border-b border-slate-100 py-4 my-1 text-sm">
        <div className="flex items-center gap-2.5 text-[var(--bg2)]">
          <User size={14} className=" shrink-0" />
          <span className="truncate">Condutor: <strong className="text-slate-800 font-bold uppercase">{data.driver_id}</strong></span>
        </div>

        <div className="flex items-center gap-2.5 text-[var(--bg2)]">
          <Fuel size={14} className=" shrink-0" />
          <span className="truncate">Combustível: <strong className="text-slate-800 font-bold">{data.fuel_type}</strong></span>
        </div>

        <div className="flex items-center gap-2.5 text-[var(--bg2)]">
          <Gauge size={14} className=" shrink-0" />
          <span className="truncate">Odômetro: <strong className="text-slate-800 font-mono font-bold">{data.odometer ? `${data.odometer.toLocaleString()} KM` : "Não informado"}</strong></span>
        </div>

        <div className="flex items-center gap-2.5 text-[var(--bg2)]">
          <Fuel size={14} className=" shrink-0" />
          <span className="truncate">Volume Solicitado: <strong className="text-emerald-800 font-black uppercase">{data.liters === "full" ? "Tanque Cheio" : `${data.liters} L`}</strong></span>
        </div>
        
      </div>
        
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 font-medium text-[13px] text-[var(--bg2)]">
            <Calendar size={15} className="" />
            <span>Criado: {data.created_at}</span>
          </div>
        <div className="flex gap-3">
             <Button 
          variant="outline"
          className="w-full sm:w-auto border-slate-300 text-slate-900 bg-white font-bold text-xs tracking-wider uppercase rounded-none h-9 px-3 gap-1.5 cursor-pointer hover:bg-slate-50 hover:text-slate-950 transition-all"
        >
          <Printer size={13} />
          Imprimir
        </Button>
        
        {isPending ? (
          <Button
            className="w-full sm:w-auto bg-[var(--secondary-color)] hover:bg-emerald-900 text-white font-bold text-xs tracking-wider uppercase rounded-none h-9 px-4 cursor-pointer transition-all shadow-sm"
          >
            Completar Solicitação
          </Button>
        ) : (
          <span className="w-full sm:w-auto text-center text-[10px] font-bold text-[var(--bg2)] uppercase tracking-wider bg-slate-100 border border-slate-200/60 px-3 py-2 select-none">
            Finalizado em {data.updated_at.split(" ")[0]}
          </span>
        )}
        </div>
       
      </div>
    </div>
  )
}

export default Request