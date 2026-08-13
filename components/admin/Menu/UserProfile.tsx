'use client';

import { signOut } from "next-auth/react";
import { User, LogOut } from 'lucide-react';

const UserProfile = ({ userName }: { userName: string }) => (
  <div className="p-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
    <div className="flex items-center gap-3 min-w-0">
      <div className="h-9 w-9 rounded-none bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 shrink-0 font-mono font-bold text-xs">
        <User size={18} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
          Acesso Autorizado
        </span>
        <p className="text-xs font-bold text-slate-900 truncate uppercase">
          {userName}
        </p>
      </div>
    </div>
    
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })} 
      className="p-2 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-none border border-transparent hover:border-red-200 transition-colors shrink-0"
      title="Encerrar Sessão"
      aria-label="Encerrar Sessão"
    >
      <LogOut size={16} />
    </button>
  </div>
);

export default UserProfile;