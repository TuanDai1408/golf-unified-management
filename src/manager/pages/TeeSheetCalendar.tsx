
import React from 'react';
import { useLanguage } from '../../shared/LanguageContext';

const TeeSheetCalendar: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.manager.teeSheet;
  const holes = [
    { name: 'Hole 1', stats: 'Par 4 • 380y' },
    { name: 'Hole 10', stats: 'Par 5 • 510y' },
    { name: 'Hole 1', stats: 'Par 4 • 410y', course: 'South' },
    { name: 'Hole 10', stats: 'Par 3 • 185y', course: 'South' },
    { name: 'Hole 2', stats: 'Par 4 • 405y' },
    { name: 'Hole 3', stats: 'Par 5 • 520y' },
  ];

  const hours = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-white">
      {/* Legend */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center gap-6 text-xs text-slate-500 shrink-0">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-primary shadow-sm ring-1 ring-black/5"></span>
          <span>{trans.legendConfirmed}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-amber-400 shadow-sm ring-1 ring-black/5"></span>
          <span>{trans.legendPending}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-slate-300 shadow-sm ring-1 ring-black/5"></span>
          <span>{trans.legendBlocked}</span>
        </div>
        <div className="ml-auto text-slate-400">{trans.lastUpdated}</div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto custom-scrollbar relative">
        <div className="sticky top-0 z-20 flex min-w-max bg-surface-light border-b border-slate-200 shadow-sm">
          <div className="sticky left-0 z-30 w-48 bg-surface-light border-r border-slate-200 p-3 flex items-end pb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{trans.resources}</span>
          </div>
          <div className="flex">
            {hours.map(h => (
              <div key={h} className="w-64 border-r border-slate-200/60 p-2 text-xs font-semibold text-slate-500 bg-slate-50">{h}</div>
            ))}
          </div>
        </div>

        {/* Current Time Line */}
        <div className="absolute top-10 bottom-0 left-[340px] w-px bg-red-400 z-10 pointer-events-none shadow-[0_0_4px_rgba(248,113,113,0.6)]">
          <div className="absolute -top-1 -left-1.5 size-3 bg-red-400 rounded-full"></div>
        </div>

        {/* Rows */}
        <div className="min-w-max pb-10">
          <div className="sticky left-0 z-10 w-full px-4 py-1 text-xs font-bold text-slate-900 bg-slate-100/80 backdrop-blur-sm border-b border-slate-200">North Course</div>

          {/* Hole 1 Row */}
          <div className="flex h-20 border-b border-slate-100 group relative hover:bg-slate-50/30">
            <div className="sticky left-0 z-10 w-48 bg-white border-r border-slate-200 p-3 flex flex-col justify-center">
              <span className="font-semibold text-sm text-slate-800">Hole 1</span>
              <span className="text-xs text-slate-400">Par 4 • 380y</span>
            </div>
            <div className="flex relative w-full bg-[linear-gradient(90deg,transparent_63px,#f1f5f9_64px)] bg-[length:64px_100%]">
              <div className="absolute top-2 bottom-2 left-[256px] w-44 bg-primary border border-green-400 rounded-md shadow-sm p-2 cursor-pointer z-10">
                <div className="flex flex-col h-full justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">Smith, J.</span>
                    <span className="material-symbols-outlined text-[14px] text-slate-800">group</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-medium text-slate-800">07:00</span>
                    <span className="text-[10px] text-slate-700">• 4 pax</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-2 bottom-2 left-[480px] w-44 bg-amber-50 border-l-4 border-amber-400 rounded-r-md border-y border-r border-amber-200 shadow-sm p-2 cursor-pointer z-10">
                <div className="flex flex-col h-full justify-between">
                  <span className="text-xs font-bold text-slate-900 truncate">Williams, T.</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-medium text-slate-700">07:50</span>
                    <span className="text-[10px] px-1 rounded bg-amber-200 text-amber-900">{trans.unpaid}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky left-0 z-10 w-full px-4 py-1 text-xs font-bold text-slate-900 bg-slate-100/80 backdrop-blur-sm border-b border-slate-200 mt-4">South Course</div>

          {/* Hole 1 South row */}
          <div className="flex h-20 border-b border-slate-100 group relative">
            <div className="sticky left-0 z-10 w-48 bg-white border-r border-slate-200 p-3 flex flex-col justify-center">
              <span className="font-semibold text-sm text-slate-800">Hole 1</span>
              <span className="text-xs text-slate-400">Par 4 • 410y</span>
            </div>
            <div className="flex relative w-full bg-[linear-gradient(90deg,transparent_63px,#f1f5f9_64px)] bg-[length:64px_100%]">
              <div className="absolute top-1 bottom-1 left-[0px] w-[256px] bg-slate-100 border border-slate-200 rounded flex items-center justify-center opacity-80 z-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #e2e8f0 10px, #e2e8f0 20px)' }}>
                <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-medium text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">mop</span>
                  {trans.mowing}
                </div>
              </div>
            </div>
          </div>

          {/* More rows placeholder */}
          {holes.slice(4).map((h, i) => (
            <div key={i} className="flex h-20 border-b border-slate-100">
              <div className="sticky left-0 z-10 w-48 bg-white border-r border-slate-200 p-3 flex flex-col justify-center">
                <span className="font-semibold text-sm text-slate-800">{h.name}</span>
                <span className="text-xs text-slate-400">{h.stats}</span>
              </div>
              <div className="w-full bg-[linear-gradient(90deg,transparent_63px,#f1f5f9_64px)] bg-[length:64px_100%]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeeSheetCalendar;
