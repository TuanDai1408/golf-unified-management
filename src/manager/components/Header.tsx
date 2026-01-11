
import React from 'react';
import { PageId } from '../types';
import { useLanguage } from '../../shared/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  activePage: PageId;
  subView: 'calendar' | 'list';
  onSetSubView: (v: 'calendar' | 'list') => void;
  onNavigate: (id: PageId) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, subView, onSetSubView, onNavigate }) => {
  const { t } = useLanguage();

  const getPageTitle = () => {
    switch (activePage) {
      case 'tee-sheet': return t.manager.header.teeSheetTitle;
      case 'staff': return t.manager.header.staffTitle;
      case 'pricing': return t.manager.header.pricingTitle;
      case 'courses': return t.manager.header.courseTitle;
      default: return activePage.charAt(0).toUpperCase() + activePage.slice(1);
    }
  };

  const getPageSubtitle = () => {
    switch (activePage) {
      case 'tee-sheet': return t.manager.header.teeSheetSub;
      case 'staff': return t.manager.header.staffSub;
      case 'pricing': return t.manager.header.pricingSub;
      case 'courses': return t.manager.header.courseSub;
      default: return '';
    }
  };

  return (
    <header className="bg-surface-light border-b border-slate-200 px-6 py-4 z-50 shrink-0 relative overflow-visible">
      <div className="flex flex-col gap-4 overflow-visible">
        <div className="flex flex-wrap items-center justify-between gap-4 overflow-visible">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{getPageTitle()}</h2>
            <p className="text-slate-500 text-sm mt-0.5">{getPageSubtitle()}</p>
          </div>
          <div className="flex items-center gap-3 overflow-visible">
            <LanguageSwitcher />
            {activePage === 'tee-sheet' && (
              <div className="hidden lg:flex gap-4 mr-4">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t.manager.header.occupancy}</span>
                  <span className="text-sm font-bold text-slate-900">88%</span>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t.manager.header.revenue}</span>
                  <span className="text-sm font-bold text-slate-900">$12,450</span>
                </div>
              </div>
            )}
            <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium h-10 px-4 rounded-lg shadow-sm transition-colors">
              <span className="material-symbols-outlined text-[20px]">add</span>
              <span>{t.manager.header.newBooking}</span>
            </button>
            <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 text-slate-500">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </div>
        </div>

        {activePage === 'tee-sheet' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
              <button
                onClick={() => onSetSubView('calendar')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${subView === 'calendar' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                {t.manager.header.daily}
              </button>
              <button className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 text-sm font-medium hover:bg-slate-200/50 transition-colors">{t.manager.header.weekly}</button>
              <button
                onClick={() => onSetSubView('list')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${subView === 'list' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
              >
                {t.manager.header.list}
              </button>
            </div>
            <div className="flex items-center gap-4 flex-1 justify-center max-w-md">
              <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded-md transition-colors">
                <span className="material-symbols-outlined text-slate-500 text-[20px]">calendar_today</span>
                <span className="text-slate-900 font-semibold">October 24, 2023</span>
              </div>
              <button className="p-1.5 hover:bg-slate-100 rounded-full text-slate-500">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                <input className="pl-9 pr-4 py-1.5 h-9 w-48 lg:w-64 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-slate-400" placeholder={t.manager.header.searchPlayer} type="text" />
              </div>
              <button className="flex items-center justify-center size-9 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
