import { auth } from "@/auth";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddVeiculo from "@/components/admin/veiculos/AddVeiculo";
import VeiculosList from "@/components/admin/veiculos/VeiculosList";
import { getVehicles } from "@/lib/actions/vehicle";
import {Inbox } from "lucide-react";

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
        <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white border border-slate-200 rounded-none mx-auto my-6 sm:my-8 w-full max-w-xl shadow-none">
            <Inbox size={32} className="text-slate-400 mb-2 sm:mb-3 w-7 h-7 sm:w-8 sm:h-8" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                Nenhum Veículo na Frota
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 uppercase font-medium">
                Cadastre novas unidades operacionais no painel.
            </p>
        </div>
        }
    </>)
}

export default Veiculos;
