import { useState, useEffect } from "react";
import { LuLink, LuMail, LuLock, LuUser, LuGithub, LuArrowRight, LuSun, LuMoon } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light";
        }
        return "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 flex items-center justify-center p-6 transition-colors duration-300">
            <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="absolute top-6 right-6 p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 shadow-sm"
            >
                {theme === "dark" ? <LuMoon size={20} className="text-blue-400" /> : <LuSun size={20} /> }
            </button>

            <div className="w-full max-w-md">
                <div className="flex justify-center items-center gap-2 text-blue-600 dark:text-blue-500 font-bold text-2xl mb-8">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <LuLink className="text-white" size={24} />
                    </div>
                    ShortURL
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-500/5 dark:shadow-none">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                            {isLogin ? "Bem-vindo de volta" : "Crie sua conta"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
                            {isLogin 
                                ? "Acesse seus links e métricas agora mesmo." 
                                : "Comece a encurtar e gerenciar seus links gratuitamente."
                            }
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-700 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            <FcGoogle size={20} /> Google
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-gray-200 dark:border-slate-700 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            <LuGithub size={20} className="dark:text-white" /> GitHub
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 dark:text-slate-500">Ou continue com e-mail</span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Nome completo</label>
                                <div className="relative">
                                    <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={18} />
                                    <input 
                                        type="text" 
                                        placeholder="Fernando Cruz"
                                        className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 pl-11 pr-4 py-3 rounded-xl text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">E-mail</label>
                            <div className="relative">
                                <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={18} />
                                <input 
                                    type="email" 
                                    placeholder="exemplo@email.com"
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 pl-11 pr-4 py-3 rounded-xl text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1.5">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha</label>
                                {isLogin && (
                                <a href="#" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">Esqueceu a senha?</a>
                                )}
                            </div>
                            <div className="relative">
                                <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" size={18} />
                                <input 
                                type="password" 
                                placeholder="••••••••"
                                className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 pl-11 pr-4 py-3 rounded-xl text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-500/20 cursor-pointer">
                            {isLogin ? "Entrar na conta" : "Criar minha conta"}
                            <LuArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-8">
                        {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}{" "}
                        <button 
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all cursor-pointer"
                        >
                            {isLogin ? "Cadastre-se grátis" : "Faça login"}
                        </button>
                    </p>
                </div>

                <div className="mt-8 text-center text-slate-400 dark:text-slate-600 text-xs font-medium">
                    &copy; 2026 ShortURL. Todos os direitos reservados.
                    <div className="flex justify-center gap-4 mt-2">
                        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-400">Termos</a>
                        <a href="#" className="hover:text-slate-600 dark:hover:text-slate-400">Privacidade</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;