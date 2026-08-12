'use server';
import {ResponseType} from "@/lib/types";
import { prisma } from "../prisma";
import { DateSchema, DateType } from "@/schemas/date.schema";
import { KPIItemType } from "@/schemas/dashboard.schema";

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
        const res = await prisma.$transaction(async (tx) => {
            return  tx.fueling.aggregate({
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
