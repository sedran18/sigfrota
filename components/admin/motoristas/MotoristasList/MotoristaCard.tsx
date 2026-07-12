import { Button } from "@/components/ui/button"
import { dateToStringDate } from "@/lib/utils"
import { DriverType } from "@/schemas/driver.schema"
import { User, X, Phone, Calendar, Edit2, Shield } from "lucide-react"

const MotoristaCard = ({ data }: {data: DriverType}) => {
  return (
    <div className="relative flex flex-col justify-between gap-6 p-6 bg-white  border border-slate-200 transition-all
     rounded-none hover:border-slate-400 hover:shadow-xl group border-l-4 border-l-[var(--secondary-color)]">
          <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-bold  uppercase tracking-wider">
            <Calendar size={14} className="shrink-0" />
            <span>Admissão: {dateToStringDate(data.createdAt)}</span>
          </div>
          <h3 className="text-base font-black  tracking-wide uppercase   mt-0.5">
            {data.name}
          </h3>
          
        </div>
            <Button>
              <X />
            </Button>
        <div className="p-2 bg-slate-100 border border-slate-200  shrink-0">
          <User size={16} />
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-b border-slate-200/80 py-4 text-xs font-bold tracking-wide uppercase ">
        <div className="flex items-center gap-3">
          <Phone size={16} className=" shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px]  font-sans normal-case font-medium">Contato Direto</span>
            <span className="text-sm font-black  font-mono tracking-tight">
              {data.phone || "NÃO INFORMADO"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Shield size={16} className=" shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px]  font-sans normal-case font-medium">Status Operacional</span>
            <span className="text-sm font-black text-emerald-800 tracking-tight">
              Credencial: Ativa
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

export default MotoristaCard