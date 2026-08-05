"use client"

import { ChevronDown, Filter, RotateCcw } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { OptionType } from "@/lib/types"

interface FiltroProps<T extends OptionType> {
  title: string
  paramName: string
  campos: T[]
}

const Filtro = <T extends OptionType>({ title, paramName, campos }: FiltroProps<T>) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [open, setOpen] = useState(false)

  const allIds = campos.map((c) => (typeof c === "string" ? c : c.id))

  const urlParams = searchParams.getAll(paramName)

  const isDefaultAll = !searchParams.has(paramName)
  const selecionados = isDefaultAll ? allIds : urlParams

  const getItemData = (item: T) => {
    if (typeof item === "string") {
      return { id: item, label: item.includes("_") ? item.replace(/_/g, " ") : item }
    }

    const veiculo = item as unknown as {
      id: string
      name?: string
      brand?: string
      model?: string
      plate?: string
      year?: number
    }

    if (veiculo.brand && veiculo.model) {
      const infos = [
        `${veiculo.brand} ${veiculo.model}`,
        veiculo.plate,
        veiculo.year,
      ]
        .filter(Boolean)
        .join(" - ")

      return {
        id: veiculo.id,
        label: infos,
      }
    }

    return {
      id: veiculo.id,
      label: veiculo.name ?? "Sem identificação",
    }
  }

  const handleToggle = (id: string) => {
    let nextSelecionados: string[]

    if (selecionados.includes(id)) {
      nextSelecionados = selecionados.filter((item) => item !== id)
    } else {
      nextSelecionados = [...selecionados, id]
    }

    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramName)

    if (nextSelecionados.length === allIds.length || nextSelecionados.length === 0) {
      router.push(`${pathname}?${params.toString()}`)
      return
    }

    // Caso contrário, injeta os selecionados na URL
    nextSelecionados.forEach((val) => params.append(paramName, val))
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramName)
    router.push(`${pathname}?${params.toString()}`)
  }

  const countExibido = isDefaultAll ? allIds.length : selecionados.length

  return (
    <div className="w-full md:w-auto md:min-w-[160px] max-w-[240px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={`
            flex w-full items-center justify-between px-3.5 h-11 
            text-xs font-bold uppercase tracking-wide text-left 
            bg-slate-900 border border-slate-800 text-slate-200 
            transition-all duration-150 rounded-none cursor-pointer select-none
            hover:bg-slate-800 hover:text-white hover:border-slate-700
            focus:ring-1 focus:ring-emerald-800 focus:border-emerald-800
            ${open ? "border-emerald-800 ring-1 ring-emerald-800" : ""}
            ${countExibido > 0 ? "border-emerald-800/60 text-white" : ""}
          `}
        >
          <div className="flex items-center gap-2.5 pr-2">
            <Filter
              size={14}
              className={`transition-colors shrink-0 ${
                countExibido > 0 ? "text-emerald-400" : "text-slate-400"
              }`}
            />
            <span>{title}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center justify-center bg-emerald-800 text-emerald-300 text-[12px] px-1.5 py-0.5 font-bold">
              {countExibido}
            </span>
            <ChevronDown
              size={14}
              className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-60 p-0 rounded-none border border-slate-800 shadow-2xl bg-slate-950 text-slate-200"
          align="start"
          sideOffset={4}
        >
          <div className="p-3 border-b border-slate-900 bg-slate-900/50 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Filtrar por {title}
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto p-1 flex flex-col gap-0.5 bg-slate-950">
            {campos.map((c) => {
              const { id, label } = getItemData(c)
              const isChecked = selecionados.includes(id)

              return (
                <label
                  key={id}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 text-xs font-semibold cursor-pointer transition-all border border-transparent
                    ${
                      isChecked
                        ? "bg-[#093a1c]/20 text-emerald-400 border-[#093a1c]/30 font-bold"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={() => handleToggle(id)}
                    className="h-4 w-4 accent-[#093a1c] cursor-pointer bg-slate-800 border-slate-700"
                  />
                  <span className="select-none tracking-wide">{label}</span>
                </label>
              )
            })}
          </div>

          {!isDefaultAll && (
            <div className="p-1.5 border-t border-slate-900 flex justify-end bg-slate-900/30">
              <button
                onClick={handleClear}
                className="text-[10px] font-bold uppercase text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 px-2 py-1.5 transition-all cursor-pointer flex items-center gap-1"
              >
                <RotateCcw size={10} />
                Restaurar Padrão
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Filtro