import React from 'react';
import { Link } from 'react-router-dom';
import { PageId } from '../types';
import { useLanguage } from '../../shared/LanguageContext';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (id: PageId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const { t } = useLanguage();
  const trans = t.manager;

  const handleLogout = () => {
    localStorage.removeItem('isManagerAuth');
    window.location.href = '/manager';
  };

  const navItems = [
    { id: 'tee-sheet', label: trans.nav.teeSheet, icon: 'calendar_month' },
    { id: 'staff', label: trans.nav.staff, icon: 'groups' },
    { id: 'pricing', label: trans.nav.pricing, icon: 'payments' },
    { id: 'courses', label: trans.nav.courses, icon: 'map' },
    { id: 'reports', label: trans.nav.reports, icon: 'bar_chart' },
  ];

  return (
    <aside className="w-64 bg-surface-light border-r border-slate-200 flex flex-col justify-between shrink-0 z-30 shadow-sm hidden md:flex">
      <div className="flex flex-col h-full">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 shadow-sm border border-slate-100 flex items-center justify-center bg-primary"
            >
              <span className="material-symbols-outlined text-black font-bold">sports_golf</span>
            </div>
            <h1 className="text-slate-900 text-lg font-bold tracking-tight">ClubManager</h1>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as PageId)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group w-full text-left ${activePage === item.id
                  ? 'bg-primary/10 text-slate-900 font-semibold'
                  : 'hover:bg-slate-50 text-slate-600 font-medium'
                  }`}
              >
                <span className={`material-symbols-outlined ${activePage === item.id ? 'text-green-700 fill-1' : 'text-slate-400'}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link
            to="/admin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-50/50 text-emerald-700 hover:bg-emerald-50 transition-colors group w-full text-left"
          >
            <span className="material-symbols-outlined text-emerald-600">admin_panel_settings</span>
            <span className="text-sm font-bold">{trans.nav.adminPortal}</span>
          </Link>
          <button
            onClick={() => onNavigate('settings')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group w-full text-left ${activePage === 'settings'
              ? 'bg-primary/10 text-slate-900'
              : 'hover:bg-slate-50 text-slate-600'
              }`}
          >
            <span className="material-symbols-outlined text-slate-400">settings</span>
            <span className="text-sm font-medium">{trans.nav.settings}</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors group w-full text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">{trans.nav.logout}</span>
          </button>
          <div className="flex items-center gap-3 mt-4 px-3">
            <div
              className="size-8 rounded-full bg-slate-200 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: `url('https://picsum.photos/seed/admin/100/100')` }}
            />
            <div className="flex flex-col">
              <p className="text-xs font-semibold text-slate-900">Jane Cooper</p>
              <p className="text-xs text-slate-500">{trans.proShopManager}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
