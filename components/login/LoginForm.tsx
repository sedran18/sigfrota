'use client'

import { Lock, Eye, EyeOff, User, CircleUserRound, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from 'react';
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const LoginForm = () => {
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [erro, setErro] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false);

    const ERROR_MESSAGES: Record<string, string> = {
        invalid_credentials: "Login ou senha inválidos. Verifique e tente novamente.",
        inactive_account: "Sua conta está desativada. Contate o administrador.",
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!user || !senha) {
            setErro("Preencha login e senha.");
            return;
        }

        setErro(null);
        setIsLoading(true);

        const result = await signIn("credentials", {
            name: user,
            password: senha,
            redirect: false,
        });

        if (result?.error) {
            setErro(ERROR_MESSAGES[result.error] ?? "Erro ao entrar. Tente novamente.");
            setIsLoading(false);
            return;
        }

        window.location.href = '/admin';
    };

    return (
            <div className="relative w-full  space-y-8 
            rounded-sm border border-slate-200/80 bg-[#fefefe] py-10 p-4 sm:p-8 lg:p-12 shadow-[0_0px_30px_rgb(0,0,0,0.04)]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 p-7 bg-emerald-700 rounded-full">
                   <User className="text-white" size={30}/>
                </div>
                <div className="text-center flex flex-col items-center space-y-3">

                    <div className="space-y-1">
                        <p className="text-2xl font-bold  mt-4 text-[var(--secondary-color)] uppercase">
                            Bem vindo!
                        </p>
                        <h1 className="text-base mt-5 tracking-tight text-[var(--text1)]  mx-auto">
                            Sistema Integrado de Gestão de Frota
                        </h1>
                    </div>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-1.5">
                        <label htmlFor="user" className="text-[11px] font-bold uppercase tracking-wider text-[var(--text1)]">
                            Login
                        </label>
                        <div className="relative flex items-center">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <CircleUserRound className="h-4 w-4 text-slate-400 stroke-[1.75]" />
                            </div>
                            <Input 
                                type="text" 
                                name="user"
                                id="user"
                                value={user}
                                onChange={e => setUser(e.target.value)}
                                disabled={isLoading}
                                placeholder='Login'
                                className="w-full pl-10  h-13 border-slate-300 focus:border-emerald-700 focus:ring-emerald-700/20 rounded-sm shadow-none placeholder:text-slate-400 text-base transition-all bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label htmlFor="senha" className="text-[11px] font-bold uppercase tracking-wider text-[var(--text1)]">
                            Senha
                        </label>
                        <div className="relative flex items-center">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-4 w-4 text-slate-400 stroke-[1.75]" />
                            </div>
                            <Input 
                                type={showPassword ? "text" : "password"} 
                                name="senha"
                                id="senha"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                disabled={isLoading}
                                placeholder='********'
                                className="w-full h-13 pl-10 pr-10 border-slate-300 focus:border-emerald-700 focus:ring-emerald-700/20 rounded-sm shadow-none placeholder:text-slate-400 text-base transition-all bg-white disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {showPassword ? <EyeOff size={16} className="stroke-[1.75]" /> : <Eye size={16} className="stroke-[1.75]" />}
                            </button>
                        </div>
                    </div>

                    {erro && (
                        <div className="border border-rose-200 bg-rose-50 px-3 py-2.5 rounded-sm">
                            <p className="text-xs font-semibold text-rose-700">
                                Login ou senha inválidos. Verifique e tente novamente.
                            </p>
                        </div>
                    )}

                    <Button
                        type="submit" 
                        disabled={isLoading}
                        className="w-full h-15 bg-emerald-800 hover:bg-emerald-900 
                        text-white font-semibold text-md rounded-sm 
                        shadow-none transition-all duration-200 
                        focus:outline-none focus:ring-2 focus:ring-emerald-700 
                        focus:ring-offset-2 tracking-widest 
                        uppercase mt-4 border border-emerald-900
                        cursor-pointer
                        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:bg-emerald-800
                        flex items-center justify-center gap-2
                        "
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Entrando...
                            </>
                        ) : (
                            "ENTRAR"
                        )}
                    </Button>
                </form>
            </div>
    )
}

export default LoginForm;