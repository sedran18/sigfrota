import HeaderTemplate from "@/components/admin/HeaderTemplate"
import RequestCard from "@/components/admin/solicitacoes/SolicitacaoList/RequestCard"
import { getFuelingRequestById } from "@/lib/actions/fuelingRequest"
import { Inbox } from "lucide-react"

interface SolicitacaoDetailPageProps {
  params: Promise<{ requestId: string }>
}

const SolicitacaoDetailPage = async ({ params }: SolicitacaoDetailPageProps) => {
  const { requestId } = await params
  
  const response = await getFuelingRequestById(requestId)

  if (!response || !response.success || !response.data) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <HeaderTemplate 
          title="Detalhes da Solicitação" 
          description="Visualização individual da ordem de abastecimento" 
        />
        <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-200 text-center max-w-md w-full">
            <div className="p-3 bg-slate-100 text-slate-500 rounded-none">
              <Inbox size={32} />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-800">
              Solicitação não encontrada
            </h3>
            <p className="text-xs text-slate-500">
              O registro solicitado não existe ou foi removido do sistema.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const fuelingRequest = response.data

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeaderTemplate 
        title={`Solicitação #${fuelingRequest.id.slice(0, 8).toUpperCase()}`} 
        description="Visualização e gerenciamento individual da ordem de abastecimento" 
      />

      <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Ordem de Serviço
            </span>
          </div>

          <RequestCard data={fuelingRequest} />
        </div>
      </main>
    </div>
  )
}

export default SolicitacaoDetailPage