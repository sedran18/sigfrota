'use server';

import { CreateGasStationSchema, CreateGasStationType, GasStationIdSchema, GasStationIdType, GasStationSelectSchema, GasStationSelectType, GasStationType, GasStationWithUsageType, UpdateGasStationSchema, UpdateGasStationType} from "@/schemas/gasStation.schema";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { GasStation, Prisma} from "@prisma/client";

export const createGasStation = async (item: CreateGasStationType):Promise<ResponseType<string>> => {
        const v = CreateGasStationSchema.safeParse(item);
        if (!v.success) return {success: false, error: v.error.message};
        try {
            await prisma.gasStation.create({data: v.data})
            revalidatePath("/admin/postos")
            return {success: true, data: 'Posto criado com sucesso'};

        } catch (err) {
    console.log(err);

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        const target = err.meta?.target as string[] | undefined;
        
        if (target?.includes('cnpj')) {
          return { success: false, error: 'Já existe um posto cadastrado com este CNPJ.' };
        }
        
        return { success: false, error: 'Já existe um cadastro com esses dados.' };
      }
    }

    return { success: false, error: 'Erro ao salvar posto.' };
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
        orderBy: {
            createdAt: 'desc',
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
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                const target = err.meta?.target as string[] | undefined;
                
                if (target?.includes('cnpj')) {
                return { success: false, error: 'Já existe um posto cadastrado com este CNPJ.' };
                }
                
                return { success: false, error: 'Já existe um cadastro com esses dados.' };
            }
        }
        return {success: false, error: 'Erro ao atualizar posto'}
    }
}


export const removeGasStation = async (id: GasStationIdType): Promise<ResponseType<GasStationType>> => {
        const vId = GasStationIdSchema.safeParse(id);
        if (!vId.success) return {success: false, error: vId.error.message}

        try {
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


export type SelectedGasStation<T extends Prisma.GasStationSelect> = Prisma.GasStationGetPayload<{ select: T }>;

export const getGasStationsSelect = async <T extends GasStationSelectType>(
  data: T,
): Promise<ResponseType<SelectedGasStation<T>[]>> => {
  const v = GasStationSelectSchema.safeParse(data);
  if (!v.success) return { success: false, error: v.error.message };
  
  const select = v.data as T;

  try {
    const GasStations = await prisma.gasStation.findMany({
      select: select,
      orderBy: {
        createdAt: 'desc',
      },    
    });

    return { 
      success: true, 
      data: GasStations as unknown as SelectedGasStation<T>[] 
    };
  } catch (err) {
    console.error(err);
    return { success: false, error: 'Erro ao listar veículos' };
  }
};