'use client';
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { RequesStatusType } from '@/schemas/enums.schema';
import { deleteFuelingRequest } from '@/lib/actions/fuelingRequest';
import { FuelingRequestIdType } from '@/schemas/fuelingRequest.schema';

const DeleteFuelingRequestCard = ({fuelingRequestId, status}: {fuelingRequestId: FuelingRequestIdType,status: RequesStatusType}) => {

    const handleDelete = async () => {
        const isAssured = confirm('Você tem certeza que deseja excluir essa solicitação? ');
        if (!isAssured) return;

        const deleted = await deleteFuelingRequest(fuelingRequestId);
        if (!deleted.success) return alert(deleted.error);

        alert('Solicitação excluída com sucesso!')
    }

    return status === 'PENDING' && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete()}
                    className="h-8 w-8 cursor-pointer rounded-lg text-slate-900 transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                <X size={16} />
                </Button>
             )
    };

export default DeleteFuelingRequestCard
