import AbastecimentosCard from "@/components/admin/abastecimentos/AbastecimentosList/AbastecimentosCard"
import HeaderTemplate from "@/components/admin/HeaderTemplate"
import { getFuelingById } from "@/lib/actions/fueling"
import { Inbox } from "lucide-react"

interface SolicitacaoDetailPageProps {
  params: Promise<{ fuelingId: string }>
}

const AbastecimentoDetailPage = async ({ params }: SolicitacaoDetailPageProps) => {
  const { fuelingId } = await params
  
  const response = await getFuelingById(fuelingId)

  if (!response || !response.success || !response.data) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <HeaderTemplate 
          title="Detalhes do Abastecimento" 
          description="Visualização individual do abastecimento" 
        />
        <div className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3 p-8 bg-white border border-slate-200 text-center max-w-md w-full">
            <div className="p-3 bg-slate-100 text-slate-500 rounded-none">
              <Inbox size={32} />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-800">
              Abastecimento não encontrado
            </h3>
            <p className="text-xs text-slate-500">
              O registro solicitado não existe ou foi removido do sistema.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const fueling= response.data

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeaderTemplate 
        title={`Abastecimento #${fueling.id.slice(0, 8).toUpperCase()}`} 
        description="Visualização e gerenciamento individual da ordem de abastecimento" 
      />

      <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
              Abastecimento
            </span>
          </div>

          <AbastecimentosCard data={fueling} />
        </div>
      </main>
    </div>
  )
}

export default AbastecimentoDetailPage