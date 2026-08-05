"use client"

import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Filtro from "./Filtro"
import { useRouter, usePathname } from "next/navigation"
import { FilterConfig } from "@/lib/types"



interface BasicFiltersProps {
  filters: FilterConfig[]
}

const BasicFilters = ({ filters }: BasicFiltersProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleResetAll = () => {
    router.push(pathname) // Limpa toda a query string da URL
  }

  return (
    <div className="flex flex-col gap-3 p-4 bg-slate-50 border-b border-slate-200 sm:flex-row sm:items-center sm:flex-wrap md:px-8">
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

      <Button
        onClick={handleResetAll}
        variant="ghost"
        className="h-11 rounded-none border border-slate-300 font-bold text-xs tracking-wider uppercase text-slate-900 hover:bg-slate-200 hover:text-slate-900 px-4 gap-2 shrink-0 bg-white cursor-pointer transition-all"
      >
        <RotateCcw size={14} />
        Resetar Filtros
      </Button>
    </div>
  )
}

export default BasicFilters