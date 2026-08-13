import { auth } from "@/auth";
import HeaderTemplate from "@/components/admin/HeaderTemplate";
import AddMotorista from "@/components/admin/motoristas/AddMotorista";
import MotoristasList from "@/components/admin/motoristas/MotoristasList";
import { getDrivers } from "@/lib/actions/driver";

const Motoristas = async () => {
  const drivers = await getDrivers();
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <>
      <HeaderTemplate title="Contratos">
        {isAdmin && <AddMotorista />}
      </HeaderTemplate>

      {drivers.success && drivers.data.length > 0 ? (
        <MotoristasList drivers={drivers.data} isAdmin={isAdmin} />
      ) : (
        <div className="flex m-2 lg:m-10 flex-col items-center justify-center text-center p-8 sm:p-12 bg-slate-950 border border-slate-800 text-slate-400 rounded-none">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Nenhum contrato encontrado
          </h3>
          <p className="text-xs text-slate-500 mt-1 uppercase">
            Cadastre novas unidades.
          </p>
        </div>
      )}
    </>
  );
};

export default Motoristas;