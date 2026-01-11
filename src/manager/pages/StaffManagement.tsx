
import React from 'react';
import { StaffMember, ActivityLogItem } from '../types';
import { useLanguage } from '../../shared/LanguageContext';

const StaffManagement: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.manager.staff;
  const staff: StaffMember[] = [
    { id: '1', name: 'Sarah Jenkins', email: 'sarah@company.com', role: 'Admin', permissions: ['Billing', 'Users', 'Audit'], status: 'active', avatar: 'https://picsum.photos/seed/sarah/100/100' },
    { id: '2', name: 'Michael Chen', email: 'mike@company.com', role: 'Editor', permissions: ['Content', 'Media'], status: 'active', avatar: 'https://picsum.photos/seed/michael/100/100' },
    { id: '3', name: 'Jessica Wong', email: 'jessica@company.com', role: 'Viewer', permissions: ['Read Only'], status: 'inactive', avatar: 'https://picsum.photos/seed/jessica/100/100' },
    { id: '4', name: 'David Miller', email: 'david@company.com', role: 'Contributor', permissions: ['Drafts'], status: 'active', avatar: 'https://picsum.photos/seed/david/100/100' },
  ];

  const logs: ActivityLogItem[] = [
    { id: 'l1', user: 'Sarah Jenkins', action: "changed Michael Chen's role to Editor", time: '2 minutes ago', type: 'update' },
    { id: 'l2', user: 'System', action: 'automatically deactivated Jessica Wong due to inactivity.', time: '1 hour ago', type: 'system' },
    { id: 'l3', user: 'Sarah Jenkins', action: 'invited David Miller to the team.', time: '3 hours ago', type: 'invite' },
    { id: 'l4', user: 'System', action: 'Updated global permission settings for Viewer role.', time: 'Yesterday at 4:30 PM', type: 'system' },
    { id: 'l5', user: 'Michael Chen', action: 'logged in from a new device (San Francisco, CA).', time: 'Yesterday at 9:15 AM', type: 'login' },
  ];

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
                  {staff.map(member => (
                    <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={member.avatar} className="size-10 rounded-full bg-slate-100" />
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
                          {member.permissions.map(p => (
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
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 flex items-center justify-between border-t border-slate-200">
              <span className="text-sm text-slate-500">{trans.showingEntries.replace('{count}', '4').replace('{total}', '24')}</span>
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
                {logs.map(log => (
                  <div key={log.id} className="relative group">
                    <div className={`absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white ${log.type === 'invite' || log.type === 'update' ? 'bg-primary' : 'bg-slate-300'}`}></div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-slate-900 leading-relaxed">
                        <span className="font-semibold">{log.user}</span> {log.action}
                      </p>
                      <span className="text-xs text-slate-400">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
