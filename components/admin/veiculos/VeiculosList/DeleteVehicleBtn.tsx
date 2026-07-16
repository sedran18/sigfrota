'use client';

import { Button } from "@/components/ui/button"
import { deleteVehicle } from "@/lib/mockActions/vehicle";
import {VehicleIdType } from "@/schemas/vehicle.schema";
import { X } from "lucide-react"

const DeleteVehicleBtn = ({vehicleId}: {vehicleId: VehicleIdType}) => {

    const handleDelete = async (id: VehicleIdType) => {
        const confirmar = confirm('Vc tem certeza que deseja excluir esse veículo?');

        if (!confirmar) return;

        const deleted =  await deleteVehicle(id);
        if(!deleted.success) return alert('Não foi possível remover veículo!');

        alert('Veículo removido com sucesso!');
    }

    return (
        <Button onClick={() => handleDelete(vehicleId)}>
            <X />
        </Button>
    )
}

export default DeleteVehicleBtn
