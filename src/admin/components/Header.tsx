
import React from 'react';
import { useLanguage } from '../../shared/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { t } = useLanguage();

  return (
    <header className="h-16 border-b border-border-light bg-surface/90 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 shrink-0 z-20 sticky top-0">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-text-muted hover:text-text-main">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden md:flex items-center">
          <span className="text-xs text-text-muted font-medium bg-slate-100 px-2 py-0.5 rounded border border-border-light">{t.admin.header.breadcrumb}</span>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-text-muted group-focus-within:text-primary transition-colors text-[20px]">search</span>
          </div>
          <input
            className="block w-full pl-10 pr-12 py-2 border-none rounded-lg leading-5 bg-slate-100 text-text-main placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
            placeholder={t.admin.header.searchPlaceholder}
            type="text"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-[10px] font-bold text-slate-400 border border-slate-300 rounded px-1.5 py-0.5">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <button className="relative p-2 rounded-full hover:bg-slate-100 text-text-muted hover:text-text-main transition-all">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="h-8 w-px bg-border-light mx-1"></div>
        <div className="flex items-center gap-3 cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-text-main leading-tight">{t.admin.header.adminName}</p>
            <p className="text-xs text-text-muted">{t.admin.header.adminRole}</p>
          </div>
          <div
            className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-white shadow-sm"
            style={{ backgroundImage: "url('https://picsum.photos/seed/admin/100/100')" }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
