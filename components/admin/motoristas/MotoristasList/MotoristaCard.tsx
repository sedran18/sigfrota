import { dateToStringDate } from "@/lib/utils"
import {  DriverType } from "@/schemas/driver.schema"
import {  Phone, Calendar} from "lucide-react"
import AddMotorista from "../AddMotorista"
import DeleteDriverCard from "./DeleteDriverCard"

const MotoristaCard = ({ driver }: {driver: DriverType}) => {
  
  return (
    <div className="relative flex flex-col justify-between gap-5 p-6 bg-white border border-slate-200 transition-all duration-300 hover:border-slate-350 hover:shadow-lg group border-l-4 border-l-[var(--secondary-color)]">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Calendar size={13} className="shrink-0" />
            <span>Admissão: {dateToStringDate(driver.createdAt)}</span>
          </div>
          <h3 className="text-base font-black tracking-tight text-slate-800 uppercase mt-0.5">
            {driver.name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <DeleteDriverCard driverId={driver.id} />
        </div>
      </div>

      <div className="flex flex-col gap-3.5 border-t border-b border-slate-100 py-4 text-[11px] font-bold tracking-wide uppercase">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-slate-50 text-slate-500 rounded-md">
            <Phone size={14} className="shrink-0" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-sans normal-case font-medium">Contato Direto</span>
            <span className="text-sm font-black text-slate-700 font-mono tracking-tight">
              {driver.phone || "NÃO INFORMADO"}
            </span>
          </div>
        </div>

      </div>

      <div className="flex items-center justify-ceenter md:justify-end pt-1">
        <AddMotorista driver={driver} />
      </div>

    </div>
  )
}

export default MotoristaCard;