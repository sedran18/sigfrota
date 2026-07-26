'use server';

import { CreateDriverSchema, CreateDriverType, DriverIdSchema, DriverIdType, DriverType, UpdateDriverSchema, UpdateDriverType, DriverWithUsageType} from "@/schemas/driver.schema";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { Driver} from "../generated/prisma/client";

export const createDriver = async (item: CreateDriverType):Promise<ResponseType<string>> => {
        const v = CreateDriverSchema.safeParse(item);
        if (!v.success) return {success: false, error: v.error.message};

        try {
            await prisma.driver.create({data: v.data})
            revalidatePath("/admin/motoristas")
            return {success: true, data: 'Motorista criado com sucesso'};

        } catch (err) {
            console.log(err)
            return {success: false, error: 'Erro ao salvar motorista'}
        }
}

// READ

type DriverWithCount = Driver & {
  _count: {
    fuelingRequests: number
  }
}

export const getDrivers= async (): Promise<ResponseType<DriverWithUsageType[]>> => {
    try {
        const drivers:DriverWithCount[]  = await prisma.driver.findMany({
            include: {
                _count: {
                    select: {
                        fuelingRequests: true,
                    }
                }
            }
        });
        const driversWithUse:DriverWithUsageType[] = drivers.map(({_count, ...driver}) => ({
            ...driver, 
            isUsed: _count.fuelingRequests > 0,
        }))
        return {success: true, data: driversWithUse }
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao buscar motoristas'}
    }
}

// UPDATE (put atualmente, talvez mudar para patch depois)
export const updateDriver = async (id: DriverIdType, campos: UpdateDriverType):Promise<ResponseType<DriverType>> => {
    const vId = DriverIdSchema.safeParse(id)
    if (!vId.success) return {success: false, error: vId.error.message}

    const vCampos = UpdateDriverSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, error: vCampos.error.message}
    const {data} =  vCampos;

    try {
        const driver = await prisma.driver.update({
            where: {
                id: vId.data
            },
            data: {
                ...data
            }
        })

        revalidatePath('/admin/motoristas')
        return {success: true, data: driver};
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao atualizar motorista'}
    }
}


export const removeDriver = async (id: DriverIdType): Promise<ResponseType<DriverType>> => {
        const vId = DriverIdSchema.safeParse(id);
        if (!vId.success) return {success: false, error: vId.error.message}

        try {
            const deleted = await prisma.driver.delete({
                where: {
                    id: vId.data,
                }
            })
            revalidatePath('/admin/motoristas');
            return {success: true, data: deleted}
        } catch (err) {
            console.log(err);
            return {success:false, error:'Erro ao remover motorista'}
        }
}
