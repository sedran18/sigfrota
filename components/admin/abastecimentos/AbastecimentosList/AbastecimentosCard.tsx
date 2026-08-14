import { dateToStringDate } from "@/lib/utils"
import { FuelType } from "@/schemas/enums.schema"
import { GetFuelingType } from "@/schemas/fueling.schema"
import { Calendar, Fuel, Gauge, Activity, FileText, User, ExternalLink, UserCheck } from "lucide-react"
import Link from "next/link"
import DeleteFuelingCard from "./DeleteBtn"

const fuelBadgeStyles: Record<FuelType, string> = {
  "GASOLINA_COMUM": "bg-slate-100 border-slate-300 text-slate-700",
  "GASOLINA_ADITIVADA": "bg-amber-50 border-amber-300 text-amber-800",
  "ETANOL": "bg-emerald-50 border-emerald-300 text-emerald-800",
  "DIESEL_COMUM": "bg-blue-50 border-blue-300 text-blue-800",
  "DIESEL_S10": "bg-indigo-50 border-indigo-300 text-indigo-800",
}

const AbastecimentosCard = ({ data }: { data: GetFuelingType }) => {
  const formattedDate = dateToStringDate(data.createdAt) || "---"
  const vehicleLabel = data.vehicle ? `${data.vehicle.brand} ${data.vehicle.model} - ${data.vehicle.plate}` : "N/I"

  return (
    <div
      className="group relative flex flex-col bg-white border border-[var(--border)]
                 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5
                 transition-all duration-150 overflow-hidden text-[var(--text1)]"
    >
      <div className="w-full flex justify-end p-2">
        <DeleteFuelingCard fuelingId={data.id} />
      </div>

      <span className="absolute left-0 top-0 h-full w-1 bg-[var(--secondary-color)]" />

      <div className="flex flex-col gap-3 pl-5 pr-4 py-4">
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-900 uppercase tracking-wide">
              <Calendar size={12} className="shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <h3 className="text-sm font-bold tracking-tight uppercase text-[var(--bg2)] truncate">
              {vehicleLabel}
            </h3>
          </div>

          <span
            className={`flex items-center gap-1.5 px-2 py-1 text-[10.5px] font-bold uppercase
                        tracking-wide border rounded-md shrink-0 ${fuelBadgeStyles[data.fuelType] || "bg-slate-100 text-slate-800 border-slate-300"}`}
          >
            <Fuel size={11} className="shrink-0" />
            {data.fuelType}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-3 border-t border-[var(--border)] text-[13px]">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Volume</span>
            <span className="font-bold tabular-nums text-[var(--bg2)]">
              {data.liters.toFixed(2)} <span className="text-[11px] font-semibold text-slate-400">L</span>
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Odômetro</span>
            <span className="font-bold tabular-nums text-[var(--bg2)]">
              {data.odometer.toLocaleString()} <span className="text-[11px] font-semibold text-slate-400">KM</span>
            </span>
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Condutor</span>
            <span className="flex items-center gap-1 font-bold uppercase text-[var(--bg2)] truncate">
              <User size={12} className="shrink-0" />
              {data.driver ? data.driver.name : "N/I"}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Posto</span>
            <span className="font-bold text-[var(--bg2)] truncate">
              {data.contractFuel.contract.gasStation.name}
            </span>
          </div>

          {data.createdBy?.name && (
            <div className="flex flex-col gap-0.5 min-w-0 col-span-2 pt-1 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">Criado por</span>
              <span className="flex items-center gap-1 font-bold uppercase text-[var(--bg2)] truncate">
                <UserCheck size={12} className="shrink-0 text-slate-500" />
                {data.createdBy.name.replace('_', ' ')}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5 bg-slate-50 border border-[var(--border)] rounded-lg px-3 py-2 text-[12.5px]">
          <div className="flex items-center gap-1.5">
            <Activity size={13} className="shrink-0 text-slate-400" />
            <span>
              Distância <strong className="font-bold text-[var(--bg2)]">+{data.distanceTraveled} KM</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-[var(--border)] pl-2.5">
            <Gauge size={13} className="shrink-0 text-slate-400" />
            <span>
              Consumo <strong className="font-bold text-emerald-700 text-[15px]">{data.fuelEfficiency.toFixed(2)} KM/L</strong>
            </span>
          </div>
        </div>

        {data.observations && (
          <div className="flex items-start gap-1.5 text-[12px] bg-slate-50 border border-[var(--border)] rounded-lg px-2.5 py-2">
            <FileText size={12} className="shrink-0 mt-0.5 text-slate-400" />
            <p className="line-clamp-2 leading-relaxed italic text-slate-900">&quot;{data.observations}&quot;</p>
          </div>
        )}
      </div>
      {data.requestId && (
        <div className="flex justify-end border-t border-slate-100 pt-2.5 m-4">
          <Link
            href={`/admin/solicitacoes/${data.requestId}`}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#093a1c] hover:text-[#093a1c]/80 uppercase tracking-wider transition-colors hover:underline"
          >
            <span>Ver Solicitação</span>
            <ExternalLink size={12} className="shrink-0" />
          </Link>
        </div>
      )}
    </div>
  )
}

export default AbastecimentosCard