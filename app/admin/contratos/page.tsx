import { auth } from "@/auth";
import AddContract from "@/components/admin/contratos/AddContract";
import ContratosList from "@/components/admin/contratos/ContratosList";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import { getContracts } from "@/lib/actions/contract";
import { getGasStations } from "@/lib/actions/gasStation";
import {  Inbox } from "lucide-react";

const Contratos = async () => {
    const resContratos = await getContracts();
    const resPostos = await getGasStations();
    const session = await auth();
    const isAdmin = session?.user.role === 'ADMIN';

    return (<>
        <HeaderTemplate title="Contratos">
            {
                isAdmin && (<AddContract postos={resPostos.success ? resPostos.data : []}/>)
            }
        </HeaderTemplate>
        {
            resContratos.success && resContratos.data.length > 0? 
                <ContratosList contratos={resContratos.data} postos={resPostos.success ? resPostos.data : []} isAdmin={isAdmin}/>
            :
            <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white border border-slate-200 rounded-none mx-auto my-6 sm:my-8 w-full max-w-xl shadow-none">
                <Inbox size={32} className="text-slate-400 mb-2 sm:mb-3 w-7 h-7 sm:w-8 sm:h-8" />
                <h3 className="text-xs sm:text-base font-bold text-slate-900 uppercase tracking-wider">
                    Nenhum Contrato Encontrado
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-1 uppercase font-medium">
                    Cadastre novos contratos para exibir aqui.
                </p>
            </div>
        }
    </>)
}

export default Contratos;
