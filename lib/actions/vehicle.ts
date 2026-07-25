'use server';

import { CreateVehicleSchema, CreateVehicleType,  UpdateVehicleSchema,  UpdateVehicleType,  VehicleIdSchema, VehicleIdType, VehicleType, VehicleWithUsageType } from "@/schemas/vehicle.schema";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";




export const createVehicle = async (item:CreateVehicleType): Promise<ResponseType<string>> => {
    const v = CreateVehicleSchema.safeParse(item);

    if (!v.success) return {success: false, error: v.error.message}

    try {
        await prisma.vehicle.create({
            data: v.data,
        })

        revalidatePath('/admin/veiculos');
        return {success: true, data: 'Veículo criado com sucesso'}

    } catch  (err) {
        console.log(err);
        return {success: false, error: 'Erro ao criar veículo'}
    }
}

export const getVehicles = async (): Promise<ResponseType<VehicleWithUsageType[]>> => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            include: {
                fuelingRequests: {
                    select: {
                        id: true
                    }, 
                    take: 1,
                }, 
            }
        });

        const vehiclesAdjusted = vehicles.map(({fuelingRequests, ...v}) => ({...v, 
            tankCapacity: v.tankCapacity.toNumber(), 
            averageConsumption: v.averageConsumption.toNumber(),
            isUsed: fuelingRequests.length > 0,    
        }));

        return {success: true, data: vehiclesAdjusted}
    } catch (err) {
        console.log(err);
        return  {success: false, error: 'Erro ao listar veículos'}
    }
}

export const updateVehicle = async (id: VehicleIdType, campos: UpdateVehicleType):Promise<ResponseType<VehicleType>> => {
    const vId = VehicleIdSchema.safeParse(id)
    if (!vId.success) return {success: false, error: vId.error.message}

    const vCampos = UpdateVehicleSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, error: vCampos.error.message}
    const {data} =  vCampos;

    try {
        
        const vehicle = await prisma.vehicle.update({
            where: {
                id: vId.data
            },
            data: {
                ...data
            }
        })

        revalidatePath('/admin/veiculos')
        return {success: true, data: {
            ...vehicle, 
            tankCapacity: vehicle.tankCapacity.toNumber(),
            averageConsumption: vehicle.averageConsumption.toNumber(),
        }};
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao atualizar veículo'}
    }
}


export const removeVehicle = async (id: VehicleIdType): Promise<ResponseType<VehicleType>> => {
        const vId = VehicleIdSchema.safeParse(id);
        if (!vId.success) return {success: false, error: vId.error.message}

        try {
            // como não cascade o delete, o prisma já garante a exclusão segura (apenas se não houver solicitações de abastecimento)
            const deleted = await prisma.vehicle.delete({
                where: {
                    id: vId.data,
                }
            });

            revalidatePath('/admin/veiculos');
            return {success: true, data: {
                ...deleted, 
                tankCapacity: deleted.tankCapacity.toNumber(), 
                averageConsumption: deleted.averageConsumption.toNumber()
            }}
        } catch (err) {
            console.log(err);
            return {success:false, error:'Erro ao remover veículo'}
        }
}
