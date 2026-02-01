
import React, { useState, useEffect } from 'react';
import { BookingStatus } from '../types';
import { useLanguage } from '../../shared/LanguageContext';
import { apiService } from '../services/api';

const Bookings: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.admin.bookings;

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: "0",
    revenue: "0",
    cancelled: "0"
  });

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const data = await apiService.getBookings();
        if (data) {
          setBookings(data.bookings || []);
          setStats({
            total: data.totalCount?.toString() || data.bookings?.length.toString() || "0",
            revenue: data.totalRevenue || "0",
            cancelled: data.cancelledCount?.toString() || "0"
          });
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const statCards = [
    { label: t.admin.dashboard.totalBookings, value: stats.total, trend: "+0%", positive: true, icon: "calendar_today" },
    { label: t.admin.dashboard.totalRevenue, value: stats.revenue, trend: "+0%", positive: true, icon: "payments" },
    { label: trans.filterCancelled, value: stats.cancelled, trend: "0%", positive: false, icon: "cancel" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-text-main tracking-tight">{trans.title}</h2>
          <p className="text-text-muted font-medium">{trans.subtitle}</p>
        </div>
        <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md">
          <span className="material-symbols-outlined text-[22px]">add</span>
          {trans.addBooking}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-surface border border-border-light p-6 rounded-2xl flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary">{card.icon}</span>
            </div>
            <p className="text-text-muted text-sm font-bold uppercase tracking-wider mb-2">{card.label}</p>
            <div className="flex items-end gap-3 mt-1">
              <p className="text-4xl font-black text-text-main">{card.value}</p>
              <span className={`text-sm font-bold px-2 py-0.5 rounded flex items-center ${card.positive ? 'bg-primary-subtle text-primary' : 'bg-red-50 text-red-600'}`}>
                <span className="material-symbols-outlined text-[16px] mr-1">{card.positive ? 'trending_up' : 'trending_down'}</span>
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-2xl border border-border-light shadow-sm">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light hover:border-slate-400 rounded-xl text-sm font-bold text-text-muted hover:text-text-main transition-all">
            <span className="material-symbols-outlined text-[18px]">date_range</span>
            <span>Oct 24, 2024</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light hover:border-slate-400 rounded-xl text-sm font-bold text-text-muted hover:text-text-main transition-all">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            <span>{t.admin.common.filter}: {trans.filterAll}</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light hover:border-slate-400 rounded-xl text-sm font-bold text-text-muted hover:text-text-main transition-all">
            <span className="material-symbols-outlined text-[18px]">flag</span>
            <span>{t.admin.nav.clubs}: {trans.filterAll}</span>
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-text-muted hover:text-text-main text-sm font-bold transition-all ml-auto lg:ml-0">
          <span className="material-symbols-outlined text-[20px]">download</span>
          {trans.exportData}
        </button>
      </div>

      <div className="bg-surface border border-border-light rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-border-light text-text-muted text-[11px] uppercase tracking-widest font-black">
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableId}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableCustomer}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableSlot}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableCourse}</th>
                <th className="px-6 py-5 whitespace-nowrap text-center">{trans.tablePlayers}</th>
                <th className="px-6 py-5 whitespace-nowrap text-right">{trans.tablePrice}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableStatus}</th>
                <th className="px-6 py-5 text-right font-black">{trans.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-sm font-medium">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <p className="text-text-muted font-bold">{t.admin.common.loading}</p>
                    </div>
                  </td>
                </tr>
              ) : bookings.length > 0 ? (
                bookings.map((booking, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                    <td className="px-6 py-5 text-text-muted font-mono">{booking.bookingCode || booking.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-border-light flex items-center justify-center font-bold text-text-muted overflow-hidden">
                          {booking.customerAvatar ? (
                            <img src={booking.customerAvatar} alt="" />
                          ) : (
                            (booking.customerName || booking.customer?.name || 'U').split(' ').map((n: string) => n[0]).join('')
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-text-main leading-tight">{booking.customerName || booking.customer?.name}</p>
                          <p className="text-[11px] text-text-muted mt-0.5">{booking.customerEmail || booking.customer?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-bold text-text-main">{booking.teeTime}</p>
                      <p className="text-[11px] text-text-muted">{booking.date}</p>
                    </td>
                    <td className="px-6 py-5 text-text-main">{booking.courseName || booking.course}</td>
                    <td className="px-6 py-5 text-center text-text-main">{booking.players}</td>
                    <td className="px-6 py-5 text-right font-black text-text-main">{booking.price}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${booking.status === BookingStatus.Confirmed || booking.status === 'confirmed' ? 'bg-primary-subtle text-primary border-primary-light' :
                          booking.status === BookingStatus.Pending || booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-600 border-red-200'
                        }`}>
                        {booking.status === BookingStatus.Confirmed || booking.status === 'confirmed' ? trans.statusConfirmed :
                          booking.status === BookingStatus.Pending || booking.status === 'pending' ? trans.statusPending :
                            trans.statusCancelled}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-text-muted hover:text-text-main p-1 rounded-lg hover:bg-slate-200 transition-all">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-text-muted italic">
                    {t.admin.common.noData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {!loading && bookings.length > 0 && (
          <div className="bg-slate-50 border-t border-border-light px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[13px] font-medium text-text-muted">
              {t.admin.common.loading.replace('...', '')} <span className="font-bold text-text-main">1</span> to <span className="font-bold text-text-main">{bookings.length}</span> of <span className="font-bold text-text-main">{stats.total}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-1.5 text-sm font-bold text-text-muted bg-white border border-border-light rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50" disabled>{t.manager.staff.previous}</button>
              <div className="flex items-center gap-1">
                <button className="h-9 w-9 flex items-center justify-center text-sm font-bold rounded-xl bg-primary text-white shadow-md">1</button>
              </div>
              <button className="px-4 py-1.5 text-sm font-bold text-text-muted bg-white border border-border-light rounded-xl hover:bg-slate-50 transition-all disabled:opacity-50" disabled>{t.manager.staff.next}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
