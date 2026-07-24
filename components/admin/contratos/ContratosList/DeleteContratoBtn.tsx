'use client';
import { Button } from '@/components/ui/button'
import { removeContract,  updateStatusContract } from '@/lib/actions/contract';
import { ContractIdSchema, ContractIdType } from '@/schemas/contract.schema';
import { X } from 'lucide-react'
import { Switch } from '@/components/ui/switch';

const DeleteContractCard = ({contractId, isUsed, active}: {contractId :ContractIdType, isUsed: boolean, active: boolean}) => {

    const handleDelete = async (id: ContractIdType) => {
        //valide aqui e lançe um toast caso der erro
        const v = ContractIdSchema.safeParse(id);
        if (!v.success) return alert('Erro ao deletar motorista')
        
        if (isUsed) {
          const updated = await updateStatusContract(v.data, !active);
          if (!updated.success) return alert('Erro ao atualizar active status');
          return alert('Motorista atualizado com sucesso!');
        }
        
        const areYouSure = confirm('Vc tem certeza que deseja excluir esse motorista?');
        if (!areYouSure) return;
        
        const removed = await removeContract(id);
        if (!removed.success) return alert(removed.error);

        alert('Motorista removido com sucesso!')
    }

    return isUsed ? (
        <Switch
          checked={active}
          onCheckedChange={() => handleDelete(contractId)}
        />
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleDelete(contractId)}
          className="h-8 w-8 cursor-pointer rounded-lg text-slate-900 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X size={16} />
        </Button>
      );
    };

export default DeleteContractCard
