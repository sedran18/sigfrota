'use client';
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Switch } from '@/components/ui/switch';
import { GasStationIdSchema, GasStationIdType } from '@/schemas/gasStation.schema';
import { removeGasStation, updateGasStation } from '@/lib/actions/gasStation';

const DeleteGasStationCard = ({gasStationId, isUsed, active}: {gasStationId:GasStationIdType, isUsed: boolean, active: boolean}) => {

    const handleDelete = async (id: GasStationIdType) => {
        //valide aqui e lançe um toast caso der erro
        const v = GasStationIdSchema.safeParse(id);
        if (!v.success) return alert('Erro ao deletar motorista')
        
        if (isUsed) {
          const updated = await updateGasStation(v.data, {active: !active});
          if (!updated.success) return alert('Erro ao atualizar active status');
          return alert('Motorista atualizado com sucesso!');
        }
        
        const areYouSure = confirm('Vc tem certeza que deseja excluir esse posto?');
        if (!areYouSure) return;
        
        const removed = await removeGasStation(id);
        if (!removed.success) return alert(removed.error);

        alert('Motorista removido com sucesso!')
    }

    return isUsed ? (
        <Switch
          checked={active}
          onCheckedChange={() => handleDelete(gasStationId)}
          className="cursor-pointer border-2 border-slate-400 bg-slate-300 data-[state=unchecked]:bg-slate-300 data-[state=checked]:bg-primary  data-[state=checked]:[&>span]:bg-white"
        />
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(gasStationId)}
          className="h-8 w-8 cursor-pointer rounded-lg text-slate-900 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X size={16} />
        </Button>
      );
    };

export default DeleteGasStationCard
