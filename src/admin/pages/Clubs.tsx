
import React from 'react';
import { ClubStatus } from '../types';
import { useLanguage } from '../../shared/LanguageContext';

const Clubs: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.admin.clubs;

  const clubs = [
    { name: "Pine Valley Golf Club", id: "#GC-4921", location: "Clementon, NJ", holes: 18, par: 70, status: ClubStatus.Open, bookings: "48/60", trend: "+12%", progress: 80, image: "https://picsum.photos/seed/golf1/200/200" },
    { name: "Augusta National", id: "#GC-8832", location: "Augusta, GA", holes: 18, par: 72, status: ClubStatus.Maintenance, bookings: "0/0", trend: "-", progress: 0, image: "https://picsum.photos/seed/golf2/200/200" },
    { name: "Cypress Point", id: "#GC-1029", location: "Pebble Beach, CA", holes: 18, par: 72, status: ClubStatus.Open, bookings: "32/50", trend: "+5%", progress: 64, image: "https://picsum.photos/seed/golf3/200/200" },
    { name: "Shinnecock Hills", id: "#GC-3321", location: "Southampton, NY", holes: 18, par: 70, status: ClubStatus.Closed, bookings: "0/60", trend: "-100%", progress: 0, image: "https://picsum.photos/seed/golf4/200/200" },
    { name: "Oakmont Country Club", id: "#GC-7712", location: "Plum, PA", holes: 18, par: 71, status: ClubStatus.Open, bookings: "55/55", trend: "Full", progress: 100, image: "https://picsum.photos/seed/golf5/200/200" },
  ];

  const statusTags = [
    { label: trans.filterAll, active: true, color: 'primary' },
    { label: t.admin.slots.statusAvailable, active: false, color: 'emerald' },
    { label: trans.statusMaintenance, active: false, color: 'amber' },
    { label: t.admin.slots.statusClosed, active: false, color: 'red' },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-text-main tracking-tight">{trans.title}</h2>
          <p className="text-text-muted font-medium">{trans.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 h-12 rounded-xl border border-border-light bg-white text-text-main text-sm font-black hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            {t.admin.common.export}
          </button>
          <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-black shadow-lg shadow-green-200 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
            {trans.addClub}
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-border-light shadow-sm flex flex-col xl:flex-row gap-6 items-center">
        <div className="relative w-full xl:w-80 group">
          <input
            className="w-full h-11 rounded-xl bg-slate-50 border border-border-light text-text-main placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary pl-10 text-sm font-medium"
            placeholder={trans.searchPlaceholder}
          />
          <span className="material-symbols-outlined absolute left-3 top-3 text-text-muted text-[20px] group-focus-within:text-primary transition-colors">search</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full">
          <span className="text-[10px] font-black uppercase text-text-muted tracking-widest mr-2">{trans.quickFilter}:</span>
          {statusTags.map((tag, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${tag.active
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-text-muted border-border-light hover:border-slate-400'
                }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border-light rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-border-light text-[11px] uppercase tracking-widest text-text-muted font-black">
                <th className="p-6">{trans.title.split(' ').slice(0, 2).join(' ')}</th>
                <th className="p-6">{t.admin.bookings.tableCourse}</th>
                <th className="p-6">{t.admin.reports.inventory}</th>
                <th className="p-6">{t.admin.slots.status}</th>
                <th className="p-6">{trans.bookingsToday}</th>
                <th className="p-6 text-right">{t.admin.bookings.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light font-medium">
              {clubs.map((club, i) => (
                <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div
                        className="h-12 w-12 rounded-xl bg-cover bg-center shrink-0 border border-border-light shadow-sm group-hover:scale-105 transition-transform"
                        style={{ backgroundImage: `url(${club.image})` }}
                      ></div>
                      <div className="flex flex-col">
                        <span className="text-text-main font-black text-base group-hover:text-primary transition-colors">{club.name}</span>
                        <span className="text-[11px] text-text-muted font-mono">{club.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-1.5 text-sm text-text-muted">
                      <span className="material-symbols-outlined text-[18px]">location_on</span>
                      {club.location}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded-lg bg-slate-50 border border-border-light text-[10px] text-text-muted font-black uppercase">{club.holes} {trans.holes}</span>
                      <span className="px-2 py-1 rounded-lg bg-slate-50 border border-border-light text-[10px] text-text-muted font-black uppercase">{trans.par} {club.par}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider ${club.status === ClubStatus.Open ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        club.status === ClubStatus.Maintenance ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-red-50 text-red-600 border-red-200'
                      }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${club.status === ClubStatus.Open ? 'bg-emerald-500' :
                          club.status === ClubStatus.Maintenance ? 'bg-amber-500 animate-pulse' :
                            'bg-red-500'
                        }`}></span>
                      {club.status === ClubStatus.Open ? t.admin.slots.statusAvailable :
                        club.status === ClubStatus.Maintenance ? trans.statusMaintenance :
                          t.admin.slots.statusClosed}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-end justify-between">
                        <span className="text-text-main font-black text-sm">{club.bookings}</span>
                        <span className={`text-[11px] font-bold ${club.trend.includes('+') ? 'text-emerald-600' : 'text-text-muted'}`}>{club.trend}</span>
                      </div>
                      <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div
                          className={`h-full transition-all duration-1000 ${club.progress === 100 ? 'bg-amber-500' : 'bg-primary'}`}
                          style={{ width: `${club.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-text-muted hover:text-text-main p-2 rounded-xl hover:bg-slate-200 transition-all">
                      <span className="material-symbols-outlined text-[22px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Clubs;
