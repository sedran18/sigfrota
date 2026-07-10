import { RotateCcw } from "lucide-react"
import { Button } from "../../ui/button"
import { camposFiltro } from "@/lib/data/camposFiltro";
import Filtro from "./Filtro";

const BasicFilters = () => {
  return (
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
            h-11 rounded-none border border-slate-300 font-bold text-xs tracking-wider uppercase text-slate-900
            hover:bg-slate-200 hover:text-slate-900 px-4 gap-2 shrink-0 bg-white cursor-pointer transition-all
          "
        >
          <RotateCcw size={14} />
          Resetar
        </Button>
      </div>
  )
}

export default BasicFilters
