'use client';
import { Button } from '@/components/ui/button'
import { removeDriver, updateDriver } from '@/lib/actions/driver';
import { DriverIdSchema, DriverIdType } from '@/schemas/driver.schema';
import { X } from 'lucide-react'
import { Switch } from '@/components/ui/switch';

const DeleteDriverCard = ({driverId, isUsed, active}: {driverId :DriverIdType, isUsed: boolean, active: boolean}) => {

    const handleDelete = async (id: DriverIdType) => {
        //valide aqui e lançe um toast caso der erro
        const v = DriverIdSchema.safeParse(id);
        if (!v.success) return alert('Erro ao deletar motorista')
        
        if (isUsed) {
          const updated = await updateDriver(v.data, {active: !active});
          if (!updated.success) return alert('Erro ao atualizar active status');
          return alert('Motorista atualizado com sucesso!');
        }
        
        const areYouSure = confirm('Vc tem certeza que deseja excluir esse motorista?');
        if (!areYouSure) return;
        
        const removed = await removeDriver(id);
        if (!removed.success) return alert(removed.error);

        alert('Motorista removido com sucesso!')
    }

    return isUsed ? (
        <Switch
          checked={active}
          onCheckedChange={() => handleDelete(driverId)}
        />
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(driverId)}
          className="h-8 w-8 cursor-pointer rounded-lg text-slate-900 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X size={16} />
        </Button>
      );
    };

export default DeleteDriverCard
