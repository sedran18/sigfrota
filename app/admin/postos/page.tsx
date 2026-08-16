import { auth } from "@/auth";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddPosto from "@/components/admin/postos/AddPosto";
import PostosList from "@/components/admin/postos/PostosList";
import { getGasStations } from "@/lib/actions/gasStation";
import {  Inbox } from "lucide-react";

const Postos = async () => {
    const gasStations = await getGasStations();
    const session = await auth();
    const isAdmin = session?.user.role === 'ADMIN';
    
    return (<>
        <HeaderTemplate title="Postos">
            {
                isAdmin && (<AddPosto/>)
            }
        </HeaderTemplate>
        {
            gasStations.success && gasStations.data.length > 0?
                <PostosList gasStations={gasStations.data}  isAdmin={isAdmin}/>
            :
                <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white border border-slate-200 rounded-none mx-auto my-6 sm:my-8 w-full max-w-xl shadow-none">
                    <Inbox size={32} className="text-slate-400 mb-2 sm:mb-3 w-7 h-7 sm:w-8 sm:h-8" />
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 uppercase tracking-wider">
                        Nenhum Posto Credenciado
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-600 mt-1 uppercase font-medium">
                        Cadastre os postos parceiros para liberar o abastecimento.
                    </p>
                </div>       
        }

    </>)
}

export default Postos;
