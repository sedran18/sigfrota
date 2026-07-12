import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import BasicFilters from "@/components/admin/BasicFilters";
import AbastecimentosList from "@/components/admin/abastecimentos/AbastecimentosList";
import { fuelingsData } from "@/lib/data/fuelings";



const Abastecimentos = () => {
  return (
    <div className="w-full flex flex-col">
      <HeaderTemplate 
        title="Abastecimentos"
        description="Lista de todos os abastecimentos registrados"
      >
        <DateCalendarPicker />
      </HeaderTemplate>
      
      <BasicFilters />
      <div className="m-2 lg:m-10">
        <AbastecimentosList items={ fuelingsData} />
      </div>
    </div>
  )
}

export default Abastecimentos