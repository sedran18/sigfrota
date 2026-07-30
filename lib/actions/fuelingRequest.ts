'use server';
import { CreateFuelingRequestSchema, CreateFuelingRequestType, FuelingRequestType } from "@/schemas/fuelingRequest.schema";
import prisma from "../prisma";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";

export const getFuelingRequests = async (): Promise<ResponseType<FuelingRequestType[]>> => {
    try {
        const requests = await prisma.fuelingRequest.findMany();
        const requestsAdjusted = requests.map(req => ({...req, liters: Number(req.liters)}));
        return {success: true, data: requestsAdjusted}
    } catch (err) {
        console.error(err);
        return {success: false, error: 'Erro ao listar solicitações'}
    }
}

export const createFuelingRequest = async (data: CreateFuelingRequestType):Promise<ResponseType<string>> => {
    const v = CreateFuelingRequestSchema.safeParse(data);
    if (!v.success) return {success: false, error: v.error.message}

    try {
        let odometer:number;

        if (v.data.odometer){
            odometer = v.data.odometer
        } else {
            const vehicle = await prisma.vehicle.findUnique({
                select: {currentOdometer: true},
                where: {id: v.data.vehicleId}
            });

            if (!vehicle?.currentOdometer) return {success:false, error: 'Não foi possível encontrar veículo'};

            odometer = vehicle.currentOdometer;
        }
        
        await prisma.fuelingRequest.create({
            data: {...v.data, odometer, liters: String(v.data.liters), status: 'PENDING'}
        });
        revalidatePath('/admin/solicitacoes');
        return {success:true, data: 'Solicitação criada com sucesso'};

    } catch (err) {
        console.error(err);
        return {success: false, error: 'Erro ao criar solicitação'}
    }
}