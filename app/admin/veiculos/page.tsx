import { auth } from "@/auth";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddVeiculo from "@/components/admin/veiculos/AddVeiculo";
import VeiculosList from "@/components/admin/veiculos/VeiculosList";
import { getVehicles } from "@/lib/actions/vehicle";
import { Fuel } from "lucide-react";

const Veiculos = async () => {
    const vehiclesRes = await getVehicles();
    const session = await auth();
    const isAdmin = session?.user.role === 'ADMIN';



    return (<>
        <HeaderTemplate title="Veículos">
        {
            isAdmin && (<AddVeiculo />)
        }
        </HeaderTemplate>
        {vehiclesRes.success && vehiclesRes.data.length > 0 ?
            <VeiculosList items={vehiclesRes.data} isAdmin={isAdmin}/>
        :
            <div className="flex m-2 lg:m-10 flex-col items-center justify-center text-center p-12 bg-slate-950 border border-slate-800 text-slate-400 rounded-none">
                <Fuel size={32} className="text-slate-600 mb-2.5" />
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Nenhum veículo na frota</h3>
                <p className="text-xs text-slate-500 mt-1 uppercase">Cadastre novas unidades operacionais no painel.</p>
            </div>
        }
    </>)
}

export default Veiculos;
