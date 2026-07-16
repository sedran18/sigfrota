'use server';

import { CreateVehicleSchema, CreateVehicleType,  VehicleIdSchema, VehicleIdType, VehicleType } from "@/schemas/vehicle.schema";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { ResponseType } from "../types";
import { revalidatePath } from "next/cache";

const PATH = path.join(process.cwd(), "lib", "data", "vehicles.json");



export const createVehicle = async (item:CreateVehicleType): Promise<ResponseType<string>> => {
    const v = CreateVehicleSchema.safeParse(item);

    if (!v.success) return {success: false, error: v.error.message}

    const id = crypto.randomUUID();
    const createdAt = new Date();
    const updatedAt = createdAt;

    const vehicle = {id,...v.data,createdAt, updatedAt };

    try {
        const file = await readFile(PATH, 'utf-8');
        const vehicles: VehicleType[] = JSON.parse(file);
        vehicles.push(vehicle);

        await writeFile(PATH, JSON.stringify(vehicles, null, 2));

        revalidatePath('/admin/veiculos');
        return {success: true, data: 'Veículo criado com sucesso'}

    } catch  (err) {
        console.log(err);
        return {success: false, error: 'Erro ao criar veículo'}
    }
}

export const getVehicles = async (): Promise<ResponseType<VehicleType[]>> => {
    try {
        const file = await readFile(PATH, 'utf-8');
        const vehicles: VehicleType[] = JSON.parse(file);
        return {success: true, data: vehicles}
    } catch (err) {
        console.log(err);
        return  {success: false, error: 'Erro ao listar veículos'}
    }
}

export const updateVehicle = async (id: VehicleIdType, campos: CreateVehicleType):Promise<ResponseType<string>> => {
    const vId = VehicleIdSchema.safeParse(id);
    if (!vId.success) return {success: false, error: vId.error.message}

    const vCampos = CreateVehicleSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, error: vCampos.error.message};

    try {
        const file = await readFile(PATH, 'utf-8');
        const vehicles: VehicleType[] = JSON.parse(file);

        const vehicle = vehicles.find(v => v.id === id);
        if (!vehicle) return {success: false, error: 'Veículo não encontrado'};
        Object.assign(vehicle, vCampos.data, {updatedAt: new Date()});

        await writeFile(PATH, JSON.stringify(vehicles, null, 2));
        revalidatePath('/admin/veiculos')
        return {success: true, data: 'Objeto atualizado com sucesso'}

    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao atualizar veículo'}
    }
}

export const deleteVehicle = async (id: VehicleIdType): Promise<ResponseType<VehicleType>> => {
    const v = VehicleIdSchema.safeParse(id);
    if (!v.success) return {success: false, error: v.error.message};

    try {
        const file = await readFile(PATH, 'utf-8');
        const vehicles: VehicleType[] = JSON.parse(file);

        const index = vehicles.findIndex(veiculo => veiculo.id === v.data);
        const deleted = vehicles.splice(index, 1)[0];

        await writeFile(PATH, JSON.stringify(vehicles));
        
        revalidatePath('/admin/veiculos');
        return {success: true, data: deleted}
        
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao deletar Veículo'}
    }
}
