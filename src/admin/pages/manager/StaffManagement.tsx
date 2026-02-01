import React, { useState, useEffect } from 'react';
import { StaffMember, ActivityLogItem } from '../../types';
import { useLanguage } from '../../../shared/LanguageContext';
import { apiService } from '../../services/api';

const StaffManagement: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.manager.staff;

  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        const [staffRes, logsRes] = await Promise.all([
          apiService.getStaff().catch(() => []),
          apiService.getActivities().catch(() => []) // Reusing dashboard activities or custom
        ]);

        if (staffRes) {
          const staffList = Array.isArray(staffRes) ? staffRes : (staffRes.data || staffRes.staff || []);
          setStaff(staffList);
        }
        if (logsRes) {
          const logsList = Array.isArray(logsRes) ? logsRes : (logsRes.data || logsRes.activities || []);
          setLogs(logsList);
        }
      } catch (error) {
        console.error("Failed to fetch staff data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  return (
    <div className="p-10 flex flex-col gap-8 h-full overflow-y-auto custom-scrollbar">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Col */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="block w-full p-2.5 pl-10 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:ring-primary focus:border-primary placeholder:text-slate-400" placeholder={trans.searchPlaceholder} type="text" />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">filter_list</span> {trans.filter}
              </button>
              <button className="flex items-center gap-2 h-10 px-4 bg-white border border-slate-200 text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">download</span> {trans.export}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableUser}</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableRole}</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tablePermissions}</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{trans.tableStatus}</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">{trans.tableActions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                          <span className="text-sm text-slate-500 font-medium">{t.admin.common.loading}</span>
                        </div>
                      </td>
                    </tr>
                  ) : staff.length > 0 ? (
                    staff.map(member => (
                      <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`} className="size-10 rounded-full bg-slate-100 object-cover" />
                            <div>
                              <div className={`text-sm font-bold ${member.status === 'inactive' ? 'text-slate-400' : 'text-slate-900'}`}>{member.name}</div>
                              <div className="text-xs text-slate-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select className="block w-full py-1.5 pl-3 pr-8 text-sm font-medium text-slate-900 bg-transparent border border-slate-200 rounded-lg focus:ring-primary focus:border-primary appearance-none">
                            <option>{member.role}</option>
                            <option>Admin</option>
                            <option>Editor</option>
                            <option>Viewer</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {member.permissions?.map(p => (
                              <span key={p} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-green-800">
                                {p}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${member.status === 'active' ? 'bg-primary' : 'bg-slate-200'}`}>
                            <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${member.status === 'active' ? 'translate-x-5' : 'translate-x-0'}`}></span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-primary rounded-lg hover:bg-primary/5">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </button>
                            <button className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic text-sm">
                        {t.admin.common.noData}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200">
              <span className="text-sm text-slate-500">
                {trans.showingEntries.replace('{count}', staff.length.toString()).replace('{total}', staff.length.toString())}
              </span>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded border border-slate-200 text-slate-600 text-sm hover:bg-slate-50 disabled:opacity-50">{trans.previous}</button>
                <button className="px-3 py-1 rounded border border-slate-200 text-slate-600 text-sm hover:bg-slate-50">{trans.next}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Activity Log */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full max-h-[700px]">
            <div className="p-5 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-900">{trans.activityLog}</h3>
              <button className="text-xs font-semibold text-primary hover:text-green-600">{trans.viewAll}</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="relative pl-4 border-l border-slate-200 space-y-8">
                {loading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                ) : logs.length > 0 ? (
                  logs.map(log => (
                    <div key={log.id} className="relative group">
                      <div className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white ${log.type === 'invite' || log.type === 'update' ? 'bg-primary' : 'bg-slate-300'}`}></div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm text-slate-900 leading-relaxed">
                          <span className="font-semibold">{log.user}</span> {log.action}
                        </p>
                        <span className="text-xs text-slate-400">{log.time}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 italic text-center py-5">{t.admin.common.noData}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
