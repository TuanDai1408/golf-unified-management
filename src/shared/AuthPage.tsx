
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

interface AuthPageProps {
    type: 'admin' | 'manager';
    onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ type, onLogin }) => {
    const { t, language, setLanguage } = useLanguage();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const isManager = type === 'manager';
    const themeClass = isManager ? 'manager-theme' : 'admin-theme';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin') {
            onLogin();
        } else if (isManager && username === 'manager' && password === 'manager') {
            onLogin();
        } else {
            setError(t.auth.invalidCredentials);
        }
    };

    return (
        <div className={`${themeClass} min-h-screen flex items-center justify-center p-4 bg-slate-900 relative overflow-hidden text-slate-100`}>
            {/* Background Decor */}
            <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-700 ${isManager ? 'bg-emerald-500/10' : 'bg-green-600/10'}`} />
            <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-700 ${isManager ? 'bg-blue-500/10' : 'bg-emerald-600/10'}`} />

            <div className="max-w-md w-full relative z-10">
                <div className="flex justify-end mb-4 gap-2">
                    {(['vi', 'ko', 'en'] as const).map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-2 py-1 text-xs rounded border transition-all ${language === lang
                                    ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                                }`}
                        >
                            {lang.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="bg-slate-800/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="text-center mb-10">
                        <div className={`w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-1 ring-primary/30`}>
                            <span className="material-symbols-outlined text-4xl text-primary font-bold">
                                {isManager ? 'sports_golf' : 'admin_panel_settings'}
                            </span>
                        </div>
                        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
                            {isLogin ? t.auth.welcomeBack : t.auth.createAccount}
                        </h1>
                        <p className="text-slate-400 font-medium">
                            {isManager ? t.auth.managerPortal : t.auth.adminPortal}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 ml-1">{t.auth.email}</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">mail</span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-400 ml-1">{t.auth.username}</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">person</span>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                                    placeholder={t.auth.username}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between px-1">
                                <label className="text-sm font-bold text-slate-400">{t.auth.password}</label>
                                {isLogin && <a href="#" className="text-xs text-primary hover:underline">{t.auth.forgotPassword}</a>}
                            </div>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">lock</span>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-3.5 text-white outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-2 rounded-lg text-center font-medium">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-primary hover:brightness-110 text-slate-900 font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] mt-4"
                        >
                            {isLogin ? t.auth.signIn : t.auth.signUp}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm font-semibold">
                        <span className="text-slate-500">{isLogin ? t.auth.noAccount : t.auth.haveAccount}</span>
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="ml-2 text-primary hover:underline transition-colors"
                        >
                            {isLogin ? t.auth.register : t.auth.login}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
