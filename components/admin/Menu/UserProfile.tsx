'use client';

import { signOut } from "next-auth/react";
import {User, LogOut} from 'lucide-react';

const UserProfile = ({userName}: {userName: string}) => (
    <div className="p-4 border-t border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
          <User size={20} />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-semibold text-slate-800  ">{userName}</p>
        </div>
      </div>
      
      <button 
        onClick={() => signOut({ callbackUrl: "/login" })} 
        className="p-2 cursor-pointer text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
        title="Sair da conta"
      >
        <LogOut size={18} />
      </button>
    </div>
  );

export default UserProfile;