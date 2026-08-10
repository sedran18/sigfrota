'use server';

import { ResponseType } from "../types";
import prisma from "../prisma";
import { CreateFuelingSchema, CreateFuelingType, FuelingIdSchema, FuelingIdType, FuelingType, GetFuelingType } from "@/schemas/fueling.schema";

export const getFuelings = async ():Promise<ResponseType<GetFuelingType[]>> => {
    try {
        const fuelings = await prisma.fueling.findMany({
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
    console.log('entrou');
    const v = CreateFuelingSchema.safeParse(data);
    if (!v.success) return {success: false, error: v.error.message}
    console.log('tesstando')
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

        const fuelEfficiency = distanceTraveled / totalAmount;
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
