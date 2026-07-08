"use client"

import * as React from "react"
import { ChevronDown, Filter, RotateCcw } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface FiltroProps {
  title: string
  campos: string[]
}

const Filtro = ({ title, campos }: FiltroProps) => {
  const [open, setOpen] = React.useState(false)
  const [selecionados, setSelecionados] = React.useState<string[]>(campos.map(c => c.toLowerCase()))

  const handleToggle = (valor: string) => {
    setSelecionados((prev) =>
      prev.includes(valor) 
        ? prev.filter((item) => item !== valor) 
        : [...prev, valor]
    )
  }

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
            ${selecionados.length > 0 ? "border-emerald-800/60 text-white" : ""}
          `}
        >
          <div className="flex items-center gap-2.5 truncate pr-2">
            <Filter 
              size={14} 
              className={`transition-colors shrink-0 ${selecionados.length > 0 ? "text-emerald-400" : "text-slate-400"}`} 
            />
            <span className="truncate">{title}</span>
          </div>
          
          <div className="flex items-center gap-1.5 shrink-0">
            {selecionados.length > 0 && (
              <span className="flex items-center justify-center bg-emerald-800 text-emerald-300 font-mono text-[10px] px-1.5 py-0.5 font-bold">
                {selecionados.length}
              </span>
            )}
            <ChevronDown 
              size={14} 
              className={`text-slate-400 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} 
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
              const valor = c.toLowerCase()
              const isChecked = selecionados.includes(valor)

              return (
                <label
                  key={valor}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 text-xs font-semibold cursor-pointer transition-all border border-transparent
                    ${isChecked 
                      ? "bg-[#093a1c]/20 text-emerald-400 border-[#093a1c]/30 font-bold" 
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }
                  `}
                >
                  <input
                    type="checkbox"
                    id={valor}
                    checked={isChecked}
                    onChange={() => handleToggle(valor)}
                    className="h-4 w-4 accent-[#093a1c] cursor-pointer bg-slate-800 border-slate-700"
                  />
                  <span className="truncate select-none tracking-wide">{c}</span>
                </label>
              )
            })}
          </div>

          {selecionados.length > 0 && (
            <div className="p-1.5 border-t border-slate-900 flex justify-end bg-slate-900/30">
              <button
                onClick={() => setSelecionados([])}
                className="text-[10px] font-bold uppercase text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 px-2 py-1.5 transition-all cursor-pointer flex items-center gap-1"
              >
                <RotateCcw size={10} />
                Limpar Filtro
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Filtro