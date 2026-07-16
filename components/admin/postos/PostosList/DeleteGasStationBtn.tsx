'use client';

import { deleteGasStation } from "@/lib/mockActions/gasStation"
import { GasStationIdSchema, GasStationIdType} from "@/schemas/gasStation.schema"
import { Button } from "@base-ui/react";
import { X } from "lucide-react";

const DeleteGasStationBtn = ({gasStationiD}: {gasStationiD: GasStationIdType}) => {
    const handleDelete = async (id: GasStationIdType) => {
        const confirmar = confirm('Você tem certeza que deseja deletar esse posto? ');
        if (!confirmar) return;

        const v = GasStationIdSchema.safeParse(id);
        if (!v.success) return alert(v.error.message);

        const res = await deleteGasStation(v.data);

        if (!res.success) return alert(res.error);
        alert('Posto removido com sucesso!');
    }
  return (
    <Button onClick={() => handleDelete(gasStationiD)}>
        <X />
    </Button>
  )
}

export default DeleteGasStationBtn
