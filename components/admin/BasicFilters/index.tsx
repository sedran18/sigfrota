"use client"

import { RotateCcw, FilterX } from "lucide-react"
import { Button } from "@/components/ui/button"
import Filtro from "./Filtro"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { FilterConfig } from "@/lib/types"

interface BasicFiltersProps {
  filters: FilterConfig[]
}

const BasicFilters = ({ filters }: BasicFiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const hasActiveFilters = searchParams.toString().length > 0

  const handleResetAll = () => {
    router.push(pathname)
  }

  return (
    <div className="flex flex-col gap-3 p-3.5 sm:p-4 bg-white border-b border-slate-200 sm:flex-row sm:items-center sm:flex-wrap md:px-6">
      
      <div className="hidden lg:flex items-center  gap-2 pr-2 border-r border-slate-300 shrink-0">
        <FilterX size={14} className="text-slate-600" />
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
          Filtros de Busca
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 flex-1 w-full">
        {filters.map((f) => (
          <Filtro
            key={f.paramName}
            title={f.title}
            paramName={f.paramName}
            campos={f.campos}
          />
        ))}
      </div>

      {hasActiveFilters && (
        <Button
          onClick={handleResetAll}
          variant="outline"
          className="h-10 sm:h-11 rounded-none border border-slate-300 font-bold text-[10px] sm:text-xs tracking-wider uppercase text-slate-800 hover:bg-slate-200 hover:text-slate-900 px-4 gap-2 shrink-0 bg-white cursor-pointer transition-all shadow-none w-full sm:w-auto"
        >
          <RotateCcw size={13} />
          Limpar Filtros
        </Button>
      )}
    </div>
  )
}

export default BasicFilters