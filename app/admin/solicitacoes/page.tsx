import DateCalendarPicker from "@/components/shared/DateCalendarPicker"
import HeaderTemplate from "@/components/admin/HeaderTemplate"
import BasicFilters from "@/components/admin/BasicFilters"
import AddRequest from "@/components/admin/solicitacoes/AddRequest"
import SolicitacaoList from "@/components/admin/solicitacoes/SolicitacaoList"
import { getFuelingRequests } from "@/lib/actions/fuelingRequest"
import { FuelIcon } from "lucide-react"
import { getGasStationsSelect } from "@/lib/actions/gasStation"
import { getDriversSelect } from "@/lib/actions/driver"
import { FuelTypeSchema, RequestStatusSchema, RequestStatusType } from "@/schemas/enums.schema"
import { FuelingDataProvider } from "@/providers/FuelingDataProvider"
import { DriverIdType } from "@/schemas/driver.schema"
import { VehicleIdType } from "@/schemas/vehicle.schema"
import { GasStationIdType } from "@/schemas/gasStation.schema"
import { getVehiclesSelectByFuelType } from "@/lib/actions/vehicle"
import { FuelType } from "@/lib/generated/prisma/enums"
import { FilterConfig } from "@/lib/types"

const Solicitacoes = async ({
  searchParams,
}: {
  searchParams: Promise<{
    gasStationsIds?: GasStationIdType[] | GasStationIdType
    driversIds?: DriverIdType[] | DriverIdType
    vehiclesIds?: VehicleIdType[] | VehicleIdType
    status?: RequestStatusType[] | RequestStatusType
    fuelType?: FuelType[] | FuelType
  }>
}) => {
  const camposFiltro = await searchParams

  const [solicitacoes, postos, motoristas, veiculos] = await Promise.all([
    getFuelingRequests(camposFiltro),
    getGasStationsSelect({ id: true, name: true }),
    getDriversSelect({ id: true, name: true }),
    getVehiclesSelectByFuelType({ id: true, brand: true, model: true, plate: true, year: true }),
  ])

  const filtersConfig: FilterConfig[] = [
    { title: "Posto", paramName: "gasStationsIds", campos: postos.success ? postos.data : [] },
    { title: "Motorista", paramName: "driversIds", campos: motoristas.success ? motoristas.data : [] },
    { title: "Veículos", paramName: "vehiclesIds", campos: veiculos.success ? veiculos.data : [] },
    { title: "Combustível", paramName: "fuelType", campos: FuelTypeSchema.options },
    { title: "Status", paramName: "status", campos: RequestStatusSchema.options },
  ]

  return (
    <FuelingDataProvider
      postos={postos.success ? postos.data : []}
      motoristas={motoristas.success ? motoristas.data : []}
    >
      <HeaderTemplate title="Solicitações" description="Lista de todas as solicitações">
        <DateCalendarPicker />
        <AddRequest key="novo" />
      </HeaderTemplate>

      {/* Renderiza os filtros reutilizáveis */}
      <BasicFilters filters={filtersConfig} />

      {solicitacoes.success && solicitacoes.data.length > 0 ? (
        <SolicitacaoList solicitacoes={solicitacoes.data} />
      ) : (
        <div className="flex m-2 lg:m-10 flex-col items-center justify-center text-center p-12 bg-slate-50 border border-slate-200 rounded-none">
          <FuelIcon size={32} className="text-slate-400 mb-2.5" />
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Nenhuma solicitação de abastecimento
          </h3>
        </div>
      )}
    </FuelingDataProvider>
  )
}

export default Solicitacoes