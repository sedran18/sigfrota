'use server';
import { CreateFuelingRequestSchema, CreateFuelingRequestType, FuelingRequestIdSchema, FuelingRequestIdType, FuelingRequestType, GetFuelingRequestType } from "@/schemas/fuelingRequest.schema";
import prisma from "../prisma";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";
import { RequesStatusType } from "@/schemas/enums.schema";
import { getContractFuelByGasStationAndFuelType } from "./contract";

export const getFuelingRequests = async (status: RequesStatusType): Promise<ResponseType<GetFuelingRequestType[]>> => {
    try {
        // const requests = await prisma.fuelingRequest.findMany({
        //     where: {
        //         status,
        //     }
        // });
        const requests = await prisma.fuelingRequest.findMany({
            where: {
                status,
            }, 
            include: {
                driver: {
                    select: {
                        name: true, 
                        id: true,
                    }
                },
                vehicle: {
                    select: {
                        brand: true, 
                        model: true,
                        year: true, 
                        plate: true,
                    }
                },
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
        const requestsAdjusted = requests.map(req => ({...req, liters: req.liters === 'FULL' ? 'FULL' as const : Number(req.liters)}));
        return {success: true, data: requestsAdjusted}
    } catch (err) {
        console.error(err);
        return {success: false, error: 'Erro ao listar solicitações'}
    }
}

export const createFuelingRequest = async (
    data: CreateFuelingRequestType,
):Promise<ResponseType<string>> => {
    const v = CreateFuelingRequestSchema.safeParse(data);
    if (!v.success) return {success: false, error: v.error.message}

    const {gasStationId, ...dados} = v.data;

    try {
        const contractFuelId = await getContractFuelByGasStationAndFuelType({gasStationId: gasStationId, fuelType: dados.fuelType});
        if (!contractFuelId.success) return {success:false, error: contractFuelId.error}

        let odometer:number;

        if (v.data.odometer){
            odometer = v.data.odometer
        } else {
            const vehicle = await prisma.vehicle.findUnique({
                select: {currentOdometer: true},
                where: {id: dados.vehicleId}
            });

            if (!vehicle?.currentOdometer) return {success:false, error: 'Não foi possível encontrar veículo'};

            odometer = vehicle.currentOdometer;
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
        campos: CreateFuelingRequestType, 
    ): Promise<ResponseType<string>> => {
    const vId = FuelingRequestIdSchema.safeParse(id);
    if (!vId.success) return {success: false, error: vId.error.message};

    const vCampos = CreateFuelingRequestSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, error: vCampos.error.message}

    const {gasStationId, ...dados} = vCampos.data;
    
    try {
        const contractFuelId = await getContractFuelByGasStationAndFuelType({
            gasStationId: gasStationId, 
            fuelType: dados.fuelType
        });

        if (!contractFuelId.success) return {success:false, error: contractFuelId.error}

        const res = await prisma.fuelingRequest.update({
            where: {
                id: vId.data,
                status: 'PENDING',
            },
            data: {
                ...dados, 
                liters: String(dados.liters), 
                contractFuelId: contractFuelId.data.id
            }
        });

        if (!res) return {success: false, error: 'Erro ao acessar banco. Verifique o status da solicitação.'}

        revalidatePath('/admin/solicitacoes');
        return {success: true, data: 'Solicitação atualizada com sucesso!'};

    } catch (err) {
        console.log(err);
        return {success:false, error: 'Erro ao atualizar solicitação'}

    }


}

// criar fueling sem cascade onDelete