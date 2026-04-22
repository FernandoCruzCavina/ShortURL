import React, { useState, useEffect } from "react";
import { 
  LuBell, LuCopy, LuExternalLink, LuMoon, LuLink, LuSearch, LuFilter, 
  LuChevronDown, LuChevronLeft, LuChevronRight, LuQrCode, LuSun
} from "react-icons/lu";
import { RiEditLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { TbChartBar } from "react-icons/tb";
import { links, metrics } from "./constants";

const Dashboard = () => {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("https://shorturl.com/abcd123");

    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light";
        }
        return "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-[#1e293b] dark:text-slate-200 font-sans p-8 transition-colors duration-300">
            <header className="max-w-7xl mx-auto flex justify-between items-center mb-8">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-bold text-xl">
                    <div className="bg-blue-600 p-1 rounded-md"> 
                        <LuLink className="text-white" size={20} />
                    </div>
                    ShortURL
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex gap-4 text-gray-500 dark:text-gray-400">
                        <button 
                            onClick={toggleTheme}
                            className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer"
                        >
                            {theme === "dark" ? <LuMoon size={20} className="text-blue-400" /> : <LuSun size={20} />}
                        </button>
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer">
                            <LuBell size={20} />
                        </button>
                    </div>
                    <div className="flex items-center gap-3 border-l pl-6 border-gray-200 dark:border-slate-800">
                        <div className="w-9 h-9 bg-purple-600 text-white flex items-center justify-center rounded-full font-medium">
                            F
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer group">
                            <span className="text-sm font-semibold group-hover:text-blue-600 transition-colors">
                                Fernando Cruz
                            </span>
                            <LuChevronDown size={16} className="text-gray-400" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm mb-8">
                    <h2 className="text-xl font-bold mb-1 text-slate-800 dark:text-white">Encurtar novo link</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                        Cole uma URL longa para gerar um link curto e compartilhável.
                    </p>

                    <div className="flex flex-col md:flex-row gap-3 mb-5">
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://www.exemplo.com/blog/..."
                            className="flex-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:text-white outline-none transition-all"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-3.5 rounded-xl transition-colors shadow-lg shadow-blue-500/20 cursor-pointer">
                            Encurtar
                        </button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1 bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-900/30 rounded-xl px-5 py-3.5 flex justify-between items-center">
                            <span className="text-blue-600 dark:text-blue-400 font-medium truncate mr-4">{shortUrl}</span>
                            <button className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 p-1.5 bg-gray-50 dark:bg-slate-700 rounded-lg transition-colors cursor-pointer">
                                <LuCopy size={18} />
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 px-6 py-3.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                                Abrir <LuExternalLink size={18} />
                            </button>
                            <button className="p-3.5 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer">
                                <LuQrCode size={20} />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {metrics.map((item, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-5">
                        <div className={`${item.bg} ${item.color} p-4 rounded-2xl`}>
                            {React.cloneElement(item.icon, { size: 24 })}
                        </div>
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{item.label}</p>
                            <p className="text-2xl font-bold text-slate-800 dark:text-white">{item.value}</p>
                            <p className="text-xs font-semibold text-green-500 mt-0.5">{item.perc} <span className="text-slate-400 dark:text-slate-500 font-normal">este mês</span></p>
                        </div>
                    </div>
                ))}
                </section>

                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Seus links</h2>
                        <div className="flex gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:w-80">
                                <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={18} />
                                <input
                                    placeholder="Buscar links..."
                                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none focus:border-blue-500 dark:text-white"
                                />
                            </div>
                            <button className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
                                Todos <LuChevronDown size={16} />
                            </button>
                            <button className="p-2.5 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer">
                                <LuFilter size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-t border-gray-100 dark:border-slate-800">
                            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold text-left">
                                <tr>
                                    <th className="px-8 py-4">URL Original</th>
                                    <th className="px-8 py-4">Link Curto</th>
                                    <th className="px-8 py-4">Cliques</th>
                                    <th className="px-8 py-4">Criado em</th>
                                    <th className="text-right px-8 py-4">Ações</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {links.map((link, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                                        <td className="px-8 py-5 max-w-md">
                                            <div className="font-semibold text-slate-700 dark:text-slate-200 truncate mb-1">{link.title}</div>
                                            <div className="text-slate-400 dark:text-slate-500 text-xs truncate">{link.url}</div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group cursor-pointer">
                                                {link.short}
                                                <LuCopy size={14} className="text-gray-300 dark:text-slate-600 group-hover:text-blue-500" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-slate-700 dark:text-slate-200">{link.clicks}</span>
                                                <svg width="40" height="12" className="text-green-500 opacity-70">
                                                    <path d="M0 10 Q 10 0, 20 8 T 40 2" fill="none" stroke="currentColor" strokeWidth="2" />
                                                </svg>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-slate-500 dark:text-slate-400">{link.date}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-100 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer">
                                                    <TbChartBar size={18} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-gray-100 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer">
                                                    <RiEditLine size={18} />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border border-gray-100 dark:border-slate-800 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-all cursor-pointer">
                                                    <SlOptionsVertical size={16}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-8 py-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
                        <p>Mostrando 1 a {links.length} de {links.length} resultados</p>
                        <div className="flex items-center gap-2">
                            <button className="p-2 border border-gray-200 dark:border-slate-700 rounded-lg disabled:opacity-30 cursor-pointer disabled:cursor-no-drop" disabled>
                                <LuChevronLeft size={18} />
                            </button>
                            <button className="w-9 h-9 bg-blue-600 text-white rounded-lg font-medium shadow-md shadow-blue-500/20">1</button>
                            <button className="p-2 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-all cursor-pointer disabled:cursor-no-drop">
                                <LuChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;