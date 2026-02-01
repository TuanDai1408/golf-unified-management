
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../shared/LanguageContext';
import { apiService } from '../services/api';

const Users: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.admin.users;

  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: "0",
    admins: "0",
    managers: "0",
    pending: "0"
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await apiService.getUsers();
        if (data) {
          const userList = Array.isArray(data) ? data : (data.users || data.data || []);
          setUsers(userList);
          setStats({
            total: (data.totalCount || userList.length).toString(),
            admins: (data.adminCount || userList.filter((u: any) => (u.role || '').toLowerCase() === 'admin').length).toString(),
            managers: (data.managerCount || userList.filter((u: any) => (u.role || '').toLowerCase() === 'manager').length).toString(),
            pending: (data.pendingCount || 0).toString()
          });
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const statCards = [
    { label: trans.totalUsers, val: stats.total, trend: "+0%", color: "emerald", icon: "group" },
    { label: trans.activeAdmins, val: stats.admins, trend: trans.noChange, color: "slate", icon: "admin_panel_settings" },
    { label: trans.managers, val: stats.managers, trend: "+0%", color: "blue", icon: "badge" },
    { label: trans.pendingInvites, val: stats.pending, trend: trans.actionNeeded, color: "orange", icon: "person_add" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-text-main mb-2">{trans.title}</h1>
          <p className="text-text-muted font-medium max-w-xl">{trans.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button className="h-12 px-6 rounded-xl border border-border-light bg-white text-text-main hover:bg-slate-50 transition-all text-sm font-black flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            {trans.exportUsers}
          </button>
          <button className="h-12 px-6 rounded-xl bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all text-sm font-black flex items-center gap-2 shadow-lg shadow-green-100">
            <span className="material-symbols-outlined text-[20px]">add</span>
            {trans.addUser}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-surface border border-border-light rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 hover:shadow-md transition-all">
            <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-7xl">{card.icon}</span>
            </div>
            <span className="text-text-muted text-[11px] font-black uppercase tracking-widest">{card.label}</span>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-4xl font-black text-text-main tracking-tight">{card.val}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold mb-1.5 border ${card.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                card.color === 'slate' ? 'bg-slate-50 text-slate-500 border-slate-200' :
                  card.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                    'bg-orange-50 text-orange-600 border-orange-100'
                }`}>
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border-light flex flex-col lg:flex-row gap-4 justify-between items-center">
          <div className="relative w-full lg:w-96 group">
            <span className="material-symbols-outlined absolute left-3 top-3 text-text-muted text-[20px] group-focus-within:text-primary transition-colors">search</span>
            <input
              className="w-full bg-slate-50 border border-border-light rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-text-main focus:bg-white transition-all"
              placeholder={trans.searchPlaceholder}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">{t.admin.common.filter}:</label>
              <select className="border-border-light rounded-lg text-sm font-bold bg-white focus:ring-primary focus:border-primary px-3 py-1.5 cursor-pointer">
                <option>{trans.filterAll}</option>
                <option>{trans.filterBroker}</option>
                <option>{trans.roleStaff}</option>
              </select>
            </div>
            <button className="p-2 rounded-xl text-text-muted hover:text-primary hover:bg-primary-subtle transition-all">
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-border-light text-[11px] font-black uppercase tracking-widest text-text-muted">
                <th className="px-6 py-5 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-0" /></th>
                <th className="px-6 py-5">{trans.userProfile}</th>
                <th className="px-6 py-5">{trans.tableRole}</th>
                <th className="px-6 py-5">{t.admin.slots.status}</th>
                <th className="px-6 py-5">{trans.tableJoined}</th>
                <th className="px-6 py-5 text-right">{trans.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-sm font-bold">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <p className="text-text-muted font-bold">{t.admin.common.loading}</p>
                    </div>
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user, i) => (
                  <tr key={i} className={`group hover:bg-slate-50 transition-all cursor-pointer ${user.lastLogin === 'Online Now' || user.isOnline ? 'bg-primary-subtle/20' : ''}`}>
                    <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-0" /></td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-border-light shadow-sm text-primary font-black overflow-hidden text-xs uppercase">
                          {user.avatarUrl || user.image ? (
                            <img src={user.avatarUrl || user.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            user.avatar || (user.name || user.fullName || 'U').split(' ').map((n: string) => n[0]).join('').slice(0, 2)
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-text-main group-hover:text-primary transition-colors">{user.name || user.fullName}</span>
                          <span className="text-[11px] text-text-muted font-mono">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${user.role === 'broker' || user.role === trans.roleBroker ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        user.role === 'admin' || user.role === trans.roleAdmin ? 'bg-red-50 text-red-700 border-red-100' :
                          'bg-blue-50 text-blue-700 border-blue-100'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider ${user.status === 'Active' || user.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        user.status === 'Pending' || user.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                        {user.status === 'Active' || user.status === 'active' ? t.admin.slots.statusAvailable :
                          user.status === 'Pending' || user.status === 'pending' ? t.admin.bookings.statusPending :
                            t.admin.slots.statusClosed}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      {user.lastLogin === 'Online Now' || user.isOnline ? (
                        <span className="flex items-center gap-2 text-primary">
                          <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                          {t.admin.dashboard.justNow}
                        </span>
                      ) : (
                        <span className="text-text-muted font-medium">{user.lastLogin || '--'}</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="invisible group-hover:visible flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-200 text-text-muted transition-all"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                        <button className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-all"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-text-muted italic">
                    {t.admin.common.noData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
