import { AbastecimentoData } from "@/lib/types"
import AbastecimentosCard from "./AbastecimentosCard"
import { Fuel } from "lucide-react"

interface AbastecimentosListProps {
  items: AbastecimentoData[]
}

const AbastecimentosList = ({ items }: AbastecimentosListProps) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-sm border border-dashed border-slate-300 bg-slate-50 p-14 text-center">
        <Fuel size={28} className="mb-1 text-slate-300" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Nenhum abastecimento registrado</h3>
        <p className="max-w-xs text-xs text-slate-400">Novos lançamentos aparecem aqui assim que forem registrados.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <AbastecimentosCard key={item.id} data={item} />
      ))}
    </div>
  )
}

export default AbastecimentosList