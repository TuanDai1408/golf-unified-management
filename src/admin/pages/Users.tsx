
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

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    phone: '',
    password: '',
    role: 'customer',
    status: 'active'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiService.getUsers();
      if (data) {
        const userList = Array.isArray(data) ? data : (data.users || data.data || []);
        // Match status to UI expectations if needed
        const processedUsers = userList.map((u: any) => ({
          ...u,
          status: u.status || 'active'
        }));
        setUsers(processedUsers);
        setStats({
          total: (data.totalCount || userList.length).toString(),
          admins: (data.adminCount || userList.filter((u: any) => (u.role || '').toLowerCase() === 'admin').length).toString(),
          managers: (data.managerCount || userList.filter((u: any) => (u.role || '').toLowerCase() === 'manager' || (u.role || '').toLowerCase() === 'staff').length).toString(),
          pending: (data.pendingCount || userList.filter((u: any) => (u.status || '').toLowerCase() === 'pending').length).toString()
        });
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: trans.totalUsers, val: stats.total, trend: "+0%", color: "emerald", icon: "group" },
    { label: trans.activeAdmins, val: stats.admins, trend: trans.noChange, color: "slate", icon: "admin_panel_settings" },
    { label: trans.managers, val: stats.managers, trend: "+0%", color: "blue", icon: "badge" },
    { label: trans.pendingInvites, val: stats.pending, trend: trans.actionNeeded, color: "orange", icon: "person_add" },
  ];

  const handleExportUsers = () => {
    if (!users.length) return;
    const headers = ['ID', 'Họ tên', 'Email', 'Số điện thoại', 'Vai trò', 'Trạng thái', 'Thời gian tham gia'];
    const rows = users.map(u => [
      u.id,
      u.full_name || u.name,
      u.email,
      u.phone || '',
      u.role,
      u.status || 'active',
      formatDate(u.created_at)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await apiService.createUser(newUser);
      alert(trans.successAlert || "Success!");
      setIsAddModalOpen(false);
      setNewUser({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        role: 'customer',
        status: 'active'
      });
      fetchUsers();
    } catch (error: any) {
      alert((trans.errorAlert || "Error: ") + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    try {
      setIsSubmitting(true);
      await apiService.updateUser(selectedUser.id, selectedUser);
      alert(t.admin.common.success);
      setIsEditModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      alert((trans.errorAlert || "Error: ") + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    try {
      setIsSubmitting(true);
      await apiService.deleteUser(selectedUser.id);
      alert(trans.deleteSuccess);
      setIsDeleteModalOpen(false);
      fetchUsers();
    } catch (error: any) {
      alert(trans.deleteError + ": " + (error.response?.data?.error || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (user: any) => {
    setSelectedUser({ ...user });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => {
    const nameMatch = (u.full_name || u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const roleMatch = roleFilter === 'All' || (u.role || '').toLowerCase() === roleFilter.toLowerCase();
    return nameMatch && roleMatch;
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '--';
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-text-main mb-2">{trans.title}</h1>
          <p className="text-text-muted font-medium max-w-xl">{trans.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportUsers}
            className="h-12 px-6 rounded-xl border border-border-light bg-white text-text-main hover:bg-slate-50 transition-all text-sm font-black flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            {trans.exportUsers}
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="h-12 px-6 rounded-xl bg-primary text-white hover:bg-primary-hover active:scale-95 transition-all text-sm font-black flex items-center gap-2 shadow-lg shadow-green-100"
          >
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-black text-text-muted uppercase tracking-widest">{t.admin.common.filter}:</label>
              <select
                className="border-border-light rounded-lg text-sm font-bold bg-white focus:ring-primary focus:border-primary px-3 py-1.5 cursor-pointer"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">{trans.filterAll}</option>
                <option value="Admin">{trans.filterAdmin}</option>
                <option value="Manager">{trans.roleManager}</option>
                <option value="Broker">{trans.roleBroker}</option>
                <option value="Customer">{trans.roleGolfer}</option>
              </select>
            </div>
            <button
              onClick={fetchUsers}
              className="p-2 rounded-xl text-text-muted hover:text-primary hover:bg-primary-subtle transition-all"
            >
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
                <th className="px-6 py-5">{trans.tableStatus}</th>
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
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <tr key={i} className={`group hover:bg-slate-50 transition-all cursor-pointer ${user.lastLogin === 'Online Now' || user.isOnline ? 'bg-primary-subtle/20' : ''}`}>
                    <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-0" /></td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center border border-border-light shadow-sm text-primary font-black overflow-hidden text-xs uppercase">
                          {user.avatar_url || user.image ? (
                            <img src={user.avatar_url || user.image} alt="" className="h-full w-full object-cover" />
                          ) : (
                            user.avatar || (user.full_name || user.name || 'U').split(' ').map((n: string) => n[0]).join('').slice(0, 2)
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-text-main group-hover:text-primary transition-colors">{user.full_name || user.name}</span>
                          <span className="text-[11px] text-text-muted font-mono">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${user.role === 'broker' || user.role === 'Broker' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        user.role === 'admin' || user.role === 'Admin' ? 'bg-red-50 text-red-700 border-red-100' :
                          user.role === 'manager' || user.role === 'Manager' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                            'bg-slate-50 text-slate-700 border-slate-100'
                        }`}>
                        {user.role === 'customer' ? trans.roleGolfer :
                          user.role === 'manager' ? trans.roleManager :
                            user.role === 'admin' ? trans.roleAdmin :
                              user.role === 'broker' ? trans.roleBroker : user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider ${user.status === 'Active' || user.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        user.status === 'Pending' || user.status === 'pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                          'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                        {user.status === 'Active' || user.status === 'active' ? trans.statusActive :
                          user.status === 'Pending' || user.status === 'pending' ? trans.statusPending :
                            trans.statusInactive}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-text-muted font-medium">{formatDate(user.created_at)}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="invisible group-hover:visible flex items-center justify-end gap-2">
                        <button onClick={() => openEditModal(user)} className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary-subtle transition-all">
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button onClick={() => openDeleteModal(user)} className="p-2 rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-all">
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
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

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-border-light overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-border-light flex justify-between items-center">
              <h2 className="text-xl font-black text-text-main">{trans.addUser}</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-text-muted transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelFullName}</label>
                <input
                  required
                  placeholder={trans.placeholderName}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={newUser.full_name}
                  onChange={e => setNewUser({ ...newUser, full_name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelEmail}</label>
                  <input
                    required
                    type="email"
                    placeholder={trans.placeholderEmail}
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelPhone}</label>
                  <input
                    required
                    placeholder={trans.placeholderPhone}
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={newUser.phone}
                    onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelPassword}</label>
                <input
                  required
                  type="password"
                  placeholder={trans.placeholderPassword}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelRole}</label>
                <select
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                  value={newUser.role}
                  onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="customer">{trans.roleCustomer}</option>
                  <option value="manager">{trans.roleManager}</option>
                  <option value="admin">{trans.roleAdmin}</option>
                  <option value="broker">{trans.roleBroker}</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 h-11 rounded-xl border border-border-light font-bold text-text-muted hover:bg-slate-50 transition-all"
                >
                  {t.admin.common.cancel}
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-primary text-white font-black shadow-lg shadow-green-100 hover:bg-primary-hover active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? t.admin.common.loading : t.admin.common.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Edit User Modal */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-border-light flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-black text-text-main flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit</span>
                {trans.editUser}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="h-8 w-8 rounded-full flex items-center justify-center text-text-muted hover:bg-white hover:text-text-main transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelFullName}</label>
                <input
                  required
                  placeholder={trans.placeholderName}
                  className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={selectedUser.full_name || selectedUser.name}
                  onChange={e => setSelectedUser({ ...selectedUser, full_name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelEmail}</label>
                  <input
                    required
                    type="email"
                    placeholder={trans.placeholderEmail}
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={selectedUser.email}
                    onChange={e => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelPhone}</label>
                  <input
                    required
                    placeholder={trans.placeholderPhone}
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-medium focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    value={selectedUser.phone}
                    onChange={e => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.labelRole}</label>
                  <select
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                    value={selectedUser.role}
                    onChange={e => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option value="customer">{trans.roleCustomer}</option>
                    <option value="manager">{trans.roleManager}</option>
                    <option value="admin">{trans.roleAdmin}</option>
                    <option value="broker">{trans.roleBroker}</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">{trans.tableStatus}</label>
                  <select
                    className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-border-light text-sm font-bold focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                    value={selectedUser.status}
                    onChange={e => setSelectedUser({ ...selectedUser, status: e.target.value })}
                  >
                    <option value="active">{trans.statusActive}</option>
                    <option value="pending">{trans.statusPending}</option>
                    <option value="inactive">{trans.statusInactive}</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 h-12 rounded-xl border border-border-light text-sm font-black uppercase tracking-widest text-text-muted hover:bg-slate-50 transition-all"
                >
                  {t.admin.common.cancel}
                </button>
                <button
                  disabled={isSubmitting}
                  className="flex-1 h-12 rounded-xl bg-primary text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  {isSubmitting ? t.admin.common.loading : t.admin.common.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 text-center">
              <div className="h-20 w-20 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-[40px]">delete_forever</span>
              </div>
              <h3 className="text-xl font-black text-text-main mb-3">{trans.confirmDeleteTitle}</h3>
              <p className="text-sm text-text-muted leading-relaxed font-medium">
                {trans.confirmDeleteMessage.replace('{name}', selectedUser.full_name || selectedUser.name)}
              </p>
            </div>
            <div className="px-8 pb-8 flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 h-12 rounded-xl border border-border-light text-sm font-black uppercase tracking-widest text-text-muted hover:bg-slate-50 transition-all"
              >
                {t.admin.common.cancel}
              </button>
              <button
                disabled={isSubmitting}
                onClick={handleDeleteUser}
                className="flex-1 h-12 rounded-xl bg-red-600 text-white text-sm font-black uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
              >
                {isSubmitting ? t.admin.common.loading : t.admin.common.delete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
