import React, { ReactNode } from "react";

type HeaderTemplateProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

const HeaderTemplate = ({
  title,
  description,
  children,
}: HeaderTemplateProps) => {
  return (
    <header
      className="
        w-full 
        bg-white
        px-5 py-5 md:px-8 md:py-6
        flex flex-col gap-5 
        md:flex-row md:items-center md:justify-between
      "
    >
      <div className="flex flex-col gap-0.5">
        <h1 className="text-lg md:text-2xl font-black tracking-wider text-[var(--secondary-color)] uppercase font-sans">
          {title}
        </h1>

        <p className="text-[11px] md:text-xs font-semibold text-slate-400 uppercase tracking-wide font-sans">
          {description}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row  gap-3 w-auto">
        {children}
      </div>
    </header>
  );
};

export default HeaderTemplate;