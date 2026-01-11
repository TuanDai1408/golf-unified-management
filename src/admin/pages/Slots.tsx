
import React from 'react';
import { useLanguage } from '../../shared/LanguageContext';

const Slots: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.admin.slots;

  const hours = Array.from({ length: 13 }, (_, i) => `${(i + 6).toString().padStart(2, '0')}:00`);

  const resources = [
    { name: "Tee 01", type: "18 Holes • Par 72", color: "primary", icon: "flag" },
    { name: "Tee 02", type: "18 Holes • Par 72", color: "primary", icon: "flag" },
    { name: "Sim A", type: "Trackman • Indoor", color: "purple", icon: "golf_course" },
    { name: "Sim B", type: "Foresight • Indoor", color: "purple", icon: "golf_course" },
  ];

  const bookings = [
    { resource: "Tee 01", start: "06:00", end: "06:20", label: "Smith, J.", status: t.admin.bookings.paymentPaid, color: "slate" },
    { resource: "Tee 01", start: "06:40", end: "07:00", label: "Doe, A.", status: t.admin.bookings.statusPending, color: "blue" },
    { resource: "Sim A", start: "08:00", end: "10:00", label: "Corporate Event", status: "Private", color: "purple" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 lg:p-8 border-b border-border-light bg-slate-50/50 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-text-main tracking-tight">{trans.title}</h2>
            <div className="flex items-center gap-4 mt-3">
              <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-slate-200 text-text-muted transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-2 cursor-pointer group">
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">calendar_month</span>
                <h3 className="text-2xl font-black text-text-main">Wednesday, Oct 24</h3>
              </div>
              <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-slate-200 text-text-muted transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              <span className="px-3 py-1 bg-primary-subtle text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary-light">Today</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-2xl min-w-[160px] border border-border-light shadow-sm">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mb-1">{t.admin.dashboard.totalRevenue}</p>
              <p className="text-2xl font-black text-text-main">$4,250</p>
              <p className="text-primary text-[10px] font-bold mt-1">↑ +12% vs last Wed</p>
            </div>
            <div className="bg-white p-4 rounded-2xl min-w-[160px] border border-border-light shadow-sm">
              <p className="text-text-muted text-[10px] font-black uppercase tracking-widest mb-1">{t.admin.header.breadcrumb.split('/').pop()}</p>
              <p className="text-2xl font-black text-text-main">82%</p>
              <p className="text-blue-500 text-[10px] font-bold mt-1">↑ +5% vs avg</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-b border-border-light bg-white flex gap-2 overflow-x-auto">
        <button className="px-5 py-2 rounded-full bg-text-main text-white text-xs font-black shadow-md">{trans.bulkUpload}</button>
        <button className="px-5 py-2 rounded-full bg-white border border-border-light text-text-muted text-xs font-black hover:border-slate-400 transition-all">{trans.selectCourse}</button>
      </div>

      <div className="flex-1 overflow-auto bg-white p-6 relative">
        <div className="min-w-[1200px] border border-border-light rounded-2xl overflow-hidden shadow-sm flex flex-col h-full bg-white">
          <div className="flex bg-slate-50 border-b border-border-light">
            <div className="w-56 p-4 border-r border-border-light font-black text-text-muted text-[11px] uppercase tracking-widest">Resource</div>
            <div className="flex-1 flex">
              {hours.map(h => (
                <div key={h} className="flex-1 min-w-[140px] p-3 text-[11px] font-mono font-bold text-slate-400 border-r border-slate-200">{h}</div>
              ))}
            </div>
          </div>

          <div className="flex-1 divide-y divide-border-light overflow-y-auto">
            {resources.map((resource, i) => (
              <div key={i} className="flex group hover:bg-slate-50 transition-colors min-h-[110px]">
                <div className="w-56 p-5 border-r border-border-light bg-white sticky left-0 z-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`material-symbols-outlined text-[20px] ${resource.color === 'primary' ? 'text-primary' : 'text-purple-500'}`}>{resource.icon}</span>
                    <h4 className="font-black text-text-main text-sm">{resource.name}</h4>
                  </div>
                  <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">{resource.type}</p>
                </div>

                <div className="flex-1 flex relative p-4 gap-4 items-center">
                  {bookings.filter(b => b.resource === resource.name).map((b, idx) => (
                    <div key={idx} className={`h-20 w-60 rounded-xl border-l-4 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer ${b.color === 'slate' ? 'bg-slate-50 border-slate-500 border-y border-r' :
                        b.color === 'blue' ? 'bg-blue-50 border-blue-500 border-y border-r' :
                          'bg-purple-50 border-purple-500 border-y border-r'
                      }`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black uppercase text-slate-500 bg-white/80 px-1.5 py-0.5 rounded">{b.start} - {b.end}</span>
                        <span className="material-symbols-outlined text-slate-400 text-sm">drag_indicator</span>
                      </div>
                      <p className="font-bold text-sm text-slate-900 truncate">{b.label}</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{b.status}</p>
                    </div>
                  ))}

                  <div className="h-20 w-60 rounded-xl border-2 border-dashed border-border-light flex items-center justify-center hover:border-primary group cursor-pointer transition-all">
                    <span className="text-xs font-black text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest">+ {trans.createSlot}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-30">
        <button className="h-14 w-14 rounded-full bg-primary text-white shadow-xl shadow-green-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px] font-black">save</span>
        </button>
      </div>
    </div>
  );
};

export default Slots;
