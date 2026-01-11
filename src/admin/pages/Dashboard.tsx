
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../../shared/LanguageContext';
import StatCard from '../components/StatCard';
import { getDashboardInsights } from '../services/geminiService';

const data = [
  { name: 'Mon', revenue: 4500, commission: 800 },
  { name: 'Tue', revenue: 6500, commission: 1200 },
  { name: 'Wed', revenue: 3500, commission: 700 },
  { name: 'Thu', revenue: 8500, commission: 1500 },
  { name: 'Fri', revenue: 5500, commission: 900 },
  { name: 'Sat', revenue: 9000, commission: 1800 },
  { name: 'Sun', revenue: 7500, commission: 1400 },
  { name: 'Today', revenue: 10500, commission: 2000 },
];

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const stats = {
    revenue: "$124,500",
    bookings: "1,240",
    commission: "$12,450",
    activeCourses: "42"
  };

  const generateAIInsight = async () => {
    setLoading(true);
    const result = await getDashboardInsights(stats);
    setInsight(result || t.admin.common.noData);
    setLoading(false);
  };

  const activityActions: Record<string, string> = {
    booked: t.admin.dashboard.booked,
    'modified reservation': t.admin.dashboard.modifiedReservation,
    'paid invoice': t.admin.dashboard.paidInvoice,
  };

  const activityTimes: Record<string, string> = {
    'Just now': t.admin.dashboard.justNow,
    '5m ago': `5${t.admin.dashboard.minutesAgo}`,
    '12m ago': `12${t.admin.dashboard.minutesAgo}`,
    '24m ago': `24${t.admin.dashboard.minutesAgo}`,
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-text-main">{t.admin.dashboard.title}</h2>
          <p className="text-text-muted font-medium">{t.admin.dashboard.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={generateAIInsight}
            className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px] fill-1 text-emerald-400">psychology</span>
            {loading ? t.admin.dashboard.analyzing : t.admin.dashboard.aiInsights}
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95">
            <span className="material-symbols-outlined text-[20px]">download</span>
            {t.admin.dashboard.exportReport}
          </button>
        </div>
      </div>

      {insight && (
        <div className="bg-primary-subtle border border-primary-light p-5 rounded-xl animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-3xl shrink-0">info</span>
            <div>
              <h4 className="font-bold text-primary mb-1">{t.admin.dashboard.performanceAnalysis}</h4>
              <div className="text-sm text-primary-hover whitespace-pre-line leading-relaxed">
                {insight}
              </div>
            </div>
            <button onClick={() => setInsight(null)} className="ml-auto text-primary opacity-50 hover:opacity-100">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label={t.admin.dashboard.totalRevenue} value={stats.revenue} trend="+5.2%" isPositive={true} icon="payments" />
        <StatCard label={t.admin.dashboard.totalBookings} value={stats.bookings} trend="+12.0%" isPositive={true} icon="calendar_month" />
        <StatCard label={t.admin.dashboard.brokerCommission} value={stats.commission} trend="+8.5%" isPositive={true} icon="percent" />
        <StatCard label={t.admin.dashboard.activeCourses} value={stats.activeCourses} trend="0.0%" isPositive={false} icon="flag" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-surface border border-border-light rounded-xl p-8 flex flex-col min-h-[450px] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-text-main tracking-tight">{t.admin.dashboard.revenueAnalytics}</h3>
              <p className="text-sm text-text-muted font-medium">{t.admin.dashboard.revenueSubtitle}</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold bg-white text-text-main rounded shadow-sm">{t.admin.dashboard.revenue}</button>
              <button className="px-3 py-1 text-xs font-bold text-text-muted hover:text-text-main transition-colors">{t.admin.dashboard.commission}</button>
            </div>
          </div>

          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#16a34a' : '#22c55e'} />
                  ))}
                </Bar>
                <Bar dataKey="commission" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border-light rounded-xl p-8 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-text-main flex items-center gap-2 tracking-tight">
              {t.admin.dashboard.liveActivity}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </h3>
            <button className="text-primary text-sm font-bold hover:underline">{t.admin.dashboard.viewAll}</button>
          </div>

          <div className="space-y-8 flex-1">
            {[
              { user: "Michael S.", action: "booked", location: "Pebble Beach", time: "Just now", type: "booking" },
              { user: "Sarah J.", action: "modified reservation", location: "", time: "5m ago", type: "edit" },
              { user: "John Doe", action: "paid invoice", location: "", time: "12m ago", type: "payment" },
              { user: "David W.", action: "booked", location: "Augusta National", time: "24m ago", type: "booking" },
            ].map((activity, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-border-light">
                    <span className="material-symbols-outlined text-[20px] text-text-muted">person</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                    <span className={`material-symbols-outlined text-[14px] p-0.5 rounded-full ${activity.type === 'booking' ? 'text-primary bg-primary-subtle' : activity.type === 'edit' ? 'text-blue-500 bg-blue-50' : 'text-orange-500 bg-orange-50'}`}>
                      {activity.type === 'booking' ? 'check_circle' : activity.type === 'edit' ? 'edit' : 'payments'}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-text-main font-medium leading-tight">
                    <span className="font-bold">{activity.user}</span> {activityActions[activity.action] || activity.action}
                    {activity.location && <span className="text-primary font-bold"> {activity.location}</span>}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{activityTimes[activity.time] || activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
