'use server';

import { CreateGasStationSchema, CreateGasStationType, GasStationIdSchema, GasStationIdType, GasStationType } from "@/schemas/gasStation.schema";
import { ResponseType } from "../types";
import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

const PATH = path.join(process.cwd(), "lib", "data", "gasStations.json");


export const getGasStations = async ():Promise<ResponseType<GasStationType[]>> => {
    try {
        const file = await readFile(PATH, 'utf-8');
        const gasStations:GasStationType[] = JSON.parse(file);
        return {success: true, data: gasStations}
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao listar Postos'}
    }
}

export const createGasStation = async (data:CreateGasStationType):Promise<ResponseType<string>> => {
    const v = CreateGasStationSchema.safeParse(data);

    if (!v.success) return {success: false, error: v.error.message}

    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = createdAt;
    const newGasStation = {id, ...v.data, createdAt, updatedAt};

    try {
        const file = await readFile(PATH, 'utf-8');
        const gasStations:GasStationType[] = JSON.parse(file);
        gasStations.push(newGasStation);

        await writeFile(PATH, JSON.stringify(gasStations, null, 2));
        revalidatePath('/admin/postos');

        return {success: true, data: 'Posto criado com sucesso'}

    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao criar posto'};
    }
}

export const updateGasStation = async (id: GasStationIdType, campos: CreateGasStationType):Promise<ResponseType<string>> => {
    const vId = GasStationIdSchema.safeParse(id);
    if (!vId.success) return {success: false, error: vId.error.message}

    const vCampos = CreateGasStationSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, error: vCampos.error.message};

    try {
        const file = await readFile(PATH, 'utf-8');
        const GasStations: GasStationType[] = JSON.parse(file);

        const gasStation = GasStations.find(v => v.id === id);
        if (!gasStation) return {success: false, error: 'Posto não encontrado'};

        Object.assign(gasStation, vCampos.data, {updatedAt: new Date()});

        await writeFile(PATH, JSON.stringify(GasStations, null, 2));
        revalidatePath('/admin/postos');
        return {success: true, data: 'Objeto atualizado com sucesso'}

    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao atualizar posto'}
    }
}

export const deleteGasStation = async (id: GasStationIdType): Promise<ResponseType<GasStationType>> => {
    const v = GasStationIdSchema.safeParse(id);
    if (!v.success) return {success: false, error: v.error.message};

    try {
        const file = await readFile(PATH, 'utf-8');
        const GasStations: GasStationType[] = JSON.parse(file);

        const index = GasStations.findIndex(posto => posto.id === v.data);
        const deleted = GasStations.splice(index, 1)[0];

        await writeFile(PATH, JSON.stringify(GasStations));
        
        revalidatePath('/admin/postos');
        return {success: true, data: deleted}
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao deletar Posto'}
    }
}