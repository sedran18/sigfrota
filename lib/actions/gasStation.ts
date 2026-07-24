'use server';

import { CreateGasStationSchema, CreateGasStationType, GasStationIdSchema, GasStationIdType, GasStationType, GasStationWithUsageType, UpdateGasStationSchema, UpdateGasStationType} from "@/schemas/gasStation.schema";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { GasStation} from "../generated/prisma/client";

export const createGasStation = async (item: CreateGasStationType):Promise<ResponseType<string>> => {
        const v = CreateGasStationSchema.safeParse(item);
        if (!v.success) return {success: false, error: v.error.message};
        try {
            await prisma.gasStation.create({data: v.data})
            revalidatePath("/admin/postos")
            return {success: true, data: 'Posto criado com sucesso'};

        } catch (err) {
            console.log(err)
            return {success: false, error: 'Erro ao salvar posto'}
        }
}

// READ

type GasStationWithContracts = GasStation & {
  contracts: Array<{
    id: string; // ou number, dependendo do tipo do ID no seu schema
  }>;
};

export const getGasStations= async (): Promise<ResponseType<GasStationWithUsageType[]>> => {
    try {
    const gasStations:GasStationWithContracts[] = await prisma.gasStation.findMany({
        include: {
            contracts: {
            where: { 
                contractFuels: { 
                some: {
                    fuelingRequests: {
                    some: {}, 
                    },
                },
                },
            },
            take: 1, 
            select: {
                id: true,
            },
            },
        },
    });
        const GasStationsWithUse:GasStationWithUsageType[] = gasStations.map(({contracts, ...GasStation}) => ({
            ...GasStation, 
            isUsed: contracts.length > 0,
        }));

        return {success: true, data: GasStationsWithUse }
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao buscar postos'}
    }
}

// UPDATE (put atualmente, talvez mudar para patch depois)
export const updateGasStation = async (id: GasStationIdType, campos: UpdateGasStationType):Promise<ResponseType<GasStationType>> => {
    const vId = GasStationIdSchema.safeParse(id)
    if (!vId.success) return {success: false, error: vId.error.message}

    const vCampos = UpdateGasStationSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, error: vCampos.error.message}
    const {data} =  vCampos;

    try {
        
        const GasStation = await prisma.gasStation.update({
            where: {
                id: vId.data
            },
            data: {
                ...data
            }
        })

        revalidatePath('/admin/postos')
        return {success: true, data: GasStation};
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao atualizar posto'}
    }
}


export const removeGasStation = async (id: GasStationIdType): Promise<ResponseType<GasStationType>> => {
        const vId = GasStationIdSchema.safeParse(id);
        if (!vId.success) return {success: false, error: vId.error.message}

        try {
            const contract = await prisma.contract.findFirst({
                where: {
                    gasStationId: vId.data,
                    contractFuels: {
                    some: {
                        fuelingRequests: {
                        some: {}
                        }
                    }
                    }
                },
                select: {
                    id: true,
                },
            });

            if (contract) return {success:false, error : 'Não é possível apagar postos já usados no sistema, tente alterar o status'};

            const deleted = await prisma.gasStation.delete({
                where: {
                    id: vId.data,
                }
            })
            revalidatePath('/admin/postos');
            return {success: true, data: deleted}
        } catch (err) {
            console.log(err);
            return {success:false, error:'Erro ao remover posto'}
        }
}
