'use server';

import {
    CreateVehicleSchema, 
    CreateVehicleType,  
    UpdateVehicleSchema,  
    UpdateVehicleType,  
    VehicleIdSchema, 
    VehicleIdType,  
    VehicleType, 
    VehicleWithUsageType,
    VehicleSelectSchema,
    VehicleSelectType,
} from "@/schemas/vehicle.schema";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { FuelType, FuelTypeSchema,  VehicleFuelTypeType } from "@/schemas/enums.schema";
import { Prisma } from "@prisma/client";

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
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
                  //Violou o unique constraint
            if (err.code === "P2002") {
                return {
                    success: false,
                    error: "Já existe esse carro no sistema",
                }
            }
        }

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
            },
            orderBy: {
                createdAt: 'desc',
            },
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

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            //Violou o unique constraint
            if (err.code === "P2002") {
                return {
                    success: false,
                    error: "Já existe esse carro no sistema",
                }
            }
        }

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

export type SelectedVehicle<T extends Prisma.VehicleSelect> = Prisma.VehicleGetPayload<{ select: T }>;

export const getVehiclesSelectByFuelType = async <T extends VehicleSelectType>(
  data: T,
  fuelType?: FuelType | FuelType[],
  active?: boolean
): Promise<ResponseType<SelectedVehicle<T>[]>> => {
    const v = VehicleSelectSchema.safeParse(data);
    if (!v.success) return { success: false, error: 'Select inválido' };

    const select = v.data as T;

    const fuelTypesArray = fuelType
      ? (Array.isArray(fuelType) ? fuelType : [fuelType])
      : undefined;

    let fuelTarget: VehicleFuelTypeType[] | undefined;

    if (fuelTypesArray?.length) {
        const vFuel = FuelTypeSchema.array().safeParse(fuelTypesArray);
        if (!vFuel.success) return { success: false, error: 'fuelType inválido' };

        // monta o conjunto de VehicleFuelType, sem duplicar (Set)
        const targetSet = new Set<VehicleFuelTypeType>();

        for (const tipo of vFuel.data) {
            const combustivel = tipo.startsWith('GASOLINA') ? 'GASOLINA' : tipo;

            if (combustivel === 'GASOLINA') {
                targetSet.add('GASOLINA');
                targetSet.add('FLEX');
            } else if (combustivel === 'ETANOL') {
                targetSet.add('ETANOL');
                targetSet.add('FLEX');
            } else {
                targetSet.add(combustivel as VehicleFuelTypeType);
            }
        }

        fuelTarget = Array.from(targetSet);
    }

    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                ...(fuelTarget ? { fuelType: { in: fuelTarget } } : {}),
                ...(typeof active === 'boolean' ? { active } : {}),
            },
            select: select,
        });

        return {
            success: true,
            data: vehicles
        };
    } catch (err) {
        console.error(err);
        return { success: false, error: 'Erro ao listar veículos' };
    }
};