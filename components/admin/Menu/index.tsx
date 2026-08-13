import Image from "next/image";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import MenuMobile from "./MenuMobile";

const Menu = ({ userName, isAdmin }: { userName: string; isAdmin: boolean }) => {
  return (
    <div>
      {/* Mobile */}
      <MenuMobile userName={userName} isAdmin={isAdmin} />

      {/* Desktop */}
      <aside
        className="
          hidden
          md:flex md:fixed md:left-0 md:top-0
          md:w-50 lg:w-72
          md:h-dvh
          flex-col
          overflow-hidden
          bg-white border-r border-slate-200
        "
      >
        <div className="shrink-0 py-3 flex justify-center items-center border-b border-slate-100">
          <Image
            src="/logo.png"
            alt="Logo do Consórcio de Desenvolvimento Sustentável da Bacia do Paramirim"
            width={300}
            height={300}
            className="object-contain h-16 md:h-20 lg:h-23 w-auto"
            priority
          />
        </div>

        <NavLinks isAdmin={isAdmin} />

        <div className="shrink-0">
          <UserProfile userName={userName} />
        </div>
      </aside>
    </div>
  );
};

export default Menu;