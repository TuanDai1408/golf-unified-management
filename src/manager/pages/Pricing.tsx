
import React from 'react';
import { PricingSlot } from '../types';
import { useLanguage } from '../../shared/LanguageContext';

const Pricing: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.manager.pricing;
  const slots: PricingSlot[] = [
    { id: '1', time: '06:00 - 07:00', label: 'Early Bird', baseRate: 40 },
    { id: '2', time: '07:00 - 08:00', label: 'Standard', baseRate: 50 },
    { id: '3', time: '08:00 - 09:00', label: 'Prime Time', baseRate: 15 },
    { id: '4', time: '09:00 - 10:00', label: 'Prime Time', baseRate: 80 },
    { id: '5', time: '10:00 - 11:00', label: 'Maintenance', baseRate: 0, isMaintenance: true },
  ];

  return (
    <div className="p-10 flex flex-col items-center overflow-y-auto h-full custom-scrollbar">
      <div className="w-full max-w-[1200px] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-black tracking-tight">{trans.title}</h1>
            <p className="text-slate-500 max-w-2xl">{trans.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-full bg-slate-900 text-white text-sm font-medium shadow-md">{trans.today}</button>
            <button className="h-9 px-4 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium hover:border-primary">{trans.tomorrow}</button>
            <button className="h-9 px-4 rounded-full bg-white border border-slate-200 text-slate-900 text-sm font-medium hover:border-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">calendar_month</span> {trans.selectDates}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-xl border-l-4 border-primary bg-white border border-slate-200 p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
              <span className="material-symbols-outlined">edit_note</span>
            </div>
            <div>
              <p className="text-slate-900 text-sm font-bold">{trans.unsavedChanges}</p>
              <p className="text-slate-500 text-sm">{trans.unsavedSubtitle.replace('{count}', '2')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="h-10 px-6 rounded-lg border border-slate-200 font-bold text-sm hover:bg-slate-50">{trans.discard}</button>
            <button className="h-10 px-6 rounded-lg bg-primary text-slate-900 font-bold text-sm shadow-sm hover:shadow-md flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">save</span> {trans.saveAll}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase w-48">{trans.tableTimeSlot}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase w-48">{trans.tableBaseRate}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase w-40">{trans.tablePartnerNet}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase w-40">{trans.tablePlatformFee}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase w-48">{trans.tableCustomerPrice}</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase w-24">{trans.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slots.map(slot => (
                <tr key={slot.id} className={`group hover:bg-slate-50 transition-colors ${slot.id === '2' ? 'bg-green-50/30' : ''} ${slot.isMaintenance ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`size-2 rounded-full ${slot.isMaintenance ? 'bg-slate-300' : 'bg-primary shadow-[0_0_8px_rgba(19,236,109,0.6)]'}`}></div>
                      <span className={`font-medium ${slot.isMaintenance ? 'line-through text-slate-400' : 'text-slate-900'}`}>{slot.time}</span>
                    </div>
                    <span className="text-xs text-slate-400 ml-5 block">{slot.label}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative w-32">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                      <input
                        disabled={slot.isMaintenance}
                        className={`w-full rounded-lg border-slate-200 bg-white pl-7 py-2 font-bold text-right tabular-nums focus:ring-primary ${slot.baseRate < 20 && !slot.isMaintenance ? 'border-red-300 text-red-600 bg-red-50' : 'text-slate-900'}`}
                        type="number"
                        defaultValue={slot.baseRate.toFixed(2)}
                      />
                      {slot.baseRate < 20 && !slot.isMaintenance && <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-red-500 material-symbols-outlined text-lg animate-pulse">warning</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-slate-900 font-medium tabular-nums">{slot.isMaintenance ? '-' : `$${slot.baseRate.toFixed(2)}`}</span></td>
                  <td className="px-6 py-4"><span className="text-slate-500 tabular-nums">{slot.isMaintenance ? '-' : `$${(slot.baseRate * 0.1).toFixed(2)} (10%)`}</span></td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-md text-sm font-bold tabular-nums ${slot.isMaintenance ? 'bg-slate-100 text-slate-400' : 'bg-slate-50 text-slate-900'}`}>
                      {slot.isMaintenance ? trans.closed : `$${(slot.baseRate * 1.1).toFixed(2)}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors p-1"><span className="material-symbols-outlined text-[20px]">{slot.id === '2' ? 'undo' : 'more_vert'}</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-50 text-purple-600"><span className="material-symbols-outlined">event_available</span></div>
                <h3 className="text-lg font-bold text-slate-900">{trans.overridesTitle}</h3>
              </div>
              <button className="text-sm font-medium text-primary hover:text-green-600">{t.admin.dashboard.viewAll}</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-lg border border-slate-200 shadow-sm">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Nov</span>
                    <span className="text-lg font-bold text-slate-900">24</span>
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold">Thanksgiving Morning</p>
                    <p className="text-xs text-slate-500">+20% Surge Pricing applied from 06:00 - 12:00</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-slate-900"><span className="material-symbols-outlined">edit</span></button>
              </div>
              <div className="flex items-center justify-center p-4 rounded-lg border border-dashed border-slate-300 hover:border-primary hover:bg-green-50/30 cursor-pointer transition-all">
                <div className="flex items-center gap-2 text-slate-500 hover:text-primary"><span className="material-symbols-outlined">add_circle</span><span className="font-medium">{trans.addOverride}</span></div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-6 text-slate-900">{trans.summaryTitle}</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">{trans.avgBaseRate}</span><span className="font-bold">$68.50</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">{trans.lowestPrice}</span><span className="font-bold">$40.00</span></div>
                <div className="flex justify-between items-center"><span className="text-slate-500 text-sm">{trans.highestPrice}</span><span className="font-bold">$120.00</span></div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="bg-blue-50 p-4 rounded-lg flex gap-3">
                <span className="material-symbols-outlined text-blue-600">info</span>
                <p className="text-xs text-blue-800 leading-relaxed">Tip: Weekends are currently 15% higher than weekdays. Consider adjusting for the upcoming tournament.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
