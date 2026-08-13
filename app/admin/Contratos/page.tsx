import { auth } from "@/auth";
import AddContrato from "@/components/admin/contratos/AddContrato";
import ContratosList from "@/components/admin/contratos/ContratosList";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import { getContracts } from "@/lib/actions/contract";
import { getGasStations } from "@/lib/actions/gasStation";

const Contratos = async () => {
    const resContratos = await getContracts();
    const resPostos = await getGasStations();
    const session = await auth();
    const isAdmin = session?.user.role === 'ADMIN';

    return (<>
        <HeaderTemplate title="Contratos">
            {
                isAdmin && (<AddContrato postos={resPostos.success ? resPostos.data : []}/>)
            }
        </HeaderTemplate>
        {
            resContratos.success && resContratos.data.length > 0? 
                <ContratosList contratos={resContratos.data} postos={resPostos.success ? resPostos.data : []} isAdmin={isAdmin}/>
            :
                <div className="flex flex-col m-2 lg:m-10 items-center justify-center text-center p-12 bg-slate-950 border border-slate-800 text-slate-400 rounded-none">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nenhum contrato encontrado</h3>
                    <p className="text-xs text-slate-500 mt-1 uppercase">Cadastre novas unidades .</p>
                </div>
        }
    </>)
}

export default Contratos;
