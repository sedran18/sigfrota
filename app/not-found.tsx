import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-slate-50 p-4">
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-700/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-slate-300/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="relative mb-8 h-12 w-40 sm:h-14 sm:w-48">
          <Image
            src="/logo.png"
            alt="Logo Institucional"
            fill
            sizes="192px"
            className="object-contain"
            priority
          />
        </div>

        <div className="w-full space-y-6 rounded-lg border border-slate-200/90 bg-white p-8 shadow-xl">
          
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-600">
            <FileQuestion className="h-10 w-10 stroke-[1.75]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-800">
              Erro 404
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Página não encontrada
            </h1>
            <p className="text-xs text-slate-600 sm:text-base">
              A página que você está tentando acessar não existe ou foi movida.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/solicitacoes"
              className="inline-flex cursor-pointer h-12 w-full items-center justify-center gap-2 rounded-md border border-emerald-900 bg-emerald-800 px-6 text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4 stroke-[2]" />
              Voltar para Solicitações
            </Link>
          </div>

        </div>

        <span className="mt-8 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          SIGFROTA • Sistema de Gestão
        </span>
      </div>
    </main>
  );
}