import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area
} from 'recharts';
import { useLanguage } from '../../shared/LanguageContext';
import StatCard from '../components/StatCard';
import { getDashboardInsights } from '../services/geminiService';
import { apiService } from '../services/api';

const COLORS = ['#16a34a', '#22c55e', '#4ade80', '#86efac', '#bbf7d0', '#f0fdf4'];

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Global Filters
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    region: '',
    courseId: ''
  });

  // Filter Options (from API)
  const [options, setOptions] = useState({
    regions: [] as string[],
    courses: [] as { id: string, name: string }[]
  });

  const [stats, setStats] = useState({
    revenue: "0",
    bookings: "0",
    commission: "0",
    activeCourses: "0"
  });

  const [charts, setCharts] = useState({
    regionData: [] as any[],
    courseData: [] as any[],
    timeData: [] as any[]
  });

  const [activities, setActivities] = useState<any[]>([]);

  const formatVNTime = (dateString: string) => {
    if (!dateString) return '---';
    try {
      let normalized = dateString.replace(' ', 'T');
      if (!normalized.includes('Z') && !normalized.includes('+')) {
        normalized += 'Z';
      }
      const date = new Date(normalized);
      if (isNaN(date.getTime())) return dateString;

      const locale = language === 'ko' ? 'ko-KR' : language === 'en' ? 'en-US' : 'vi-VN';
      return new Intl.DateTimeFormat(locale, {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour12: false
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoadingData(true);
      // Construct API filters
      const apiFilters: any = {};
      if (filters.startDate) apiFilters.startDate = filters.startDate;
      if (filters.endDate) apiFilters.endDate = filters.endDate;
      if (filters.region) apiFilters.region = filters.region;
      if (filters.courseId) apiFilters.courseId = filters.courseId;

      const [statsRes, activitiesRes] = await Promise.all([
        apiService.getDashboardStats(apiFilters).catch(() => null),
        apiService.getActivities(apiFilters).catch(() => [])
      ]);

      if (statsRes) {
        const statsData = statsRes.data || statsRes;
        setStats({
          revenue: statsData.revenue || "0",
          bookings: statsData.bookings || "0",
          commission: statsData.commission || "0",
          activeCourses: statsData.activeCourses || "0"
        });
        if (statsData.charts) {
          setCharts(statsData.charts);
        }
        if (statsData.filters) {
          setOptions(statsData.filters);
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
  }, [filters]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const generateAIInsight = async () => {
    setLoadingAI(true);
    const result = await getDashboardInsights(stats);
    setInsight(result || t.admin.common.noData);
    setLoadingAI(false);
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      region: '',
      courseId: ''
    });
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tight text-slate-900">{t.admin.dashboard.title}</h2>
          <p className="text-slate-500 font-medium">{t.admin.dashboard.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={generateAIInsight}
            className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px] fill-1 text-emerald-400">psychology</span>
            {loadingAI ? t.admin.dashboard.analyzing : t.admin.dashboard.aiAnalysis}
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-end gap-6">
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">{t.admin.dashboard.startDate}</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">{t.admin.dashboard.endDate}</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">{t.admin.dashboard.region}</label>
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
          >
            <option value="">{t.admin.dashboard.allRegions}</option>
            {options.regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[200px] space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">{t.admin.dashboard.golfCourse}</label>
          <select
            value={filters.courseId}
            onChange={(e) => handleFilterChange('courseId', e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
          >
            <option value="">{t.admin.dashboard.allCourses}</option>
            {options.courses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={clearFilters}
          className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
        >
          {t.admin.dashboard.clearFilters}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label={t.admin.dashboard.totalRevenue} value={stats.revenue} icon="payments" />
        <StatCard label={t.admin.dashboard.totalBookings} value={stats.bookings} icon="calendar_month" />
        <StatCard label={t.admin.dashboard.brokerCommission} value={stats.commission} icon="percent" />
        <StatCard label={t.admin.dashboard.activeCourses} value={stats.activeCourses} icon="flag" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Biểu đồ doanh thu theo thời gian */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{t.admin.dashboard.revenueOverTime}</h3>
              <p className="text-sm text-slate-500 font-medium whitespace-nowrap">{t.admin.dashboard.revenueOverTimeSubtitle}</p>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[300px]">
            {loadingData ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
              </div>
            ) : charts.timeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.timeData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    tickFormatter={(val) => val.split('-').slice(1).reverse().join('/')}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400 italic">{t.admin.dashboard.noTimeData}</div>
            )}
          </div>
        </div>

        {/* Biểu đồ doanh thu theo vùng */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{t.admin.dashboard.revenueByRegion}</h3>
          <p className="text-sm text-slate-500 font-medium mb-8">{t.admin.dashboard.revenueByRegionSubtitle}</p>

          <div className="flex-1 flex flex-col justify-center">
            {charts.regionData.length > 0 ? (
              <>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={charts.regionData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {charts.regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3 mt-4">
                  {charts.regionData.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                        <span className="text-slate-600 font-medium">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900">{item.value.toLocaleString()} VND</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-slate-400 italic py-20">{t.admin.dashboard.noRegionData}</div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Biểu đồ doanh thu theo sân */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{t.admin.dashboard.topCourses}</h3>
          <p className="text-sm text-slate-500 font-medium mb-8">{t.admin.dashboard.topCoursesSubtitle}</p>
          <div className="h-[350px] w-full">
            {charts.courseData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={charts.courseData} margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                    width={200}
                  />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400 italic">{t.admin.dashboard.noCourseData}</div>
            )}
          </div>
        </div>

        {/* Hoạt động gần đây */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 tracking-tight">
              {t.admin.dashboard.liveActivityTitle}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </h3>
          </div>

          <div className="space-y-6 flex-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {loadingData ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-16 bg-slate-50 animate-pulse rounded-xl"></div>
                ))}
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="relative shrink-0">
                    <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden transition-transform group-hover:scale-105">
                      <span className="material-symbols-outlined text-[24px] text-slate-400">person</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                      <span className={`material-symbols-outlined text-[16px] p-0.5 rounded-full ${activity.type === 'success' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'}`}>
                        {activity.type === 'success' ? 'verified' : 'stadium'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 font-medium leading-relaxed">
                      <span className="font-bold text-slate-950">{activity.user}</span> {activity.type === 'success' ? t.admin.dashboard.paidInvoice : t.admin.dashboard.booked}
                      <span className="text-emerald-600 font-bold block sm:inline"> @{activity.target}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="material-symbols-outlined text-[14px] text-slate-400">schedule</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{formatVNTime(activity.time)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-slate-500 italic py-10 text-center">{t.admin.dashboard.noActivityData}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
