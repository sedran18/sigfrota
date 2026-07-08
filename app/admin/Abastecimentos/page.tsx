import AddRefueling from "@/components/admin/abastecimentos/AddRefueling";
import Filtro from "@/components/admin/abastecimentos/Filtro";
import { camposFiltro } from "@/lib/data/camposFiltro";
import DateCalendarPicker from "@/components/admin/shared/DateCalendarPicker";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Abastecimentos = () => {
  return (
    <div className="w-full flex flex-col">
      <header className="
        w-full 
        bg-white
        border-b border-slate-200 
        px-5 py-5 md:px-8 md:py-6
        flex flex-col gap-5 
        md:flex-row md:items-center md:justify-between
      ">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-lg md:text-xl font-black tracking-wider text-[var(--secondary-color)] uppercase font-sans">
            Abastecimentos
          </h1>
          <p className="text-[11px] md:text-xs font-semibold text-slate-400 uppercase tracking-wide font-sans">
            Lista de todos os abastecimentos registrados
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <DateCalendarPicker />
          <AddRefueling />
        </div>
      </header>

      <div className="
        flex flex-col gap-3 p-4 bg-slate-50 border-b border-slate-200
        sm:flex-row sm:items-center sm:flex-wrap md:px-8
      ">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 flex-1 w-full">
          {camposFiltro.map((c) => (
            <Filtro 
              title={c.title} 
              campos={c.campos} 
              key={c.title.toLowerCase()}
            />
          ))}
        </div>
        
        <Button 
          variant="ghost"
          className="
            h-11 rounded-none border border-slate-300 font-bold text-xs tracking-wider uppercase text-slate-600
            hover:bg-slate-200 hover:text-slate-900 px-4 gap-2 shrink-0 bg-white cursor-pointer transition-all
          "
        >
          <RotateCcw size={14} />
          Resetar
        </Button>
      </div>
    </div>
  )
}

export default Abastecimentos