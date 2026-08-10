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

export const getFuelings = async ( {
    gasStationsIds,
    driversIds,
    vehiclesIds,
    fuelType
}: {
  gasStationsIds?: GasStationIdType[] | GasStationIdType
  driversIds?: DriverIdType[] | DriverIdType
  vehiclesIds?: VehicleIdType[] | VehicleIdType
  fuelType?: FuelType[] | FuelType
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
            select:{
                contractFuel: {
                    select : {
                        pricePerLiter: true, 
                        litersAvailable: true, 
                    }
                },
                vehicleId: true,
                driverId: true,
                contractFuelId: true,
                fuelType: true,
                odometer: true,
                liters: true,
            }
        });
        console.log('validação 1');
        // let observations = dados.observations ?? '';
        let observations = dados.observations;

        if (!inherintData) return {success: false, error: 'Não foi possível encontrar a solicitação.'};

        const litrosSolicitados = inherintData.liters;

        if (litrosSolicitados !== 'FULL' && Number(litrosSolicitados) < dados.liters) {
            observations += '. Abastecimento maior do que o solicitado';
            if (inherintData.contractFuel.litersAvailable.toNumber() < dados.liters){
                observations += '. Abastecimento maior do que o valor no contrato.'
            }
        }


        const totalAmount = dados.liters * inherintData.contractFuel.pricePerLiter.toNumber();

        const distanceTraveled = dados.odometer - inherintData.odometer;

        if (distanceTraveled <= 0) return {success: false, error: 'Quilometragem inválida. Precisa ser maior que a quilometragem inicial.'}

        const fuelEfficiency = distanceTraveled / dados.liters;
        console.log(fuelEfficiency)

        if (fuelEfficiency < 8 || fuelEfficiency > 15) observations += '. Consumo anormal de combustível.';
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
            observations,            
        }

        await prisma.fueling.create({
            data: createFueling
        })
        console.log('validação 3');
        return {success: true, data: 'Abastecimento criado com sucesso.'}


    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao criar abastecimento.'}
    }
}


export const deleteFueling = async (fId: FuelingIdType): Promise<ResponseType<FuelingType>> => {
    const v = FuelingIdSchema.safeParse(fId);
    if (!v.success) return {success: false, error: v.error.message}

    try {
        const deleted = await prisma.fueling.delete({
            where: {
                id: v.data
            }
        });

        if (!deleted) return {success: false, error: ''}

        return {success: true, data: {
            ...deleted, 
            liters: deleted.liters.toNumber(), 
            pricePerLiter: deleted.pricePerLiter.toNumber(),
            totalAmount: deleted.totalAmount.toNumber(),
            fuelEfficiency: deleted.fuelEfficiency.toNumber()
        }}  
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao deletar abastecimento.'}
    }
}