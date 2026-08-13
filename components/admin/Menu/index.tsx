import Image from "next/image";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import MenuMobile from "./MenuMobile";

const Menu = ({userName, isAdmin}: {userName: string, isAdmin: boolean}) => {
  return (
    <>
    {/* Desktop */}
      <aside className="hidden md:flex fixed  left-0 md:w-50  lg:w-72 bg-white border-r border-slate-200 flex-col justify-between h-full">
        <div className="flex flex-col">
          {/* Logo */}
          <div className="p-6 flex justify-center items-center border-b border-slate-100">
            <Image 
              src="/logo.png" 
              alt='Logo do Consórcio de Desenvolvimento Sustentável da Bacia do Paramirim'
              width={180}
              height={60}
              className="object-contain h-auto w-auto"
              priority
            />
          </div>
          <NavLinks isAdmin={isAdmin}/>
        </div>

        <UserProfile userName={userName} />
      </aside>

      {/* Mobile */}
      <MenuMobile userName={userName} isAdmin={isAdmin}/>
     
      
    </>
  );
};

export default Menu;