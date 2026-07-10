"use client"

import * as React from "react"
import { Gauge, Fuel, ShieldAlert, FileText, Edit2, Calendar } from "lucide-react"

export type FuelTypeVehicle = 'GASOLINA' | 'ETANOL' | 'DIESEL COMUM' | 'DIESEL S10' | 'FLEX'
export type ConservationStatus = 'GOOD' | 'UNDER_MAINTENANCE' | 'DEFFECTED'

export interface VeiculoData {
  id: string
  plate: string
  model: string
  brand: string
  year: number
  fuel_type: FuelTypeVehicle
  tank_capacity: number
  conservation_status: ConservationStatus
  observation: string | null
  average_consumption_km_l: number
  current_odometer: number
  created_at: string
  updated_at: string
}

interface VeiculoCardProps {
  data: VeiculoData
}

const statusConfig: Record<ConservationStatus, { bg: string, text: string, label: string }> = {
  GOOD: { bg: "bg-emerald-100 border-emerald-300", text: "text-emerald-900", label: "OPERANTE" },
  UNDER_MAINTENANCE: { bg: "bg-amber-100 border-amber-300", text: "text-amber-900", label: "EM MANUTENÇÃO" },
  DEFFECTED: { bg: "bg-rose-100 border-rose-300", text: "text-rose-900", label: "INOPERANTE" }
}

const VeiculoCard = ({ data }: VeiculoCardProps) => {
  const currentStatus = statusConfig[data.conservation_status] || statusConfig.GOOD

  return (
    <div className="relative flex flex-col justify-between gap-6 p-5 sm:p-6 bg-white text-slate-900 border border-slate-200 border-l-4 border-l-[var(--secondary-color)] transition-all rounded-none hover:border-slate-400 hover:shadow-lg group w-full">
      
      {/* Cabeçalho - Ajustado para empilhar se a tela for muito pequena */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-sm font-mono font-black tracking-widest text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5">
              {data.plate.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <Calendar size={12} />
              ANO: {data.year}
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-wide uppercase   mt-0.5">
            {data.brand} {data.model}
          </h3>
        </div>
        
        {/* Badge de Status */}
        <span className={`flex items-center justify-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider border shrink-0 w-fit ${currentStatus.bg} ${currentStatus.text}`}>
          <ShieldAlert size={13} />
          {currentStatus.label}
        </span>
      </div>

      {/* Dados Técnicos - 1 Coluna no mobile / 2 Colunas no Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-slate-200/80 py-4 text-xs font-bold tracking-wide uppercase text-slate-500">
        <div className="flex items-center gap-3">
          <Gauge size={16} className="text-slate-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-sans normal-case font-medium">Quilometragem Atual</span>
            <span className="text-sm font-black text-slate-900 font-mono tracking-tight">{data.current_odometer.toLocaleString()} KM</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Fuel size={16} className="text-slate-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 font-sans normal-case font-medium">Consumo Médio</span>
            <span className="text-sm font-black text-slate-900 font-mono tracking-tight">{data.average_consumption_km_l.toFixed(1)} KM/L</span>
          </div>
        </div>

        {/* Rodapé Interno do Grid - Ajustado para layout flexível no mobile */}
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-3 text-xs font-mono text-slate-600">
          <span>COMBUSTÍVEL: <strong className="text-slate-900 font-bold">{data.fuel_type}</strong></span>
          <span>CAPACIDADE: <strong className="text-slate-900 font-bold">{data.tank_capacity} L</strong></span>
        </div>
      </div>
      
      {/* Caixa de Observação */}
      {data.observation && (
        <div className="flex gap-2 text-xs bg-slate-50 border border-slate-200/60 p-3 normal-case font-medium leading-relaxed">
          <FileText size={14} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="line-clamp-2">&quot;{data.observation}&quot;</p>
        </div>
      )}

      <div className="flex items-center justify-end sm:justify-end pt-1 text-xs">

        <button 
          type="button"
          className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 h-9 bg-[#093a1c] hover:bg-[#093a1c]/90 text-white text-xs font-bold uppercase tracking-wider rounded-none transition-all cursor-pointer shadow-md"
        >
          <Edit2 size={11} />
          <span>Editar</span>
        </button>
      </div>

    </div>
  )
}

export default VeiculoCard