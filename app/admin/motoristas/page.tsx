import { auth } from "@/auth";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddDriver from "@/components/admin/motoristas/AddDriver";
import MotoristasList from "@/components/admin/motoristas/MotoristasList";
import { getDrivers } from "@/lib/actions/driver";
import { Inbox } from "lucide-react";

const Motoristas = async () => {
  const [drivers, session] = await Promise.all([
    await getDrivers(),
    await auth()
  ])

  const isAdmin = session?.user.role === "ADMIN";

  return (
    <>
      <HeaderTemplate title="Motoristas">
        {isAdmin && <AddDriver />}
      </HeaderTemplate>

      {drivers.success && drivers.data.length > 0 ? (
        <MotoristasList drivers={drivers.data} isAdmin={isAdmin} />
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white border border-slate-200 rounded-none mx-auto my-6 sm:my-8 w-full max-w-xl shadow-none">
          <Inbox size={32} className="text-slate-400 mb-2 sm:mb-3 w-7 h-7 sm:w-8 sm:h-8" />
          <h3 className="text-xs sm:text-base font-bold text-slate-900 uppercase tracking-wider">
            Nenhum Motorista Cadastrado
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-600 mt-1 uppercase font-medium">
            Cadastre novos condutores para vincular aos veículos.
          </p>
        </div>
      )}
    </>
  );
};

export default Motoristas;