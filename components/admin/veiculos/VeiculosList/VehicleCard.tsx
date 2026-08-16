import { Gauge, Fuel, ShieldAlert, FileText,  Calendar } from "lucide-react"
import {ConservationStatusType } from "@/schemas/enums.schema"
import DeleteVehicleBtn from "./DeleteVehicleBtn"
import AddVeiculo from "../AddVeiculo"
import { VehicleWithUsageType } from "@/schemas/vehicle.schema"



const statusConfig: Record<ConservationStatusType, { bg: string, text: string, label: string }> = {
  GOOD: { bg: "bg-emerald-100 border-emerald-300", text: "text-emerald-900", label: "OPERANTE" },
  UNDER_MAINTENANCE: { bg: "bg-amber-100 border-amber-300", text: "text-amber-900", label: "EM MANUTENÇÃO" },
  DEFFECTED: { bg: "bg-rose-100 border-rose-300", text: "text-rose-900", label: "INOPERANTE" }
}

const VeiculoCard = ({ vehicle, isAdmin }: {vehicle: VehicleWithUsageType, isAdmin: boolean}) => {
  const currentStatus = statusConfig[vehicle.conservationStatus] || statusConfig.GOOD

  return (
    <div className="relative flex flex-col justify-between gap-6 p-5 sm:p-6 bg-white text-slate-900 border border-slate-200 border-l-4 border-l-[var(--secondary-color)] transition-all rounded-none hover:border-slate-400 shadow-lg group w-full">
        {
          isAdmin && (
          <div className="w-full flex justify-end">
            <DeleteVehicleBtn vehicleId={vehicle.id} isUsed={vehicle.isUsed} active={vehicle.active}/>
          </div>
          )
        }
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-base font-mono font-black tracking-widest text-emerald-900 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5">
              {vehicle.plate.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-slate-900 tracking-wider flex items-center gap-1">
              <Calendar size={12} />
              ANO: {vehicle.year}
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 tracking-wide uppercase   mt-0.5">
            {vehicle.brand} {vehicle.model}
          </h3>
        </div>
        
        <span className={`flex items-center justify-center gap-1.5 px-3 py-1 text-xs font-black uppercase tracking-wider border shrink-0 w-fit ${currentStatus.bg} ${currentStatus.text}`}>
          <ShieldAlert size={13} />
          {currentStatus.label}
        </span>

        
      </div>
    
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 border-t border-b border-slate-200/80 py-4 text-xs font-bold tracking-wide uppercase text-slate-500">
        <div className="flex items-center gap-3">
          <Gauge size={16} className="text-slate-900 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-900 font-sans normal-case font-medium">Quilometragem Atual</span>
            <span className="text-base font-black text-slate-900 font-mono tracking-tight">{vehicle.currentOdometer.toLocaleString()} KM</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Fuel size={16} className="text-slate-900 shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-900 font-sans normal-case font-medium">Consumo Médio</span>
            <span className="text-base font-black text-slate-900 font-mono tracking-tight">{vehicle.averageConsumption.toFixed(1)} KM/L</span>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-3 text-xs font-mono text-slate-600">
          <span>COMBUSTÍVEL: <strong className="text-slate-900 font-bold">{vehicle.fuelType}</strong></span>
          <span>CAPACIDADE: <strong className="text-slate-900 font-bold">{vehicle.tankCapacity} L</strong></span>
        </div>
      </div>
      
      {vehicle.observation && (
        <div className="flex gap-2 text-xs bg-slate-50 border border-slate-200/60 p-3 normal-case font-medium leading-relaxed">
          <FileText size={14} className="text-slate-900 shrink-0 mt-0.5" />
          <p className="line-clamp-2">&quot;{vehicle.observation}&quot;</p>
        </div>
      )}
      {
        isAdmin && (
          <div className="flex h-6 items-center justify-end sm:justify-end  text-xs">
            <AddVeiculo vehicle={vehicle} />
          </div>
        )
      }
      

    </div>
  )
}

export default VeiculoCard