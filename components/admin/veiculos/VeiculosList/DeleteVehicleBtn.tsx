'use client';

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch";
import { removeVehicle, updateVehicle } from "@/lib/actions/vehicle";
import { VehicleIdSchema, VehicleIdType } from "@/schemas/vehicle.schema";
import { X } from "lucide-react"

const DeleteVehicleBtn = ({ vehicleId, isUsed, active }: { vehicleId: VehicleIdType, isUsed: boolean, active: boolean }) => {

  const handleDelete = async (id: VehicleIdType) => {
    const v = VehicleIdSchema.safeParse(id);
    if (!v.success) return alert('Erro ao deletar veículo')

    if (isUsed) {
      const updated = await updateVehicle(v.data, { active: !active });
      if (!updated.success) return alert('Erro ao atualizar active status');
      return alert('Veículo atualizado com sucesso!');
    }

    const areYouSure = confirm('Vc tem certeza que deseja excluir esse posto?');
    if (!areYouSure) return;

    const removed = await removeVehicle(id);
    if (!removed.success) return alert(removed.error);

    alert('Veículo removido com sucesso!')
  }

  return isUsed ? (
      <Switch
        checked={active}
        onCheckedChange={() => handleDelete(vehicleId)}
        className="cursor-pointer border-2 border-slate-400 bg-slate-300 data-[state=unchecked]:bg-slate-300 data-[state=checked]:bg-primary  data-[state=checked]:[&>span]:bg-white"
      />
  ) : (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => handleDelete(vehicleId)}
      className="h-8 w-8 cursor-pointer rounded-lg bg-white/80 backdrop-blur-sm border border-[var(--border)] text-slate-600 transition-colors hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
    >
      <X size={16} />
    </Button>
  );
};

export default DeleteVehicleBtn;