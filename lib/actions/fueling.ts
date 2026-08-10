'use server';

import { ResponseType } from "../types";
import prisma from "../prisma";
import { GetFuelingType } from "@/schemas/fueling.schema";

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

