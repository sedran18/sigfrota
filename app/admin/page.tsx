import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import FuelConsumptionChartLine from "@/components/admin/dashboard/FuelConsumptionChartLine";  
import { getLineChartData } from "@/lib/actions/fueling";
import { DateType } from "@/schemas/date.schema";

const Admin = async ({searchParams}: {
  searchParams: Promise< { from?: DateType, to?: DateType } >
}) => {
  const { from, to } = await searchParams;
  const lineChartData = await getLineChartData(from, to); 

  return (
    <>
      <HeaderTemplate 
        title="Dashboard"
        description="Visão geral do sistema"
      >
        <DateCalendarPicker />
      </HeaderTemplate>
      
      <div className="mx-auto w-full max-w-7xl px-4 h-30 sm:px-6 lg:px-8">
        <FuelConsumptionChartLine data={lineChartData.success ? lineChartData.data : []} />  
      </div>
    </>
  )
}

export default Admin;