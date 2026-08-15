'use client';
import { Button } from '@/components/ui/button'
import { deleteFueling } from '@/lib/actions/fueling';
import { FuelingIdType } from '@/schemas/fueling.schema';
import { X } from 'lucide-react'


const DeleteFuelingBtn = ({ fuelingId }: { fuelingId: FuelingIdType }) => {

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const isAssured = confirm('Você tem certeza que deseja excluir esse abastecimento? ');
        if (!isAssured) return;

        const deleted = await deleteFueling(fuelingId);
        if (!deleted.success) return alert(deleted.error);

        alert('Abastecimento excluído com sucesso!')
    }

    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="h-8 w-8 cursor-pointer rounded-lg text-slate-600 transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
            <X size={16} />
        </Button>
    )
};

export default DeleteFuelingBtn;