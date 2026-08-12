import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import FuelConsumptionChartLine from "@/components/admin/dashboard/FuelConsumptionChartLine";  
import { getLineChartData } from "@/lib/actions/dashboard";
import { DateType } from "@/schemas/date.schema";
import { getDriverFuelData, getFuelEfficiencyByCarData, getKPIData } from "@/lib/actions/dashboard";
import { KPIList } from "@/components/admin/dashboard/KPIList";
import LitersPerDriver from "@/components/admin/dashboard/LitersPerDriver";
import FuelEfficiencyByCarChart from "@/components/admin/dashboard/FuelEfficiencyByCarChart";

const Admin = async ({searchParams}: {
  searchParams: Promise< { from?: DateType, to?: DateType } >
}) => {
  const { from, to } = await searchParams;
  const lineChartData = await getLineChartData(from, to); 
  const kpiData = await getKPIData({from, to});
  const driverFuelData = await getDriverFuelData({from, to});
  const fuelEfficiencyByCarData = await getFuelEfficiencyByCarData({from, to});
  
  return (
    <>
      <HeaderTemplate 
        title="Dashboard"
        description="Visão geral do sistema"
      >
        <DateCalendarPicker />
      </HeaderTemplate>
      <div className="mx-auto w-full max-w-7xl px-4  my-10 sm:px-6 lg:px-8">
        <KPIList items={kpiData.success ? kpiData.data : []} />
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 my-20  sm:px-6 lg:px-8">
        <LitersPerDriver data={driverFuelData.success ? driverFuelData.data : []} />
        <FuelEfficiencyByCarChart data={fuelEfficiencyByCarData.success ? fuelEfficiencyByCarData.data : []} />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4  sm:px-6 lg:px-8">
        <FuelConsumptionChartLine data={lineChartData.success ? lineChartData.data : []} />  
      </div>
    </>
  )
}

export default Admin;