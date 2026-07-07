import DateCalendarPicker from "@/components/admin/shared/DateCalendarPicker";

const Admin = () => {
  return (
    <>
      <header className="
        w-full 
        bg-white 
        border-b border-slate-200 
        px-5 py-5 md:px-8 md:py-6
        flex flex-col gap-5 
        md:flex-row md:items-center md:justify-between
      ">
        {/* Bloco de Texto (Título e Subtítulo) */}
        <div className="flex flex-col gap-0.5">
          <h1 className="text-lg md:text-xl font-black tracking-wider text-[var(--secondary-color)] uppercase font-sans">
            Dashboard
          </h1>
          <p className="text-[11px] md:text-xs font-semibold text-slate-400 uppercase tracking-wide font-sans">
            Visão geral do sistema de abastecimento
          </p>
        </div>

        {/* Bloco do Seletor de Data */}
        <div className="flex justify-start md:justify-end shrink-0 w-full md:w-auto">
          <DateCalendarPicker />
        </div>
      </header>
    </>
  )
}

export default Admin;