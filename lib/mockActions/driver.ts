'use server';

import { CreateDriverSchema, CreateDriverType, DriverIdSchema, DriverIdType, DriverType, UpdateDriverSchema, UpdateDriverType} from "@/schemas/driver.schema";
import { ResponseType } from "../types";
import { writeFile, readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import path from "path";

const PATH = path.join(process.cwd(), "lib", "data", "drivers.json");

// CREATE
export const createDriver = async (item: CreateDriverType):Promise<ResponseType<string>> => {
        const v = CreateDriverSchema.safeParse(item);
        if (!v.success) return {success: false, error: v.error.message};
        const id = crypto.randomUUID();
        const createdAt = new Date();
        const updatedAt = createdAt;


        const newDriver = {id, ...v.data, createdAt, updatedAt};
        try {
            const file = await readFile(PATH, 'utf-8');
            const drivers: DriverType[] = JSON.parse(file)
            drivers.push(newDriver);

            await writeFile(PATH, JSON.stringify(drivers, null, 2));
            revalidatePath("/admin/motoristas")
            return {success: true, data: 'Motorista criado com sucesso'};

        } catch (err) {
            console.log(err)
            return {success: false, error: 'Erro ao salvar motorista'}
        }
}

// READ
export const getDrivers = async (): Promise<ResponseType<DriverType[]>> => {
    try {
        const file = await readFile(PATH, 'utf-8');
        const drivers:DriverType[] = JSON.parse(file);
        return {success: true, data: drivers }
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao buscar motoristas'}
    }
}

// export const getDriverByID = (id: DriverIdType): ResponseType<DriverType> => {
//     const v = DriverIdSchema.safeParse(id);

//     if (!v.success) return {success: false, error: v.error.message}
    
//     const driver = DriversData.find(d => d.id === v.data);

//     if (!driver) return {success: false, error: "Motorista não encontrado"};

//     return {success: true, data: driver};
// }

// UPDATE (put atualmente, talvez mudar para patch depois)
export const updateDriver = async (id: DriverIdType, campos: UpdateDriverType):Promise<ResponseType<DriverType>> => {
    const vId = DriverIdSchema.safeParse(id)
    if (!vId.success) return {success: false, error: vId.error.message}

    const vCampos = UpdateDriverSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, error: vCampos.error.message}
    const {data} =  vCampos;

    try {
        const file = await readFile(PATH, 'utf-8');
        const drivers:DriverType[] = JSON.parse(file);

        const driver = drivers.find(d => d.id === vId.data);

        if (!driver) return {success: false, error: 'Motorista não encontrado'}

        driver.name = data?.name ?? driver.name;
        driver.phone = data?.phone ?? driver.phone;
        driver.updatedAt = new Date();

        await writeFile(PATH, JSON.stringify(drivers, null, 2))
        revalidatePath('/admin/motoristas')
        return {success: true, data: driver};
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao atualizar motorista'}
    }

}

// DELETE
export const removeDriver = async (id: DriverIdType): Promise<ResponseType<DriverType>> => {
        const vId = DriverIdSchema.safeParse(id);
        if (!vId.success) return {success: false, error: vId.error.message}

        try {
            const file = await readFile(PATH, 'utf-8');
            const drivers:DriverType[] = JSON.parse(file);

            const index = drivers.findIndex(d => d.id === vId.data);
            if (index === -1) return {success: false, error: 'Motorista não foi encontrado'}

            const deleted = drivers.splice(index, 1)[0];
            await writeFile(PATH, JSON.stringify(drivers));
            revalidatePath('/admin/motoristas')
            return {success: true, data: deleted}
        } catch (err) {
            console.log(err);
            return {success:false, error:'Erro ao remover motorista'}
        }
}

