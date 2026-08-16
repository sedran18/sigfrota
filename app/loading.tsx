import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative h-12 w-40 animate-pulse sm:h-14 sm:w-48">
          <Image
            src="/logo.png"
            alt="Logo Institucional"
            fill
            sizes="192px"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex items-center gap-2.5 rounded-full bg-white px-4 py-2 shadow-sm border border-slate-200">
          <Loader2 className="h-4 w-4 animate-spin text-emerald-800" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Carregando...
          </span>
        </div>
      </div>
    </div>
  );
}