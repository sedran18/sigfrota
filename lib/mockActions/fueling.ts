import { AddFuelingType } from "@/schemas/fueling.schema";
import { fuelingsData } from "../data/fuelings";
import { AddFuelingSchema } from "@/schemas/fueling.schema";

export const getFuelings = () => {
    return  fuelingsData;
}

export const addFueling = (items:AddFuelingType) =>  {
    // const res = AddFuelingSchema.safeParse(items);
    // if (!res.success) return console.log(res.error.issues)
    // const campos =  {...res, id: String(Date.now()), pricePerLiter: 7.5, total}
    // fuelingsData.push(res);
}

export const deleteFueling = () => {

}

export const editFueling = () => {

}
    // id: true,
    // pricePerLiter: true,
    // totalAmount: true,
    // distanceTraveled: true,
    // createdAt: true,
    // updatedAt: true
    
// id: "f83b9c2a-1234-4bc1-b552-3a8db29d1101",
//     vehicleId: "abc-1234-flex-sedan-2024",
//     driverId: "user-8831-joao-silva",
//     requestId: "req-9910-a",
//     gasStation: "Santos",
//     fuelType: "GASOLINA COMUM",
//     odometer: 45210,
//     liters: 42.5,
//     pricePerLiter: 5.79,
//     totalAmount: 246.08,
//     distanceTraveled: 480,
//     fuelEfficiency: 11.29,
//     observations: "Abastecimento padrão na saída do turno.",
//     createdAt:  new Date(),
//     updatedAt: new Date()