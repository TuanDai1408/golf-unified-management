
import React from 'react';
import { Booking } from '../types';
import { useLanguage } from '../../shared/LanguageContext';

const TeeSheetList: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.manager.teeSheet;
  const bookings: Booking[] = [
    { id: '1', player: 'John Doe', time: '10:15 AM', pax: 4, holes: 18, cart: true, status: 'confirmed', payment: 'paid', refId: '#BK-9281' },
    { id: '2', player: 'Alice Smith', time: '10:00 AM', pax: 2, holes: 9, cart: false, status: 'checked-in', payment: 'at-counter', refId: '#BK-9275' },
    { id: '3', player: 'Michael Johnson', time: '09:45 AM', pax: 4, holes: 18, cart: true, status: 'checked-in', payment: 'paid', refId: '#BK-9260' },
    { id: '4', player: 'Robert Wilson', time: '09:30 AM', pax: 1, holes: 18, cart: false, status: 'pending', payment: 'due', refId: '#BK-9244' },
    { id: '5', player: 'Tom Kennedy', time: '09:15 AM', pax: 4, holes: 18, cart: true, status: 'cancelled', payment: 'refunded', refId: '#BK-9231' },
    { id: '6', player: 'Emily Blunt', time: '09:00 AM', pax: 3, holes: 18, cart: true, status: 'checked-in', payment: 'paid', refId: '#BK-9220' },
  ];

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto custom-scrollbar">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 font-medium">{trans.totalBookings}</span>
            <span className="p-1.5 bg-green-50 rounded-md text-primary"><span className="material-symbols-outlined text-[20px]">golf_course</span></span>
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight">42</span>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600 mt-1">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              <span>+5 since last hour</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 font-medium">{trans.checkedIn}</span>
            <span className="p-1.5 bg-blue-50 rounded-md text-blue-500"><span className="material-symbols-outlined text-[20px]">how_to_reg</span></span>
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight">18</span>
            <div className="text-sm font-medium text-slate-500 mt-1">{trans.capacityLabel.replace('{percent}', '42')}</div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm ring-1 ring-primary/20 flex flex-col justify-between bg-gradient-to-br from-white to-green-50/30">
          <div className="flex justify-between items-start mb-2">
            <span className="text-slate-500 font-medium">{trans.nextTeeTime}</span>
            <span className="p-1.5 bg-orange-50 rounded-md text-orange-500 animate-pulse"><span className="material-symbols-outlined text-[20px]">schedule</span></span>
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tight">10:15 AM</span>
            <div className="text-sm font-medium text-orange-600 mt-1">{trans.inMinutes.replace('{min}', '32')}</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-3 inset-y-0 flex items-center text-slate-400">search</span>
            <input className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border-none rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-primary" placeholder={trans.searchPlaceholder} type="text" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium text-slate-600">{trans.autoRefresh}</span>
              <div className="relative inline-flex h-6 w-11 cursor-pointer rounded-full bg-primary border-2 border-transparent">
                <span className="inline-block h-5 w-5 transform translate-x-5 rounded-full bg-white shadow"></span>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span> Oct 24
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              <span className="material-symbols-outlined text-[18px]">filter_list</span> {t.manager.staff.filter}
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-900 text-white">{trans.allBookings}</button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200">{trans.holes18}</button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200">{trans.holes9}</button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">electric_car</span> {trans.cartsOnly}
          </button>
          <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200">{trans.vipMembers}</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableTeeTime}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tablePlayerName}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableDetails}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableRefId}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tablePayment}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableStatus}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map(booking => (
                <tr key={booking.id} className={`group hover:bg-slate-50 transition-colors ${booking.status === 'confirmed' ? 'bg-green-50/40' : ''} ${booking.status === 'cancelled' ? 'opacity-60' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-bold font-mono ${booking.status === 'cancelled' ? 'line-through text-slate-500' : 'text-slate-900'}`}>{booking.time}</span>
                      {booking.id === '1' && <span className="ml-2 inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-black animate-pulse">NEW</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs mr-3">
                        {booking.player.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{booking.player}</div>
                        <div className="text-xs text-slate-500">{booking.pax > 1 ? trans.guests.replace('{count}', (booking.pax - 1).toString()) : trans.single}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-slate-600 text-sm"><span className="material-symbols-outlined text-[18px] mr-1">flag</span>{booking.holes}H</div>
                      {booking.cart && <div className="flex items-center text-slate-600 text-sm"><span className="material-symbols-outlined text-[18px] mr-1">electric_car</span>Cart</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-sm text-slate-500 font-mono">{booking.refId}</span></td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${booking.payment === 'paid' ? 'bg-green-100 text-green-800' :
                        booking.payment === 'due' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
                      }`}>
                      {booking.payment.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'bg-primary text-black' :
                        booking.status === 'checked-in' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                      <span className={`size-1.5 rounded-full ${booking.status === 'confirmed' ? 'bg-black' : 'bg-current'}`}></span>
                      {booking.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-md transition-colors"><span className="material-symbols-outlined">edit</span></button>
                    </div>
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

export default TeeSheetList;
