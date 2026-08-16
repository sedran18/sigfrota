import DateCalendarPicker from "@/components/shared/DateCalendarPicker"
import HeaderTemplate from "@/components/admin/HeaderTemplate"
import BasicFilters from "@/components/admin/BasicFilters"
import AddRequest from "@/components/admin/solicitacoes/AddRequest"
import SolicitacaoList from "@/components/admin/solicitacoes/SolicitacaoList"
import { getFuelingRequests } from "@/lib/actions/fuelingRequest"
import { Inbox } from "lucide-react"
import { getGasStationsSelect } from "@/lib/actions/gasStation"
import { getDriversSelect } from "@/lib/actions/driver"
import { FuelTypeSchema,  RequestStatusType } from "@/schemas/enums.schema"
import { FuelingDataProvider } from "@/providers/FuelingDataProvider"
import { DriverIdType } from "@/schemas/driver.schema"
import { VehicleIdType } from "@/schemas/vehicle.schema"
import { GasStationIdType } from "@/schemas/gasStation.schema"
import { getVehiclesSelectByFuelType } from "@/lib/actions/vehicle"
import { FuelType } from "@prisma/client"
import { FilterConfig } from "@/lib/types"
import { DateType } from "@/schemas/date.schema"

const Solicitacoes = async ({
  searchParams,
}: {
  searchParams: Promise<{
    gasStationsIds?: GasStationIdType[] | GasStationIdType
    driversIds?: DriverIdType[] | DriverIdType
    vehiclesIds?: VehicleIdType[] | VehicleIdType
    status?: RequestStatusType[] | RequestStatusType
    fuelType?: FuelType[] | FuelType,
    from?: DateType,
    to?: DateType,
  }>
}) => {
  const camposFiltro = await searchParams

  const [solicitacoes, postos, motoristas, veiculos] = await Promise.all([
    getFuelingRequests(camposFiltro),
    getGasStationsSelect({ id: true, name: true, active: true}),
    getDriversSelect({ id: true, name: true, active: true}),
    getVehiclesSelectByFuelType({ id: true, brand: true, model: true, plate: true, year: true }),
  ])
  const statusOptions = [
    { id: "PENDING", name: "Pendente" },
    { id: "COMPLETED", name: "Concluído" },
  ];

  const filtersConfig: FilterConfig[] = [
    { title: "Posto", paramName: "gasStationsIds", campos: postos.success ? postos.data : [] },
    { title: "Motorista", paramName: "driversIds", campos: motoristas.success ? motoristas.data : [] },
    { title: "Veículos", paramName: "vehiclesIds", campos: veiculos.success ? veiculos.data : [] },
    { title: "Combustível", paramName: "fuelType", campos: FuelTypeSchema.options },
    { title: "Status", paramName: "status", campos: statusOptions },
  ];

  const postosAdjusted = postos.success ? postos.data.filter(p => p.active === true) : [];
  const motoristasAdjusted = motoristas.success ? motoristas.data.filter(m => m.active === true) : [];

  return (
    <FuelingDataProvider
      postos={postosAdjusted}
      motoristas={motoristasAdjusted}
    >
    <HeaderTemplate title="Solicitações" description="Lista de todas as solicitações">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <DateCalendarPicker />
        <AddRequest key="novo" />
      </div>
    </HeaderTemplate>

      <BasicFilters filters={filtersConfig} />

      {solicitacoes.success && solicitacoes.data.length > 0 ? (
        <SolicitacaoList solicitacoes={solicitacoes.data} />
      ) : (
      <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white border border-slate-200 rounded-none mx-auto my-6 sm:my-8 w-full max-w-xl shadow-none">
        <Inbox size={32} className="text-slate-400 mb-2 sm:mb-3 w-7 h-7 sm:w-8 sm:h-8" />
        <h3 className="text-xs sm:text-base font-bold text-slate-900 uppercase tracking-wider">
          Nenhuma Solicitação Encontrada
        </h3>
        <p className="text-[11px] sm:text-xs text-slate-600 mt-1 uppercase font-medium">
          Não há solicitações registradas até o momento.
        </p>
      </div>
      )}
    </FuelingDataProvider>

  )
}

export default Solicitacoes