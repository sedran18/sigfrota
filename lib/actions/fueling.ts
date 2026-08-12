'use server';

import { ResponseType } from "../types";
import prisma from "../prisma";
import { CreateFuelingSchema, CreateFuelingType, FuelingIdSchema, FuelingIdType, FuelingType, GetFuelingType } from "@/schemas/fueling.schema";
import { GasStationIdType } from "@/schemas/gasStation.schema";
import { DriverIdType } from "@/schemas/driver.schema";
import { VehicleIdType } from "@/schemas/vehicle.schema";
import { Prisma } from "../generated/prisma/client";
import { toArray } from "../utils";
import { FuelType } from "@/schemas/enums.schema";
import { revalidatePath } from "next/cache";
import { DateSchema, DateType } from "@/schemas/date.schema";
import { LineChartItemType } from "@/schemas/dashboard.schema";

export const getFuelings = async ( {
    gasStationsIds,
    driversIds,
    vehiclesIds,
    fuelType,
    to, 
    from
}: {
  gasStationsIds?: GasStationIdType[] | GasStationIdType
  driversIds?: DriverIdType[] | DriverIdType
  vehiclesIds?: VehicleIdType[] | VehicleIdType
  fuelType?: FuelType[] | FuelType,
  from?: DateType,
  to?: DateType,
}):Promise<ResponseType<GetFuelingType[]>> => {
    try {

        const normalizedGasStations = toArray(gasStationsIds);
        const normalizedDrivers = toArray(driversIds);
        const normalizedVehicles = toArray(vehiclesIds);
        const normalizedFuelTypes = toArray(fuelType);
    
        const where: Prisma.FuelingWhereInput = {};
    
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

        if (from  && to) {
            const fromDate = DateSchema.safeParse(from);
            const toDate = DateSchema.safeParse(to);
            if (fromDate.success && toDate.success){
                toDate.data.setHours(23, 59, 59, 999);

                where.createdAt = {
                    gte: fromDate.data,
                    lte: toDate.data
                }
            }
        }
        
        const fuelings = await prisma.fueling.findMany({
            where,
            include: {
                contractFuel: {
                    select: {
                        contract: {
                            select: {
                                gasStation: {
                                    select: {
                                        name: true, 
                                        id: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        const fuelingsAdjusted:GetFuelingType[] = fuelings.map(f => ({
            ...f, 
            liters: f.liters.toNumber(), 
            pricePerLiter: f.pricePerLiter.toNumber(),
            totalAmount: f.totalAmount.toNumber(),
            fuelEfficiency: f.fuelEfficiency.toNumber()
        }))

        return {success: true, data: fuelingsAdjusted}
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao listar abastecimentos'}
    }
}


export const createFueling = async (data: CreateFuelingType): Promise<ResponseType<string>> => {
    const v = CreateFuelingSchema.safeParse(data);
    if (!v.success) return {success: false, error: v.error.message}
    const dados =  v.data;

    try {
        const inherintData = await prisma.fuelingRequest.findUnique({
            where: {
                id: dados.requestId,
            },
            include:{
                contractFuel: {
                    select : {
                        pricePerLiter: true, 
                        litersAvailable: true, 
                    }
                },
            }
        });
        if (!inherintData) return {success: false, error: 'Não foi possível encontrar a solicitação.'};

        // adiantar o erro kkk
        if (inherintData.status === 'COMPLETED') {
            return { success: false, error: 'Esta solicitação já foi finalizada.' };
        };


        const observations = dados.observations ? [dados.observations] : [];
        const litrosSolicitados = inherintData.liters;

        if (litrosSolicitados !== 'FULL' && Number(litrosSolicitados) < dados.liters) {
            observations.push('Abastecimento maior do que o solicitado');
            if (inherintData.contractFuel.litersAvailable.toNumber() < dados.liters){
                observations.push('Abastecimento maior do que o valor no contrato')
            }
        }


        const totalAmount = dados.liters * inherintData.contractFuel.pricePerLiter.toNumber();

        const distanceTraveled = dados.odometer - inherintData.odometer;

        if (distanceTraveled <= 0) return {success: false, error: 'Quilometragem inválida. Precisa ser maior que a quilometragem inicial.'}

        const fuelEfficiency = distanceTraveled / dados.liters;
        console.log(fuelEfficiency)

        if (fuelEfficiency < 8 || fuelEfficiency > 15) observations.push('Consumo anormal de combustível');
        console.log('validação 2');




        const createFueling = {
            vehicleId: inherintData.vehicleId,
            driverId: inherintData.driverId,
            requestId: dados.requestId,
            contractFuelId: inherintData.contractFuelId,
            fuelType: inherintData.fuelType,
            odometer: dados.odometer,
            liters: dados.liters,
            pricePerLiter: inherintData.contractFuel.pricePerLiter,
            totalAmount,
            distanceTraveled,
            fuelEfficiency,
            observations: observations.join('. '),            
        }

        await prisma.$transaction(async (tx) => {
            await tx.fueling.create({
                data: createFueling
            });

            await tx.fuelingRequest.update({
                where:{
                    id: dados.requestId
                }, data :{
                    status: 'COMPLETED'
                }
            });

            await tx.vehicle.update({
                where: {
                    id: inherintData.vehicleId
                },
                data: {
                    currentOdometer: dados.odometer
                }
            });

            await tx.contractFuel.update({
                where: {
                    id: inherintData.contractFuelId
                },
                data: {
                    litersAvailable: { decrement: dados.liters },
                    litersConsumed: { increment: dados.liters },
                }
            })
        });

        console.log('validação 3');
        revalidatePath('/admin/solicitacoes');
        revalidatePath('/admin/abastecimentos');
        return {success: true, data: 'Abastecimento criado com sucesso.'}


    } catch (err) {
        console.log(err);
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return {
                    success: false,
                    error: "Já existe um abastecimento com essa solicitação",
                }
            }
        }
        return {success: false, error: 'Erro ao criar abastecimento.'}
    }
}


export const deleteFueling = async (fId: FuelingIdType): Promise<ResponseType<FuelingType>> => {
    const v = FuelingIdSchema.safeParse(fId);
    if (!v.success) return { success: false, error: v.error.message };

    try {
        const fuelingToDelete = await prisma.fueling.findUnique({
            where: { id: v.data }
        });

        if (!fuelingToDelete) return { success: false, error: 'Abastecimento não encontrado.' };

        const lastFueling = await prisma.fueling.findFirst({
            where: { vehicleId: fuelingToDelete.vehicleId },
            orderBy: { createdAt: 'desc' }
        });

        if (lastFueling?.id !== fuelingToDelete.id) {
            return { 
                success: false, 
                error: 'Não é possível deletar este abastecimento pois existem registros mais recentes para este veículo.' 
            };
        }

        const previousFueling = await prisma.fueling.findFirst({
            where: { 
                vehicleId: fuelingToDelete.vehicleId,
                id: { not: fuelingToDelete.id }
            },
            orderBy: { createdAt: 'desc' }
        });

        const deleted = await prisma.$transaction(async (tx) => {
            // A. Deleta o abastecimento
            const del = await tx.fueling.delete({
                where: { id: v.data }
            });

            await tx.fuelingRequest.update({
                where: { id: fuelingToDelete.requestId },
                data: { status: 'PENDING' } 
            });

            await tx.contractFuel.update({
                where: { id: fuelingToDelete.contractFuelId },
                data: {
                    litersAvailable: { increment: fuelingToDelete.liters },
                    litersConsumed: { decrement: fuelingToDelete.liters }
                }
            });

            const fallbackOdometer = fuelingToDelete.odometer - fuelingToDelete.distanceTraveled;
            const newOdometer = previousFueling ? previousFueling.odometer : fallbackOdometer;

            await tx.vehicle.update({
                where: { id: fuelingToDelete.vehicleId },
                data: { currentOdometer: newOdometer }
            });

            return del;
        });

        revalidatePath('/admin/solicitacoes');
        revalidatePath('/admin/abastecimentos');

        return {
            success: true,
            data: {
                ...deleted,
                liters: deleted.liters.toNumber(),
                pricePerLiter: deleted.pricePerLiter.toNumber(),
                totalAmount: deleted.totalAmount.toNumber(),
                fuelEfficiency: deleted.fuelEfficiency.toNumber()
            }
        };

    } catch (err) {
        console.error(err);
        return { success: false, error: 'Erro ao cancelar abastecimento.' };
    }
};

//sem update, deleta e cria outra se for preciso

export interface RawLineChartItem {
  date: string
  GASOLINA_COMUM: Prisma.Decimal
  GASOLINA_ADITIVADA: Prisma.Decimal
  ETANOL: Prisma.Decimal
  DIESEL_COMUM: Prisma.Decimal
  DIESEL_S10: Prisma.Decimal
}

export const getLineChartData = async (from?: DateType, to?: DateType): Promise<ResponseType<LineChartItemType[]>> => {
    const vFrom = DateSchema.safeParse(from);
    const vTo = DateSchema.safeParse(to);

    const toDate = vTo.success ? vTo.data : new Date();

    const defaultFromDate = new Date(toDate);
    defaultFromDate.setDate(defaultFromDate.getDate() - 30);
    defaultFromDate.setHours(0, 0, 0, 0); 

    const fromDate = vFrom.success ? vFrom.data : defaultFromDate;
    toDate.setHours(23, 59, 59, 999);

    try {
        const result = await prisma.$queryRaw<RawLineChartItem[]>`
            SELECT 
                TO_CHAR("createdAt", 'YYYY-MM-DD') AS "date",
                COALESCE(SUM(CASE WHEN "fuelType" = 'GASOLINA_COMUM' THEN "liters" ELSE 0 END), 0) AS "GASOLINA_COMUM",
                COALESCE(SUM(CASE WHEN "fuelType" = 'GASOLINA_ADITIVADA' THEN "liters" ELSE 0 END), 0) AS "GASOLINA_ADITIVADA",
                COALESCE(SUM(CASE WHEN "fuelType" = 'ETANOL' THEN "liters" ELSE 0 END), 0) AS "ETANOL",
                COALESCE(SUM(CASE WHEN "fuelType" = 'DIESEL_COMUM' THEN "liters" ELSE 0 END), 0) AS "DIESEL_COMUM",
                COALESCE(SUM(CASE WHEN "fuelType" = 'DIESEL_S10' THEN "liters" ELSE 0 END), 0) AS "DIESEL_S10"
            FROM "fuelings"
            WHERE "createdAt" >= ${fromDate} AND "createdAt" <= ${toDate}
            GROUP BY TO_CHAR("createdAt", 'YYYY-MM-DD')
            ORDER BY "date" ASC;
        `;

        const data: LineChartItemType[] = result.map((row) => ({
            date: row.date,
            GASOLINA_COMUM: row.GASOLINA_COMUM.toNumber(),
            GASOLINA_ADITIVADA: row.GASOLINA_ADITIVADA.toNumber(),
            ETANOL: row.ETANOL.toNumber(),
            DIESEL_COMUM: row.DIESEL_COMUM.toNumber(),
            DIESEL_S10: row.DIESEL_S10.toNumber(),
        }));

        return { success: true, data };
    } catch (err) {
        console.error(err);
        return { success: false, error: 'Erro ao buscar dados para o gráfico.' };
    }

}