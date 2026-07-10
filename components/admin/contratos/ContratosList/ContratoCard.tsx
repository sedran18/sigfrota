"use client"

import { Calendar, FileText, ShieldCheck, ShieldAlert, Edit2 } from "lucide-react"

export interface ContratoData {
  id: string
  gas_station_id: string
  contract_number: number
  start_date: string
  end_date: string
  active: boolean
  created_at: string
  updated_at: string
}

interface ContratoCardProps {
  data: ContratoData
}
const ContratoCard = ({ data }: ContratoCardProps) => {
  return (
    <div className="relative flex flex-col justify-between gap-6 p-6 bg-white  
     border border-slate-200 transition-all rounded-none hover:border-slate-400 hover:shadow-lg group border-l-4 border-l-[var(--secondary-color)]">
      
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold  uppercase tracking-wider">
            <FileText size={14} className="shrink-0" />
            <span>Nº CONTRATO: {data.contract_number}</span>
          </div>
          <h3 className="text-base font-black  tracking-wide uppercase   mt-0.5">
            {data.gas_station_id.substring(0, 8).toUpperCase()}
          </h3>
        </div>
        
        <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider border shrink-0 ${
          data.active 
            ? "bg-emerald-100 border-emerald-300 text-emerald-900" 
            : "bg-slate-100 border-slate-300 "
        }`}>
          {data.active ? <ShieldCheck size={13} /> : <ShieldAlert size={13} />}
          {data.active ? "VIGENTE" : "ENCERRADO"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-slate-200/80 py-4 text-xs font-bold tracking-wide uppercase ">
        <div className="flex items-center gap-3">
          <Calendar size={16} className=" shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px]  font-sans normal-case font-medium">Data de Início</span>
            <span className="text-sm font-black  font-mono tracking-tight">
              {data.start_date.split(" ")[0]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar size={16} className=" shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px]  font-sans normal-case font-medium">Data de Término</span>
            <span className="text-sm font-black  font-mono tracking-tight">
              {data.end_date.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end pt-1 text-xs ">
        
        <button 
          type="button"
          className="flex items-center gap-1.5 px-4 h-9 bg-[#093a1c] hover:bg-[#093a1c]/90 text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer shadow-md"
        >
          <Edit2 size={11} />
          <span>Editar</span>
        </button>
      </div>

    </div>
  )
}

export default ContratoCard