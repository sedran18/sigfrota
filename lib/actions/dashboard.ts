'use server';
import {RawFuelEfficiencyItem, ResponseType} from "@/lib/types";
import { prisma } from "../prisma";
import { DateSchema, DateType } from "@/schemas/date.schema";
import { FuelBarChartItemType, FuelEfficiencyByVehicleType, KPIItemType, LineChartItemType } from "@/schemas/dashboard.schema";
import { slugify } from "../utils";
import { Prisma } from "../generated/prisma/client";

export interface RawLineChartItem {
  date: string
  GASOLINA_COMUM: Prisma.Decimal
  GASOLINA_ADITIVADA: Prisma.Decimal
  ETANOL: Prisma.Decimal
  DIESEL_COMUM: Prisma.Decimal
  DIESEL_S10: Prisma.Decimal
}

export const getLineChartData = async (from?: DateType, to?: DateType): Promise<ResponseType<LineChartItemType[]>> => {
    const vFrom = DateSchema.safeParse(from);
    const vTo = DateSchema.safeParse(to);

    const toDate = vTo.success ? vTo.data : new Date();

    const defaultFromDate = new Date(toDate);
    defaultFromDate.setDate(defaultFromDate.getDate() - 30);
    defaultFromDate.setHours(0, 0, 0, 0); 

    const fromDate = vFrom.success ? vFrom.data : defaultFromDate;
    toDate.setHours(23, 59, 59, 999);

    try {
        const result = await prisma.$queryRaw<RawLineChartItem[]>`
            SELECT 
                TO_CHAR("created_at", 'YYYY-MM-DD') AS "date",
                COALESCE(SUM(CASE WHEN "fuel_type" = 'GASOLINA_COMUM' THEN "liters" ELSE 0 END), 0) AS "GASOLINA_COMUM",
                COALESCE(SUM(CASE WHEN "fuel_type" = 'GASOLINA_ADITIVADA' THEN "liters" ELSE 0 END), 0) AS "GASOLINA_ADITIVADA",
                COALESCE(SUM(CASE WHEN "fuel_type" = 'ETANOL' THEN "liters" ELSE 0 END), 0) AS "ETANOL",
                COALESCE(SUM(CASE WHEN "fuel_type" = 'DIESEL_COMUM' THEN "liters" ELSE 0 END), 0) AS "DIESEL_COMUM",
                COALESCE(SUM(CASE WHEN "fuel_type" = 'DIESEL_S10' THEN "liters" ELSE 0 END), 0) AS "DIESEL_S10"
            FROM "fuelings"
            WHERE "created_at" >= ${fromDate} AND "created_at" <= ${toDate}
            GROUP BY TO_CHAR("created_at", 'YYYY-MM-DD')
            ORDER BY "date" ASC;
        `;

        const data: LineChartItemType[] = result.map((row) => ({
            date: row.date,
            GASOLINA_COMUM: row.GASOLINA_COMUM.toNumber(),
            GASOLINA_ADITIVADA: row.GASOLINA_ADITIVADA.toNumber(),
            ETANOL: row.ETANOL.toNumber(),
            DIESEL_COMUM: row.DIESEL_COMUM.toNumber(),
            DIESEL_S10: row.DIESEL_S10.toNumber(),
        }));

        return { success: true, data };
    } catch (err) {
        console.error(err);
        return { success: false, error: 'Erro ao buscar dados para o gráfico.' };
    }

}

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
            JOIN "drivers" d ON d.id = f."driver_id"
            WHERE f."created_at" >= ${fromDate} 
                AND f."created_at" <= ${toDate}
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
                ROUND(AVG(f."fuel_efficiency")::numeric, 2)::float AS "efficiency"
            FROM "fuelings" f
            JOIN "vehicles" v ON v.id = f."vehicle_id"
            JOIN "drivers" d ON d.id = f."driver_id"
            WHERE f."created_at" >= ${fromDate}
                AND f."created_at" <= ${toDate}
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