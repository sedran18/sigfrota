'use server';
import {RawFuelEfficiencyItem, ResponseType} from "@/lib/types";
import { prisma } from "../prisma";
import { DateSchema, DateType } from "@/schemas/date.schema";
import { FuelBarChartItemType, FuelEfficiencyByVehicleType, KPIItemType } from "@/schemas/dashboard.schema";
import { slugify } from "../utils";

export const getKPIData = async ({from, to}: {from?: DateType; to?: DateType}): Promise<ResponseType<KPIItemType[]>> => {
        const vFrom = DateSchema.safeParse(from);
        const vTo = DateSchema.safeParse(to);
    
        const toDate = vTo.success ? vTo.data : new Date();
    
        const defaultFromDate = new Date(toDate);
        defaultFromDate.setDate(defaultFromDate.getDate() - 30);
        defaultFromDate.setHours(0, 0, 0, 0); 
    
        const fromDate = vFrom.success ? vFrom.data : defaultFromDate;
        toDate.setHours(23, 59, 59, 999);

    try {
        const res = await prisma.fueling.aggregate({
                where: {
                    createdAt: {
                        gte: fromDate,
                        lte: toDate,
                    }
                },
                _sum: {
                    liters: true,
                    totalAmount: true,
                },
                _avg: {
                    fuelEfficiency: true,
                },
                _count: {
                    id: true,
                }
            });

        const litros:KPIItemType = {title: 'Litros', value: res._sum.liters?.toNumber() || 0};
        const totalAmount:KPIItemType = {title: 'Total', value: `R$ ${res._sum.totalAmount?.toNumber() || 0}`};
        const fuelEfficiency:KPIItemType = {title: 'Eficiência', value: `${res._avg.fuelEfficiency?.toNumber() || 0} km/l`};
        const count:KPIItemType = {title: 'Quantidade', value: res._count.id || 0};

        return {success: true, data: [litros, totalAmount, fuelEfficiency, count]}
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao buscar dados do dashboard'}
    }
}

export const getDriverFuelData = async ({from, to}: {from?: DateType; to?: DateType}): Promise<ResponseType<FuelBarChartItemType[]>> => {
        const vFrom = DateSchema.safeParse(from);
        const vTo = DateSchema.safeParse(to);
    
        const toDate = vTo.success ? vTo.data : new Date();
    
        const defaultFromDate = new Date(toDate);
        defaultFromDate.setDate(defaultFromDate.getDate() - 30);
        defaultFromDate.setHours(0, 0, 0, 0); 
    
        const fromDate = vFrom.success ? vFrom.data : defaultFromDate;
        toDate.setHours(23, 59, 59, 999);

    try {
        const data = await prisma.$queryRaw<FuelBarChartItemType[]>`
            SELECT 
                d.name AS "name",
                COALESCE(SUM(f.liters), 0)::float AS "liters"
            FROM "fuelings" f
            JOIN "drivers" d ON d.id = f."driverId"
            WHERE f."createdAt" >= ${fromDate} 
                AND f."createdAt" <= ${toDate}
            GROUP BY d.id, d.name
            HAVING SUM(f.liters) > 0
            ORDER BY "liters" DESC
        `;

        return {success: true, data: data.map(item => ({name: item.name, liters: item.liters}))}
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao buscar dados do dashboard'}
    }
}

export const getFuelEfficiencyByCarData = async ({from, to}: {from?: DateType; to?: DateType}): Promise<ResponseType<FuelEfficiencyByVehicleType[]>> => {
            const vFrom = DateSchema.safeParse(from);
        const vTo = DateSchema.safeParse(to);
    
        const toDate = vTo.success ? vTo.data : new Date();
    
        const defaultFromDate = new Date(toDate);
        defaultFromDate.setDate(defaultFromDate.getDate() - 30);
        defaultFromDate.setHours(0, 0, 0, 0); 
    
        const fromDate = vFrom.success ? vFrom.data : defaultFromDate;
        toDate.setHours(23, 59, 59, 999);

    try {
        const data = await prisma.$queryRaw<RawFuelEfficiencyItem[]>`
            SELECT
                v.brand AS "vehicle brand",
                v.model AS "vehicle model",
                v.plate AS "vehicle plate",
                d.name AS "driver",
                ROUND(AVG(f."fuelEfficiency")::numeric, 2)::float AS "efficiency"
            FROM "fuelings" f
            JOIN "vehicles" v ON v.id = f."vehicleId"
            JOIN "drivers" d ON d.id = f."driverId"
            WHERE f."createdAt" >= ${fromDate}
                AND f."createdAt" <= ${toDate}
            GROUP BY v.brand, v.model, v.plate, d.name
            ORDER BY "efficiency" DESC;
        `
        const carMap = new Map<string, FuelEfficiencyByVehicleType>()
        const driverLabelByKey = new Map<string, string>() // slug -> nome real

        for (const item of data) {
        const carName = `${item["vehicle brand"]} ${item["vehicle model"]} (${item["vehicle plate"]})`
        const driverKey = slugify(item.driver)
        driverLabelByKey.set(driverKey, item.driver)

        if (!carMap.has(carName)) {
            carMap.set(carName, { carName })
        }

        carMap.get(carName)![driverKey] = item.efficiency
        }

        const allDriverKeys = Array.from(driverLabelByKey.keys())

        const formattedData = Array.from(carMap.values()).map((carObject) => {
        allDriverKeys.forEach((key) => {
            if (!(key in carObject)) carObject[key] = 0
        })
        return carObject
        })


        return {success: true, data: formattedData};
    } catch (err) {
        console.log(err);
        return {success: false, error: 'Erro ao buscar dados do dashboard'};
    }
}