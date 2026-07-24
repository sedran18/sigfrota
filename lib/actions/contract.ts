'use server';

import { ContractIdSchema, ContractIdType, ContractType, CreateContractSchema, CreateContractType, UpdateContractSchema, UpdateContractType } from "@/schemas/contract.schema";
import { ResponseType } from "../types";
import { GetContractsResponseType } from "@/schemas/contract.schema";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export const getContracts =  async ():Promise<ResponseType<GetContractsResponseType[]>> => {
    try {
        const contracts = await prisma.contract.findMany({
            include: {
                contractFuels: {
                    include: {
                        fuelingRequests: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }
            }
        });



        const contractsAdjusted = contracts.map(({contractFuels, ...c}) => {
            const isUsed = contractFuels.some(f => f.fuelingRequests.length > 0);

            const contractFuelsAdjusted = contractFuels.map(({fuelingRequests, ...fuel}) => ({
                ...fuel,
                pricePerLiter: fuel.pricePerLiter.toNumber(), 
                litersContracted: fuel.litersContracted.toNumber(),
                litersAvailable: fuel.litersAvailable.toNumber(),
                litersConsumed: fuel.litersConsumed.toNumber(),
            }));
            
            return {...c, contractFuels: contractFuelsAdjusted, isUsed}

        })

        return {success: true, data: contractsAdjusted};
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao listar contratos'};
    }
}

export const createContract = async (campos: CreateContractType):Promise<ResponseType<string>> => {

    const v = CreateContractSchema.safeParse(campos);
    if (!v.success) return {success: false, error: v.error.message};

    const {contractFuels, ...contract} = v.data;
    const today = new Date();

    const contractFuelsAdjusted = contractFuels.map(c => ({...c, litersAvailable: c.litersContracted, litersConsumed: c.litersContracted}));


    if (contract.endDate < contract.startDate || contract.endDate < today) return {success:false, error: 'Data inválida'}


    try {
        await prisma.contract.create({
            data: {
                ...contract,
                contractFuels: {
                    create: contractFuelsAdjusted
                }
            }
        });

        revalidatePath('/admin/contratos');
        return {success: true, data: 'Contrato criado com sucesso'}
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao criar contrato'}
    }
}

export const removeContract = async (id: ContractIdType): Promise<ResponseType<ContractType>> => {
        const vId = ContractIdSchema.safeParse(id);
        if (!vId.success) return {success: false, error: vId.error.message}
        const contractId = vId.data;

        try {
            const contractFuels = await prisma.contractFuel.findFirst({
                where: {
                    contractId: contractId,
                    fuelingRequests: {
                        some: {}
                    }
                },
                select: {
                    id: true,
                }
            });

            if (contractFuels) return {success:false, error : 'Não é possível apagar contratos já usados no sistema, tente alterar o status'};

            const deleted = await prisma.contract.delete({
                where: {
                    id: contractId,
                }
            })
            revalidatePath('/admin/contratos');
            return {success: true, data: deleted}
        } catch (err) {
            console.log(err);
            return {success:false, error:'Erro ao remover contrato'}
        }
}


export const updateStatusContract = async (
  id: ContractIdType,
  isActive: boolean
): Promise<ResponseType<ContractType>> => {
  const vId = ContractIdSchema.safeParse(id);
  if (!vId.success) return { success: false, error: vId.error.message };

  try {
    const contract = await prisma.contract.update({
        where: {
            id: vId.data,
        },
        data: {
            active: !isActive
        },
    });

    revalidatePath('/admin/contratos');
    return { success: true, data: contract };
  } catch (err) {
    console.log(err);
    return { success: false, error: 'Erro ao atualizar contrato' };
  }
};
