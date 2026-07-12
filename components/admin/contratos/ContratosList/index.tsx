import { ContractType } from "@/lib/types";
import ContratoCard from "./ContratoCard"


const ContratosList = ({ items }: {items: ContractType[]}) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col m-2 lg:m-10 items-center justify-center text-center p-12 bg-slate-950 border border-slate-800 text-slate-400 rounded-none">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nenhum contrato encontrado</h3>
        <p className="text-xs text-slate-500 mt-1 uppercase">Cadastre novas unidades .</p>
      </div>
    )
  }

  return (
    <div className="grid  grid-cols-1 m-2 lg:m-10 gap-4 w-full m-2 lg:m-10">
      {items.map((Contrato) => (
        <ContratoCard key={Contrato.id} data={Contrato} />
      ))}
    </div>
  )
}

export default ContratosList;