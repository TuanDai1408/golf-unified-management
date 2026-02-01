import React, { useState } from 'react';
import TeeSheetCalendar from './TeeSheetCalendar';
import TeeSheetList from './TeeSheetList';
import { useLanguage } from '../../../shared/LanguageContext';

const TeeSheet: React.FC = () => {
    const [view, setView] = useState<'calendar' | 'list'>('calendar');
    const { t } = useLanguage();
    const trans = t.admin.manager.header;

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Sub-header for Tee Sheet */}
            <div className="bg-white border-b border-slate-200 px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">{trans.teeSheetTitle}</h2>
                    <p className="text-slate-500 text-xs">{trans.teeSheetSub}</p>
                </div>

                <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
                    <button
                        onClick={() => setView('calendar')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'calendar' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
                    >
                        {trans.daily}
                    </button>
                    <button
                        onClick={() => setView('list')}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === 'list' ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'}`}
                    >
                        {trans.list}
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{trans.occupancy}</span>
                        <span className="text-sm font-bold text-slate-900">88%</span>
                    </div>
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{trans.revenue}</span>
                        <span className="text-sm font-bold text-slate-900">$12,450</span>
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-slate-900 text-sm font-bold h-9 px-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        <span>{trans.newBooking}</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                {view === 'calendar' ? <TeeSheetCalendar /> : <TeeSheetList />}
            </div>
        </div>
    );
};

export default TeeSheet;
