"use client"

import { Fuel } from "lucide-react"
import VeiculoCard, { VeiculoData } from "./VeiuloCard"



interface VeiculosListProps {
  items: VeiculoData[]
}

const VeiculosList = ({ items }: VeiculosListProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-950 border border-slate-800 text-slate-400 rounded-none">
        <Fuel size={32} className="text-slate-600 mb-2.5" />
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nenhum veículo na frota</h3>
        <p className="text-xs text-slate-500 mt-1 uppercase">Cadastre novas unidades operacionais no painel.</p>
      </div>
    )
  }

  return (
    <div className="grid  grid-cols-1 gap-4 w-full">
      {items.map((veiculo) => (
        <VeiculoCard key={veiculo.id} data={veiculo} />
      ))}
    </div>
  )
}

export default VeiculosList