'use server';

import { ContractIdSchema, ContractIdType, ContractType, CreateContractSchema, CreateContractType } from "@/schemas/contract.schema";
import { ResponseType } from "../types";
import path from "path";
import { ContractFuelType } from "@/schemas/contractFuel.schema";
import { getFileJSONToArray, saveArrayToJSON } from "../utils";
import { GetContractsResponseType } from "@/schemas/contract.schema";
import { revalidatePath } from "next/cache";


const PATH = path.join(process.cwd(), 'lib', 'data', 'contracts.json');
const PATH_FUEL = path.join(process.cwd(), 'lib', 'data', 'contractsFuels.json');

export const getContracts =  async ():Promise<ResponseType<GetContractsResponseType[]>> => {
    try {
        const contracts:ContractType[]  = await getFileJSONToArray(PATH);
        const cFuels: ContractFuelType[] = await getFileJSONToArray(PATH_FUEL);
        const newContracts = contracts.map(c => {
            const contractFuels:ContractFuelType[] = cFuels.filter(f => f.contractId === c.id);
            return {...c, contractFuels};
        });
        return {success: true, data: newContracts};
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao listar contratos'};
    }
}

export const createContract = async (campos: CreateContractType):Promise<ResponseType<string>> => {

    const v = CreateContractSchema.safeParse(campos);
    if (!v.success) return {success: false, error: v.error.message};

    const {contractFuels, ...contract} = v.data;

    const contractId = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = createdAt;
    const newContract = {
        id: contractId, 
        ...contract, 
        createdAt, 
        updatedAt
    }
    const newContractFuels:ContractFuelType[] = contractFuels.map(c => {
        const cFuelId = crypto.randomUUID();
        const litersAvailable = c.litersContracted;

        const cFuel:ContractFuelType = {
            id:cFuelId,
            contractId,
            ...c,
            litersAvailable,
            litersConsumed: 0,
            createdAt, 
            updatedAt
        };
        return cFuel;

    })

    try {
        const contracts: ContractType[] = await getFileJSONToArray(PATH);
        contracts.push(newContract);

        const cFuels:ContractFuelType[] = await getFileJSONToArray(PATH_FUEL);
        cFuels.push(...newContractFuels);

        await saveArrayToJSON(PATH, contracts);

        try {
            await saveArrayToJSON(PATH_FUEL, cFuels);
            revalidatePath('/admin/contratos');
            return {success: true, data: 'Contrato criado com sucesso'}
        } catch (err) {
            const rollback = await removeContract(contractId);
            if (!rollback.success) {
            console.error('Falha ao desfazer criação do contrato');
            }
            console.log(err);
            return {success:false, error: 'Erro ao salvar combustível do contrato'};
        }
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao criar contrato'}
    }
}

export const removeContract = async (contractId: ContractIdType):Promise<ResponseType<ContractType>> => {
    const  v = ContractIdSchema.safeParse(contractId);
    if (!v.success) return {success: false, error: v.error.message};

    try {
        const contracts: ContractType[] = await getFileJSONToArray(PATH);
        const index = contracts.findIndex(c => c.id === v.data);
        
        if (index === -1) return {success: false, error: 'Contrato não encontrado'};

        const deleted = contracts.splice(index, 1)[0];


        const contractFuels:ContractFuelType[] = await getFileJSONToArray(PATH_FUEL);
        const newContractFuels = contractFuels.filter(cf => cf.contractId !== v.data);

        await saveArrayToJSON(PATH_FUEL, newContractFuels);
        await saveArrayToJSON(PATH, contracts);

        revalidatePath('/admin/contratos');
        return {success:true, data: deleted}
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao deletar contrato'};
    }

}



