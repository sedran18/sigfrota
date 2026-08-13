import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import FuelConsumptionChartLine from "@/components/admin/dashboard/FuelConsumptionChartLine"; 
import { getLineChartData } from "@/lib/actions/dashboard";
import { DateType } from "@/schemas/date.schema";
import { getDriverFuelData, getFuelEfficiencyByCarData, getKPIData } from "@/lib/actions/dashboard";
import { KPIList } from "@/components/admin/dashboard/KPIList";
import LitersPerDriverChart from "@/components/admin/dashboard/LitersPerDriverChart";
import FuelEfficiencyByCarChart from "@/components/admin/dashboard/FuelEfficiencyByCarChart";

const Admin = async ({ searchParams }: {
  searchParams: Promise<{ from?: DateType, to?: DateType }>
}) => {
  const { from, to } = await searchParams;
  const lineChartData = await getLineChartData(from, to); 
  const kpiData = await getKPIData({ from, to });
  const driverFuelData = await getDriverFuelData({ from, to });
  const fuelEfficiencyByCarData = await getFuelEfficiencyByCarData({ from, to });
  
  return (
    <>
      <HeaderTemplate 
        title="Dashboard"
        description="Visão geral do sistema"
      >
        <DateCalendarPicker />
      </HeaderTemplate>

      <div className="mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 my-6 sm:my-8 flex flex-col gap-6 sm:gap-8">
        
        <KPIList items={kpiData.success ? kpiData.data : []} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          <LitersPerDriverChart data={driverFuelData.success ? driverFuelData.data : []} />
          <FuelEfficiencyByCarChart data={fuelEfficiencyByCarData.success ? fuelEfficiencyByCarData.data : []} />
        </div>

        <div>
          <FuelConsumptionChartLine data={lineChartData.success ? lineChartData.data : []} />  
        </div>

      </div>
    </>
  )
}

export default Admin;