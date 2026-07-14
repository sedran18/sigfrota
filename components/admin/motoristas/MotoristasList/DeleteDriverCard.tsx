'use client';
import { Button } from '@/components/ui/button'
import { removeDriver } from '@/lib/mockActions/driver';
import { DriverIdSchema, DriverIdType } from '@/schemas/driver.schema';
import { X } from 'lucide-react'
    
const DeleteDriverCard = ({driverId}: {driverId :DriverIdType}) => {

    const handleDelete = async (id: DriverIdType) => {
        //valide aqui e lançe um toast caso der erro
        const v = DriverIdSchema.safeParse(id);
        if (!v.success) return alert('Erro ao deletar motorista')
        const areYouSure = confirm('Vc tem certeza que deseja excluir esse motorista?');
        if (!areYouSure) return;
        
        const removed = await removeDriver(id);
        if (!removed.success) alert('Erro ao deletar motorista');
    }
  return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDelete(driverId)}
            className="h-8 cursor-pointer w-8 text-slate-900 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <X size={16} />
        </Button>
  )
}

export default DeleteDriverCard
