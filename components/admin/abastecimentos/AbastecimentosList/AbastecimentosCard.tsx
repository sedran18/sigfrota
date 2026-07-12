import { FuelType,  FuelingType } from "@/lib/types"
import { dateToStringDate } from "@/lib/utils"
import { Calendar, Fuel, Gauge, Activity, FileText, User } from "lucide-react"
import Link from "next/link"

const fuelBadgeStyles: Record<FuelType, string> = {
  "GASOLINA COMUM": "bg-slate-100 border-slate-300 text-slate-700",
  "GASOLINA ADITIVADA": "bg-amber-50 border-amber-300 text-amber-800",
  "ETANOL": "bg-emerald-50 border-emerald-300 text-emerald-800",
  "DIESEL S500": "bg-blue-50 border-blue-300 text-blue-800",
  "DIESEL S10": "bg-indigo-50 border-indigo-300 text-indigo-800",
}



const AbastecimentosCard = ({ data }: {data:  FuelingType}) => {
  const formattedDate = dateToStringDate(data.createdAt) || "---"
  const vehicleLabel = data.vehicleId ? `VEÍCULO ${data.vehicleId.substring(0, 8).toUpperCase()}` : "NÃO INFORMADO"

  return (
    <Link
      href=""
      className="group relative flex flex-col gap-3 bg-white border border-slate-200
                 rounded-sm shadow-sm hover:shadow-md hover:border-slate-300
                 transition-all duration-150 overflow-hidden text-slate-900"
    >
      <span className={`absolute  top-0 h-full w-1 bg-[var(--secondary-color)]`} />

      <div className="flex flex-col gap-3 pl-4 pr-3.5 py-3.5">
        <div className="flex justify-between items-start gap-3">
          <div className="flex flex-col gap-0.5 min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold  uppercase tracking-wide">
              <Calendar size={12} className="shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <h3 className="text-sm font-bold tracking-tight uppercase   ">
              {vehicleLabel}
            </h3>
          </div>

          <span
            className={`flex items-center gap-1.5 px-2 py-1 text-[10.5px] font-bold uppercase
                        tracking-wide border rounded-sm shrink-0 ${fuelBadgeStyles[data.fuelType] || "bg-slate-100 text-slate-800 border-slate-300"}`}
          >
            <Fuel size={11} className="shrink-0" />
            {data.fuelType}
          </span>
        </div>

        <table className="w-full border-t border-slate-100 text-[13px]">
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-1.5 pr-2 text-[12px] font-bold  uppercase tracking-wide align-middle">
                Volume
              </td>
              <td className="py-1.5 text-right font-bold tabular-nums  align-middle">
                {data.liters.toFixed(2)} <span className="text-[11px] font-semibold ">L</span>
              </td>
            </tr>

            <tr>
              <td className="py-1.5 pr-2 text-[12px] font-bold  uppercase tracking-wide align-middle">
                Condutor
              </td>
              <td className="py-1.5 align-middle">
                <span className="flex items-center justify-end gap-1 font-bold uppercase   ">
                  <User size={12} className="shrink-0 " />
                  {data.driverId ? data.driverId.substring(0, 8) : "N/I"}
                </span>
              </td>
            </tr>

            <tr>
              <td className="py-1.5 pr-2 text-[12px] font-bold  uppercase tracking-wide align-middle">
                Odômetro
              </td>
              <td className="py-1.5 text-right font-bold tabular-nums  align-middle">
                {data.odometer.toLocaleString()} KM
              </td>
            </tr>

            <tr>
              <td className="py-1.5 pr-2 text-[12px] font-bold  uppercase tracking-wide align-middle">
                Posto
              </td>
              <td className="py-1.5 text-right font-bold tabular-nums    align-middle">
                {data.gasStation}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="grid grid-cols-2 gap-2.5 bg-slate-50 border border-slate-100 rounded-sm px-3 py-2 text-[12.5px]">
          <div className="flex items-center gap-1.5">
            <Activity size={13} className="shrink-0 " />
            <span className=" ">
              Distância <strong className="font-bold ">+{data.distanceTraveled} KM</strong>
            </span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2.5">
            <Gauge size={13} className="shrink-0 " />
            <span className="">
              Consumo <strong className="font-bold text-emerald-700 text-[15px]">{data.fuelEfficiency.toFixed(2)} KM/L</strong>
            </span>
          </div>
        </div>

        {data.observations && (
          <div className="flex items-start gap-1.5 text-[12px] bg-slate-50 border border-slate-100 rounded-sm px-2.5 py-2">
            <FileText size={12} className="shrink-0 mt-0.5 " />
            <p className="line-clamp-2 leading-relaxed italic">&quot;{data.observations}&quot;</p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default AbastecimentosCard;