import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddPosto from "@/components/admin/postos/AddPosto";
import PostosList from "@/components/admin/postos/PostosList";
import { getGasStations } from "@/lib/actions/gasStation";
import { Building2 } from "lucide-react";

const Postos = async () => {
    const gasStations = await getGasStations();

    return (<>
        <HeaderTemplate title="Postos">
            <AddPosto />
        </HeaderTemplate>
        {
            gasStations.success && gasStations.data.length > 0?
                <PostosList gasStations={gasStations.data}  />
            :
                <div className="flex m-2 lg:m-10 flex-col gasStations-center justify-center text-center p-12 bg-slate-50 border border-slate-200 rounded-none">
                    <Building2 size={32} className="text-slate-400 mb-2.5" />
                    <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Nenhum posto credenciado</h3>
                    <p className="text-xs text-slate-400 mt-1">Cadastre os postos de combustível parceiros para exibir aqui.</p>
                </div>            
        }

    </>)
}

export default Postos;
