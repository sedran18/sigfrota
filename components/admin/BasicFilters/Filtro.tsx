"use client"

import { ChevronDown, Filter, RotateCcw, Check } from "lucide-react"
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

    nextSelecionados.forEach((val) => params.append(paramName, val))
    router.push(`${pathname}?${params.toString()}`)
    router.refresh()
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramName)
    router.push(`${pathname}?${params.toString()}`)
  }

  const countExibido = isDefaultAll ? allIds.length : selecionados.length
  const isFiltered = !isDefaultAll

  return (
    <div className="w-full sm:w-auto sm:min-w-[180px] sm:max-w-[280px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={`
            flex w-full items-center justify-between px-3.5 h-10 sm:h-11
            text-[11px] sm:text-xs font-bold uppercase tracking-wider text-left 
            bg-white border text-slate-900 shadow-none
            transition-all duration-150 rounded-none cursor-pointer select-none
            hover:bg-slate-50 hover:border-slate-400
            focus:outline-none focus:ring-1 focus:ring-[#093a1c]
            ${open ? "border-[#093a1c] ring-1 ring-[#093a1c]" : "border-slate-300"}
            ${isFiltered ? "border-[#093a1c] bg-[#093a1c]/5" : ""}
          `}
        >
          <div className="flex items-center gap-2 pr-2 truncate">
            <Filter
              size={13}
              className={`shrink-0 transition-colors ${
                isFiltered ? "text-[#093a1c]" : "text-slate-500"
              }`}
            />
            <span className="truncate">{title}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`
                flex items-center justify-center text-[10px] sm:text-[11px] px-1.5 py-0.5 font-extrabold min-w-[20px]
                ${
                  isFiltered
                    ? "bg-[#093a1c] text-white"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }
              `}
            >
              {countExibido}
            </span>
            <ChevronDown
              size={13}
              className={`text-slate-500 shrink-0 transition-transform duration-200 ${
                open ? "rotate-180 text-[#093a1c]" : ""
              }`}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="w-[calc(100vw-32px)] sm:w-72 p-0 rounded-none border border-slate-300 shadow-lg bg-white text-slate-900 z-50"
          align="start"
          sideOffset={4}
        >
          <div className="px-3.5 py-2.5 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">
              Filtrar por {title}
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase">
              {countExibido} de {allIds.length} selecionados
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto p-1 flex flex-col gap-0.5 bg-white">
            {campos.map((c) => {
              const { id, label } = getItemData(c)
              const isChecked = selecionados.includes(id)

              return (
                <label
                  key={id}
                  className={`
                    flex items-center gap-3 px-3 py-2 text-xs font-semibold cursor-pointer transition-all border border-transparent select-none
                    ${
                      isChecked
                        ? "bg-[#093a1c]/10 text-[#093a1c] font-bold"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `}
                >
                  <div className="relative flex items-center justify-center shrink-0">
                    <input
                      type="checkbox"
                      id={id}
                      checked={isChecked}
                      onChange={() => handleToggle(id)}
                      className="peer appearance-none h-4 w-4 border border-slate-400 bg-white checked:bg-[#093a1c] checked:border-[#093a1c] cursor-pointer rounded-none transition-all"
                    />
                    <Check
                      size={11}
                      strokeWidth={3}
                      className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                    />
                  </div>
                  <span className="tracking-wide uppercase text-[11px] truncate">
                    {label}
                  </span>
                </label>
              )
            })}
          </div>

          {!isDefaultAll && (
            <div className="p-2 border-t border-slate-200 flex justify-end bg-slate-50">
              <button
                onClick={handleClear}
                className="text-[10px] font-bold uppercase text-red-700 hover:text-red-800 hover:bg-red-50 px-2.5 py-1.5 transition-all cursor-pointer flex items-center gap-1.5 border border-transparent hover:border-red-200"
              >
                <RotateCcw size={11} />
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