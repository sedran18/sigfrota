import { GasStationType } from "@/lib/types"
import PostoCard from "./PostoCard"
import { Building2 } from "lucide-react"


const PostosList = ({ items }: {items: GasStationType[]}) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex m-2 lg:m-10 flex-col items-center justify-center text-center p-12 bg-slate-50 border border-slate-200 rounded-none">
        <Building2 size={32} className="text-slate-400 mb-2.5" />
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nenhum posto credenciado</h3>
        <p className="text-xs text-slate-400 mt-1">Cadastre os postos de combustível parceiros para exibir aqui.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 w-full m-2 lg:m-10">
      {items.map((posto) => (
        <PostoCard key={posto.id} data={posto} />
      ))}
    </div>
  )
}

export default PostosList