import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
// import BasicFilters from "@/components/admin/BasicFilters";
import AbastecimentosList from "@/components/admin/abastecimentos/AbastecimentosList";
import { Fuel } from "lucide-react";
import { getFuelings } from "@/lib/actions/fueling";



const Abastecimentos = async () => {
  const fuelings = await getFuelings()
  
  return (
    <div className="w-full flex flex-col">
      <HeaderTemplate 
        title="Abastecimentos"
        description="Lista de todos os abastecimentos registrados"
      >
        <DateCalendarPicker />
      </HeaderTemplate>
      
      {/* <BasicFilters /> */}

      {
        fuelings.success && fuelings.data.length > 0 ?
          <AbastecimentosList data={fuelings.data} />
        :
          <div className="flex m-2 lg:m-10 flex-col gasStations-center justify-center text-center p-12 bg-slate-50 border border-slate-200 rounded-none">
            <Fuel size={28} className="mb-1 text-slate-300" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Nenhum abastecimento registrado</h3>
            <p className="max-w-xs text-xs text-slate-400">Novos lançamentos aparecem aqui assim que forem registrados.</p>
          </div>
      }
    
    </div>
  )
}

export default Abastecimentos