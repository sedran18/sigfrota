"use client"

import MotoristaCard, { MotoristaData } from "./MotoristaCard"


interface MotoristasListProps {
  items: MotoristaData[]
}

const MotoristasList = ({ items }: MotoristasListProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-950 border border-slate-800 text-slate-400 rounded-none">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nenhum contrato encontrado</h3>
        <p className="text-xs text-slate-500 mt-1 uppercase">Cadastre novas unidades .</p>
      </div>
    )
  }

  return (
    <div className="grid  grid-cols-1 gap-4 w-full">
      {items.map((Contrato) => (
        <MotoristaCard key={Contrato.id} data={Contrato} />
      ))}
    </div>
  )
}

export default MotoristasList;