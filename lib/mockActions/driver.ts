import { CreateDriverSchema, CreateDriverType, DriverIdSchema, DriverIdType, DriverType, UpdateDriverSchema, UpdateDriverType} from "@/schemas/driver.schema";
import { DriversData } from "../data/drivers";
import { ResponseType } from "../types";

// CREATE
export const createDriver = (item: CreateDriverType):ResponseType<string> => {
    try {
        const {name, phone} = CreateDriverSchema.parse(item);
        const id = crypto.randomUUID();
        const createdAt = new Date();
        const updatedAt = createdAt;

        const newDriver = {id, name, phone, createdAt, updatedAt}
        DriversData.push(newDriver);
        
        return {success: true, data: ''}
    } catch (e) {
        console.log(e)
        return {success: false, data: 'Erro ao criar motorista'}
    }
}

// READ
export const getDrivers = (
    id?: DriverIdType
): ResponseType<DriverType[] | DriverType | string> => {

    if (!id) return {success: true, data: DriversData};

    const v = DriverIdSchema.safeParse(id);

    if (!v.success) return {success: false, data: 'Formato inválido'};

    const driver = DriversData.find(d => d.id === v.data);

    if (!driver) return {success: false, data: "Motorista não encontrado"};

    return {success: true, data: driver};
}

// UPDATE
export const updateDriver = (id: DriverIdType, campos: UpdateDriverType) => {
    const vId = DriverIdSchema.safeParse(id)
    if (!vId.success) return {success: false, data: vId.error.message}

    const vCampos = UpdateDriverSchema.safeParse(campos);
    if (!vCampos.success) return {success: false, data: vCampos.error.message}
    const {data} =  vCampos;

    const driver = DriversData.find(d => d.id === vId.data);

    if (!driver) return {success: false, data: 'Motorista não encontrado'}

    driver.name = data?.name ?? driver.name;
    driver.phone = data?.phone ?? driver.phone;
    driver.updatedAt = new Date();

    return {success: true, data: driver};
}

// DELETE
export const removeDriver = (id: DriverIdType): ResponseType<DriverType | string> => {
    try {
        const vId = DriverIdSchema.parse(id);

        const index = DriversData.findIndex(d => d.id === vId);
        if (index === -1) return {success: false, data: 'Motorista não foi encontrado'}

        const deleted = DriversData.splice(index, 1)[0];
        return {success: true, data: deleted}
    } catch (e) {
        console.log(e);
        return {success: false, data: 'Erro ao remover motorista'}
    }
}

