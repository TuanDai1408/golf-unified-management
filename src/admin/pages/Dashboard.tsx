
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../../shared/LanguageContext';
import StatCard from '../components/StatCard';
import { getDashboardInsights } from '../services/geminiService';
import { apiService } from '../services/api';

const defaultData = [
  { name: 'Mon', revenue: 0, commission: 0 },
  { name: 'Tue', revenue: 0, commission: 0 },
  { name: 'Wed', revenue: 0, commission: 0 },
  { name: 'Thu', revenue: 0, commission: 0 },
  { name: 'Fri', revenue: 0, commission: 0 },
  { name: 'Sat', revenue: 0, commission: 0 },
  { name: 'Sun', revenue: 0, commission: 0 },
  { name: 'Today', revenue: 0, commission: 0 },
];

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [stats, setStats] = useState({
    revenue: "0",
    bookings: "0",
    commission: "0",
    activeCourses: "0"
  });

  const [chartData, setChartData] = useState(defaultData);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoadingData(true);
        const [statsRes, activitiesRes] = await Promise.all([
          apiService.getDashboardStats().catch(() => null),
          apiService.getActivities().catch(() => [])
        ]);

        if (statsRes) {
          const statsData = statsRes.data || statsRes;
          setStats({
            revenue: statsData.revenue || "0",
            bookings: statsData.bookings || "0",
            commission: statsData.commission || "0",
            activeCourses: statsData.activeCourses || statsData.totalCourses || "0"
          });
          if (statsData.chartData) {
            setChartData(statsData.chartData);
          }
        }

        if (activitiesRes) {
          setActivities(Array.isArray(activitiesRes) ? activitiesRes : (activitiesRes.data || activitiesRes.activities || []));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, []);

  const generateAIInsight = async () => {
    setLoadingAI(true);
    const result = await getDashboardInsights(stats);
    setInsight(result || t.admin.common.noData);
    setLoadingAI(false);
  };

  const activityActions: Record<string, string> = {
    booked: t.admin.dashboard.booked,
    'modified reservation': t.admin.dashboard.modifiedReservation,
    'paid invoice': t.admin.dashboard.paidInvoice,
  };

  const getActivityTimeLabel = (timeStr: string) => {
    if (timeStr === 'Just now') return t.admin.dashboard.justNow;
    return timeStr.replace('min ago', t.admin.dashboard.minutesAgo);
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
            {loadingAI ? t.admin.dashboard.analyzing : t.admin.dashboard.aiInsights}
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
          </div>

          <div className="flex-1 w-full">
            {loadingData ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#16a34a' : '#22c55e'} />
                    ))}
                  </Bar>
                  <Bar dataKey="commission" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
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
          </div>

          <div className="space-y-8 flex-1">
            {loadingData ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-border-light overflow-hidden">
                      {activity.avatar ? (
                        <img src={activity.avatar} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-[20px] text-text-muted">person</span>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <span className={`material-symbols-outlined text-[14px] p-0.5 rounded-full ${activity.type === 'booking' ? 'text-primary bg-primary-subtle' : activity.type === 'edit' ? 'text-blue-500 bg-blue-50' : 'text-orange-500 bg-orange-50'}`}>
                        {activity.type === 'booking' ? 'check_circle' : activity.type === 'edit' ? 'edit' : 'payments'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-text-main font-medium leading-tight">
                      <span className="font-bold">{activity.userName || activity.user}</span> {activityActions[activity.action] || activity.action}
                      {activity.location && <span className="text-primary font-bold"> {activity.location}</span>}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{getActivityTimeLabel(activity.time)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-text-muted italic">{t.admin.common.noData}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
