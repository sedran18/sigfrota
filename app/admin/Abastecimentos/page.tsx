import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import BasicFilters from "@/components/admin/BasicFilters";
import AbastecimentosList from "@/components/admin/abastecimentos/AbastecimentosList";
import { Inbox } from "lucide-react";
import { getFuelings } from "@/lib/actions/fueling";
import { GasStationIdType } from "@/schemas/gasStation.schema";
import { DriverIdType } from "@/schemas/driver.schema";
import { VehicleIdType } from "@/schemas/vehicle.schema";
import { FilterConfig} from "@/lib/types";
import { getGasStationsSelect } from "@/lib/actions/gasStation";
import { getDriversSelect } from "@/lib/actions/driver";
import { getVehiclesSelectByFuelType } from "@/lib/actions/vehicle";
import { FuelTypeSchema } from "@/schemas/enums.schema";
import { FuelType } from "@prisma/client";
import { DateType } from "@/schemas/date.schema";



const Abastecimentos = async ({searchParams,} :{
  searchParams: Promise<{
      gasStationsIds?: GasStationIdType[] | GasStationIdType
      driversIds?: DriverIdType[] | DriverIdType
      vehiclesIds?: VehicleIdType[] | VehicleIdType
      fuelType?: FuelType[] | FuelType,
      to?: DateType,
      from?: DateType,
    }>
}) => {
  const camposFiltro = await searchParams
  
    const [fuelings, postos, motoristas, veiculos] = await Promise.all([
      getFuelings(camposFiltro),
      getGasStationsSelect({ id: true, name: true, active: true}),
      getDriversSelect({ id: true, name: true, active: true}),
      getVehiclesSelectByFuelType({ id: true, brand: true, model: true, plate: true, year: true }),
    ])
  
    const filtersConfig: FilterConfig[] = [
      { title: "Posto", paramName: "gasStationsIds", campos: postos.success ? postos.data : [] },
      { title: "Motorista", paramName: "driversIds", campos: motoristas.success ? motoristas.data : [] },
      { title: "Veículos", paramName: "vehiclesIds", campos: veiculos.success ? veiculos.data : [] },
      { title: "Combustível", paramName: "fuelType", campos: FuelTypeSchema.options },
    ];
  
  return (
    <div className="w-full flex flex-col">
      <HeaderTemplate 
        title="Abastecimentos"
        description="Lista de todos os abastecimentos registrados"
      >
        <DateCalendarPicker />
      </HeaderTemplate>
      
      <BasicFilters filters={filtersConfig} />

      {
        fuelings.success && fuelings.data.length > 0 ?
          <AbastecimentosList data={fuelings.data} />
        :
        <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white border border-slate-200 rounded-none mx-auto my-6 sm:my-8 w-full max-w-xl shadow-none">
          <Inbox size={32} className="text-slate-400 mb-2 sm:mb-3 w-7 h-7 sm:w-8 sm:h-8" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
            Nenhum Abastecimento Realizado
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1 uppercase font-medium">
            Não há registros de abastecimento concluídos no período.
          </p>
        </div>
      }
    
    </div>
  )
}

export default Abastecimentos