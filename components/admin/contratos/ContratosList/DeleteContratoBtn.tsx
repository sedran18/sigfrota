'use client';
import { Button } from '@/components/ui/button'
import { removeContract } from '@/lib/mockActions/contract';
import { ContractIdSchema, ContractIdType } from '@/schemas/contract.schema';
import { X } from 'lucide-react'
    
const DeleteContratoBtn= ({ContractId}: {ContractId :ContractIdType}) => {

    const handleDelete = async (id: ContractIdType) => {
        //valide aqui e lançe um toast caso der erro
        const v = ContractIdSchema.safeParse(id);
        if (!v.success) return alert('Erro ao deletar motorista')
        const areYouSure = confirm('Vc tem certeza que deseja excluir esse contrato?');
        if (!areYouSure) return;
        
        const removed = await removeContract(id);
        if (!removed.success) return alert('Erro ao deletar contrato');

        alert('Motorista removido com sucesso!')
    }
  return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDelete(ContractId)}
            className="h-8 cursor-pointer w-8 text-slate-900 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
          >
            <X size={16} />
        </Button>
  )
}

export default DeleteContratoBtn;
