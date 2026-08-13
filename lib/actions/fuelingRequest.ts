'use server';
import { CreateFuelingRequestSchema, CreateFuelingRequestType, FuelingRequestIdSchema, FuelingRequestIdType, FuelingRequestType, GetFuelingRequestType } from "@/schemas/fuelingRequest.schema";
import prisma from "../prisma";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";
import { FuelType, RequestStatusType } from "@/schemas/enums.schema";
import { getContractFuelByGasStationAndFuelType } from "./contract";
import { GasStationIdType } from "@/schemas/gasStation.schema";
import { DriverIdType } from "@/schemas/driver.schema";
import { VehicleIdType } from "@/schemas/vehicle.schema";
import { Prisma } from "../generated/prisma/client";
import { toArray } from "../utils";
import { DateSchema, DateType } from "@/schemas/date.schema";

export const getFuelingRequests = async ({
  gasStationsIds,
  driversIds,
  vehiclesIds,
  status,
  fuelType,
  from,
  to
}: {
  gasStationsIds?: GasStationIdType[] | GasStationIdType
  driversIds?: DriverIdType[] | DriverIdType
  vehiclesIds?: VehicleIdType[] | VehicleIdType
  status?: RequestStatusType[] | RequestStatusType
  fuelType?: FuelType[] | FuelType,
  from?: DateType,
  to?: DateType,
}): Promise<ResponseType<GetFuelingRequestType[]>> => {

  try {
    const normalizedGasStations = toArray(gasStationsIds);
    const normalizedDrivers = toArray(driversIds);
    const normalizedVehicles = toArray(vehiclesIds);
    const normalizedStatus = toArray(status);
    const normalizedFuelTypes = toArray(fuelType);

    const where: Prisma.FuelingRequestWhereInput = {};

    if (normalizedStatus?.length) {
      where.status = { in: normalizedStatus };
    }

    if (normalizedDrivers?.length) {
      where.driverId = { in: normalizedDrivers };
    }

    if (normalizedVehicles?.length) {
      where.vehicleId = { in: normalizedVehicles };
    }

    if (normalizedGasStations?.length) {
      where.contractFuel = {
        contract: {
          gasStationId: { in: normalizedGasStations },
        },
      };
    }

    if (normalizedFuelTypes?.length) {
      where.fuelType = { in: normalizedFuelTypes };
    }

    const vFrom = DateSchema.safeParse(from);
    const vTo = DateSchema.safeParse(to);
    
    const toDate = vTo.success ? vTo.data : new Date();
    
    const defaultFromDate = new Date(toDate);
    defaultFromDate.setDate(defaultFromDate.getDate() - 30);
    defaultFromDate.setHours(0, 0, 0, 0); 
    
    const fromDate = vFrom.success ? vFrom.data : defaultFromDate;
    toDate.setHours(23, 59, 59, 999);
        
    where.createdAt = {
      gte: fromDate,
      lte: toDate,
    }

    const requests = await prisma.fuelingRequest.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        driver: {
          select: {
            name: true,
            id: true,
          },
        },
        vehicle: {
          select: {
            brand: true,
            model: true,
            year: true,
            plate: true,
          },
        },
        contractFuel: {
          select: {
            contract: {
              select: {
                gasStation: {
                  select: {
                    name: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const requestsAdjusted = requests.map((req) => ({
      ...req,
      liters: req.liters === 'FULL' ? ('FULL' as const) : Number(req.liters),
    }));

    return { success: true, data:  requestsAdjusted};
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Erro ao listar solicitações' };
  }
};

export const createFuelingRequest = async (
    data: CreateFuelingRequestType,
):Promise<ResponseType<string>> => {
    const v = CreateFuelingRequestSchema.safeParse(data);
    if (!v.success) return {success: false, error: v.error.message}

    const {gasStationId, ...dados} = v.data;

    try {
        const contractFuelId = await getContractFuelByGasStationAndFuelType({gasStationId: gasStationId, fuelType: dados.fuelType});
        if (!contractFuelId.success) return {success:false, error: contractFuelId.error}

        const vehicle = await prisma.vehicle.findUnique({
          select: {currentOdometer: true, tankCapacity: true},
          where: {id:dados.vehicleId}
        });        
        
        if (!vehicle?.currentOdometer) return {success:false, error: 'Não foi possível encontrar veículo'};

        if (dados.liters === 'FULL' && !vehicle.tankCapacity) {
          return { success: false, error: 'O veículo não possui a capacidade do tanque cadastrada.' };
        }

        const litersNum = dados.liters === 'FULL' ? vehicle.tankCapacity.toNumber() : Number(dados.liters);

        const litersAvailable = contractFuelId.data.litersAvailable;
        if (litersNum > litersAvailable) return {success:false, error: `Não há combustível disponível para esse abastecimento. Combustível restante ${litersAvailable}`}

        const odometer = v.data.odometer ?? vehicle.currentOdometer;

        if (odometer < vehicle.currentOdometer) {
          return {
            success: false,
            error: `O odômetro não pode ser menor que o atual (${vehicle.currentOdometer} km).`,
          };
        }
        
        await prisma.fuelingRequest.create({
            data: {
                ...dados, 
                odometer, 
                liters: String(dados.liters), 
                status: 'PENDING', 
                contractFuelId: 
                contractFuelId.data.id
            }
        });
        revalidatePath('/admin/solicitacoes');
        return {success:true, data: 'Solicitação criada com sucesso'};

    } catch (err) {
        console.error(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          //Violou o unique constraint
          if (err.code === "P2002") {
            return {
              success: false,
              error: "Este veículo já possui uma solicitação de abastecimento pendente.",
            }
          }
        }

        return {success: false, error: 'Erro ao criar solicitação'}
    }
}

export const deleteFuelingRequest = async (id: FuelingRequestIdType): Promise<ResponseType<FuelingRequestType>> => {
    const v = FuelingRequestIdSchema.safeParse(id);
    if (!v.success) return {success: false, error: v.error.message}
    try {
        const deleted = await prisma.fuelingRequest.delete({
            where: {
                id: v.data,
            }
        });
        revalidatePath('/admin/solicitacoes');
        return {success: true, data: {...deleted, liters: deleted.liters === 'FULL' ? 'FULL' as const : Number(deleted.liters)}};

    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao deletar solicitação de abastecimento!'}
    }
}
// km inicial tem que ser maior que o km anteriro do carro
// verificar os fuelings depois
export const updateFuelingRequest = async (
  id: FuelingRequestIdType,
  campos: CreateFuelingRequestType
): Promise<ResponseType<string>> => {
  const vId = FuelingRequestIdSchema.safeParse(id);
  if (!vId.success) return { success: false, error: vId.error.message };

  const vCampos = CreateFuelingRequestSchema.safeParse(campos);
  if (!vCampos.success) return { success: false, error: vCampos.error.message };

  const { gasStationId, ...dados } = vCampos.data;

  try {
    // 1. Otimização: Busca em paralelo contrato e veículo
    const [contractFuelRes, vehicle] = await Promise.all([
      getContractFuelByGasStationAndFuelType({
        gasStationId,
        fuelType: dados.fuelType,
      }),
      prisma.vehicle.findUnique({
        where: { id: dados.vehicleId },
        select: { currentOdometer: true, tankCapacity: true },
      }),
    ]);

    if (!contractFuelRes.success) return { success: false, error: contractFuelRes.error };
    if (!vehicle?.currentOdometer) {
      return { success: false, error: "Não foi possível encontrar o veículo ou seu odômetro." };
    }

    if (dados.liters === "FULL" && !vehicle.tankCapacity) {
      return { success: false, error: "O veículo não possui a capacidade do tanque cadastrada." };
    }

    const litersNum = dados.liters === "FULL" 
      ? vehicle.tankCapacity.toNumber() 
      : Number(dados.liters);

    const litersAvailable = contractFuelRes.data.litersAvailable;
    if (litersNum > litersAvailable) {
      return {
        success: false,
        error: `Não há combustível disponível para esse abastecimento. Combustível restante ${litersAvailable}L`,
      };
    }

    const odometer = vCampos.data.odometer ?? vehicle.currentOdometer;
    if (odometer < vehicle.currentOdometer) {
      return {
        success: false,
        error: `O odômetro não pode ser menor que o atual (${vehicle.currentOdometer} km).`,
      };
    }

    await prisma.fuelingRequest.update({
      where: {
        id: vId.data,
        status: "PENDING",
        fuelings: {
          none: {}
        }
      },
      data: {
        ...dados,
        odometer,
        liters: String(dados.liters),
        contractFuelId: contractFuelRes.data.id,
      },
    });

    revalidatePath("/admin/solicitacoes");
    return { success: true, data: "Solicitação atualizada com sucesso!" };

  } catch (err) {
    console.error(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return {
          success: false,
          error: "Não foi possível atualizar: a solicitação não existe, não está pendente ou já possui um abastecimento vinculado.",
        };
      }
      
      if (err.code === "P2002") {
        return {
          success: false,
          error: "O veículo selecionado já possui outra solicitação pendente.",
        };
      }
    }

    return { success: false, error: "Erro ao atualizar solicitação." };
  }
};