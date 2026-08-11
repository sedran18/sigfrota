import DateCalendarPicker from "@/components/shared/DateCalendarPicker";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import BasicFilters from "@/components/admin/BasicFilters";
import AbastecimentosList from "@/components/admin/abastecimentos/AbastecimentosList";
import { Fuel } from "lucide-react";
import { getFuelings } from "@/lib/actions/fueling";
import { GasStationIdType } from "@/schemas/gasStation.schema";
import { DriverIdType } from "@/schemas/driver.schema";
import { VehicleIdType } from "@/schemas/vehicle.schema";
import { FilterConfig} from "@/lib/types";
import { getGasStationsSelect } from "@/lib/actions/gasStation";
import { getDriversSelect } from "@/lib/actions/driver";
import { getVehiclesSelectByFuelType } from "@/lib/actions/vehicle";
import { FuelTypeSchema } from "@/schemas/enums.schema";
import { FuelType } from "@/lib/generated/prisma/enums";
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