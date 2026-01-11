import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../shared/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const trans = t.admin;

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuth');
    window.location.href = '/manager';
  };

  const navItems = [
    { name: trans.nav.dashboard, icon: 'dashboard', path: '/admin/dashboard' },
    { name: trans.nav.bookings, icon: 'calendar_month', path: '/admin/bookings' },
    { name: trans.nav.clubs, icon: 'golf_course', path: '/admin/clubs' },
    { name: trans.nav.slotManagement, icon: 'schedule', path: '/admin/slots' },
    { name: trans.nav.users, icon: 'group', path: '/admin/users' },
    { name: trans.nav.reports, icon: 'bar_chart', path: '/admin/reports' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border-light transition-transform duration-300 lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-16 flex items-center px-6 gap-3 border-b border-border-light">
        <div className="bg-primary text-white aspect-square rounded-full h-8 w-8 flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-[20px]">sports_golf</span>
        </div>
        <div>
          <h1 className="text-text-main text-base font-bold leading-tight">GolfAdmin</h1>
          <p className="text-primary text-[10px] font-bold uppercase tracking-widest">Management</p>
        </div>
      </div>

      <nav className="p-4 flex flex-col gap-1 flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${isActive
                ? 'bg-primary-subtle text-primary border border-primary-light font-bold'
                : 'text-text-muted hover:bg-slate-50 hover:text-text-main font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`material-symbols-outlined text-[22px] ${isActive ? 'fill-1' : ''}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}

        <div className="my-4 border-t border-border-light mx-2"></div>
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tools</p>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-slate-50 hover:text-text-main font-medium transition-all group">
          <span className="material-symbols-outlined text-[22px]">inventory_2</span>
          <span className="text-sm">{trans.nav.inventory}</span>
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-slate-50 hover:text-text-main font-medium transition-all group">
          <span className="material-symbols-outlined text-[22px]">payments</span>
          <span className="text-sm">{trans.nav.finance}</span>
        </button>
      </nav>

      <div className="p-4 border-t border-border-light space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:bg-slate-50 hover:text-text-main font-medium transition-all">
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <span className="text-sm">{trans.nav.settings}</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">logout</span>
          <span className="text-sm">{trans.nav.logout}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
