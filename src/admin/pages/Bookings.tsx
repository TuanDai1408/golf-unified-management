
import React, { useState, useEffect, useCallback } from 'react';
import { BookingStatus } from '../types';
import { useLanguage } from '../../shared/LanguageContext';
import { apiService } from '../services/api';

const Bookings: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.admin.bookings;

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const [stats, setStats] = useState({
    total: "0",
    revenue: "0",
    cancelled: "0",
    pending: "0"
  });

  // Add Booking Form State
  const [addForm, setAddForm] = useState({
    userId: '',
    courseId: '',
    date: '',
    teeTimeId: '',
    players: 1,
    price: 0
  });

  const [options, setOptions] = useState({
    users: [] as any[],
    courses: [] as any[],
    teeTimes: [] as any[]
  });

  const [submitting, setSubmitting] = useState(false);

  const formatVNTime = (dateString: string) => {
    if (!dateString) return '---';
    try {
      let normalized = dateString.replace(' ', 'T');
      if (!normalized.includes('Z') && !normalized.includes('+')) {
        normalized += 'Z';
      }
      const date = new Date(normalized);
      if (isNaN(date.getTime())) return dateString;

      return new Intl.DateTimeFormat('vi-VN', {
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

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBookings();
      if (data) {
        setBookings(data.bookings || []);
        setStats({
          total: data.totalCount?.toString() || data.bookings?.length.toString() || "0",
          revenue: data.totalRevenue || "0",
          cancelled: data.cancelledCount?.toString() || "0",
          pending: data.pendingCount?.toString() || "0"
        });
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    // Fetch initial options for Add Booking
    const fetchOptions = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          apiService.getUsers(),
          apiService.getCourses()
        ]);
        setOptions(prev => ({
          ...prev,
          users: usersRes || [],
          courses: coursesRes || []
        }));
      } catch (error) {
        console.error("Failed to fetch form options:", error);
      }
    };
    fetchOptions();
  }, []);

  // Fetch Tee Times when course or date changes
  useEffect(() => {
    if (addForm.courseId && addForm.date) {
      const fetchTimes = async () => {
        try {
          const times = await apiService.getTeeTimes(addForm.courseId, addForm.date, true);
          setOptions(prev => ({ ...prev, teeTimes: times || [] }));
        } catch (error) {
          console.error("Failed to fetch tee times:", error);
        }
      };
      fetchTimes();
    }
  }, [addForm.courseId, addForm.date]);

  const handleAddBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.userId || !addForm.courseId || !addForm.teeTimeId || !addForm.date) {
      alert(trans.validationAlert);
      return;
    }

    try {
      setSubmitting(true);
      await apiService.adminCreateBooking({
        user_id: addForm.userId,
        golf_course_id: addForm.courseId,
        tee_time_instance_id: addForm.teeTimeId,
        players: addForm.players,
        total_price: addForm.price
      });
      setShowAddModal(false);
      setAddForm({ userId: '', courseId: '', date: '', teeTimeId: '', players: 1, price: 0 });
      fetchBookings();
      alert(trans.successAlert);
    } catch (error: any) {
      alert(trans.errorAlert + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const courses = Array.from(new Set(bookings.map(b => b.courseName || b.course))).filter(Boolean);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = (booking.customerName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.bookingCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.id || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" ||
      (statusFilter === "pending" ? ['pending', 'locked', 'PENDING_PAYMENT'].includes(booking.status) : booking.status === statusFilter);
    const matchesCourse = courseFilter === "all" || (booking.courseName || booking.course) === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const handleExport = () => {
    const headers = ["ID", "Booking Time", "Customer", "Email", "Phone", "Slot", "Date", "Course", "Players", "Price", "Status"];
    const csvData = filteredBookings.map(b => [
      b.bookingCode || b.id,
      formatVNTime(b.created_at),
      b.customerName,
      b.customerEmail,
      b.customerPhone,
      b.teeTime,
      b.date || b.playDate,
      b.courseName || b.course,
      b.players,
      b.price || b.total_price,
      b.status
    ]);

    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statCards = [
    { label: t.admin.dashboard.totalBookings, value: stats.total, icon: "calendar_today" },
    { label: t.admin.dashboard.totalRevenue, value: stats.revenue, icon: "payments" },
    { label: trans.filterPending, value: stats.pending, icon: "pending_actions" },
    { label: trans.filterCancelled, value: stats.cancelled, icon: "cancel" },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">{trans.title}</h2>
          <p className="text-slate-500 font-medium">{trans.subtitle}</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
        >
          <span className="material-symbols-outlined text-[22px]">add</span>
          {trans.addBooking}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-emerald-600">{card.icon}</span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{card.label}</p>
            <div className="flex items-end gap-3 mt-1">
              <p className="text-4xl font-black text-slate-900">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full lg:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input
              type="text"
              placeholder={trans.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 transition-all focus:outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t.admin.common.filter}: {trans.filterAll}</option>
            <option value="confirmed">{trans.filterConfirmed}</option>
            <option value="pending">{trans.filterPending}</option>
            <option value="cancelled">{trans.filterCancelled}</option>
          </select>

          <select
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-900 transition-all focus:outline-none cursor-pointer"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="all">{t.admin.nav.clubs}: {trans.filterAll}</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-900 text-sm font-bold transition-all ml-auto lg:ml-0"
        >
          <span className="material-symbols-outlined text-[20px]">download</span>
          {trans.exportData}
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-widest font-black">
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableId}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableBookingTime}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableCustomer}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableSlot}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableCourse}</th>
                <th className="px-6 py-5 whitespace-nowrap text-center">{trans.tablePlayers}</th>
                <th className="px-6 py-5 whitespace-nowrap text-right">{trans.tablePrice}</th>
                <th className="px-6 py-5 whitespace-nowrap">{trans.tableStatus}</th>
                <th className="px-6 py-5 text-right font-black">{trans.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
                      <p className="text-slate-500 font-bold">{t.admin.common.loading}</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map((booking, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-all cursor-pointer" onClick={() => { setSelectedBooking(booking); setShowDetailsModal(true); }}>
                    <td className="px-6 py-5 text-slate-500 font-mono whitespace-nowrap">{booking.bookingCode || (booking.id && booking.id.substring(0, 8)) || booking.id}</td>
                    <td className="px-6 py-5 text-slate-500 whitespace-nowrap">{formatVNTime(booking.created_at)}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400 overflow-hidden flex-shrink-0">
                          {booking.customerAvatar ? (
                            <img src={booking.customerAvatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            (booking.customerName || booking.customer?.name || 'U').split(' ').map((n: string) => n[0]).join('')
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 leading-tight truncate">{booking.customerName || booking.customer?.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">{booking.customerEmail || booking.customer?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="font-bold text-slate-900">{booking.teeTime}</p>
                      <p className="text-[11px] text-slate-400">{booking.date || booking.playDate}</p>
                    </td>
                    <td className="px-6 py-5 text-slate-900 min-w-[150px]">{booking.courseName || booking.course}</td>
                    <td className="px-6 py-5 text-center text-slate-900">{booking.players}</td>
                    <td className="px-6 py-5 text-right font-black text-slate-900 whitespace-nowrap">{booking.price || (booking.total_price && booking.total_price.toLocaleString()) || '0'}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        ['pending', 'locked', 'PENDING_PAYMENT'].includes(booking.status) ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                          'bg-red-50 text-red-600 border-red-100'
                        }`}>
                        {booking.status === 'confirmed' ? trans.statusConfirmed :
                          booking.status === 'cancelled' ? trans.statusCancelled :
                            ['pending', 'locked', 'PENDING_PAYMENT'].includes(booking.status) ? trans.statusPending : booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="text-slate-400 hover:text-slate-900 p-1 rounded-lg hover:bg-slate-100 transition-all">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-20 text-center text-slate-400 italic">
                    {t.admin.common.noData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{trans.addModalTitle}</h3>
              <button onClick={() => setShowAddModal(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddBookingSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Section */}
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{trans.labelCustomer}</label>
                  <select
                    required
                    value={addForm.userId}
                    onChange={(e) => setAddForm({ ...addForm, userId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="">{trans.placeholderCustomer}</option>
                    {options.users.map(u => (
                      <option key={u.id} value={u.id}>{u.full_name} ({u.phone || u.email})</option>
                    ))}
                  </select>
                </div>

                {/* Course Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{trans.labelCourse}</label>
                  <select
                    required
                    value={addForm.courseId}
                    onChange={(e) => setAddForm({ ...addForm, courseId: e.target.value, teeTimeId: '' })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="">{trans.placeholderCourse}</option>
                    {options.courses.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{trans.labelDate}</label>
                  <input
                    type="date"
                    required
                    value={addForm.date}
                    onChange={(e) => setAddForm({ ...addForm, date: e.target.value, teeTimeId: '' })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>

                {/* Tee Time Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{trans.labelTeeTime}</label>
                  <select
                    required
                    disabled={!addForm.courseId || !addForm.date}
                    value={addForm.teeTimeId}
                    onChange={(e) => setAddForm({ ...addForm, teeTimeId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer disabled:opacity-50"
                  >
                    <option value="">{trans.placeholderTeeTime}</option>
                    {options.teeTimes.map(t => (
                      <option key={t.id} value={t.id} disabled={t.status === 'booked'}>
                        {t.tee_time} ({t.status === 'booked' ? trans.teeTimeFull : trans.teeTimeRemaining.replace('{count}', (t.max_players - t.booked_players).toString())})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Players Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{trans.labelPlayers}</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="4"
                    value={addForm.players}
                    onChange={(e) => setAddForm({ ...addForm, players: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>

                {/* Price Section */}
                <div className="space-y-2 col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">{trans.labelTotalPrice}</label>
                  <input
                    type="number"
                    required
                    value={addForm.price}
                    onChange={(e) => setAddForm({ ...addForm, price: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-xl font-black text-emerald-600 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 rounded-2xl font-bold text-slate-600 transition-all active:scale-95"
                >
                  {trans.btnCancel}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black transition-all shadow-lg shadow-emerald-200 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                  ) : null}
                  {trans.btnConfirm}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{trans.modalTitle}</h3>
              <button onClick={() => setShowDetailsModal(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
              <div className="flex items-center gap-5 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="h-16 w-16 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-2xl text-emerald-600 overflow-hidden shadow-sm">
                  {selectedBooking.customerAvatar ? (
                    <img src={selectedBooking.customerAvatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (selectedBooking.customerName || 'U').split(' ').map((n: string) => n[0]).join('')
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">{selectedBooking.customerName}</h4>
                  <p className="text-sm text-slate-400 mt-1">{selectedBooking.customerEmail}</p>
                  <p className="text-sm text-emerald-600 font-bold mt-0.5">{selectedBooking.customerPhone || trans.modalNoPhone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.tableBookingTime}</p>
                  <p className="font-bold text-slate-900">{formatVNTime(selectedBooking.created_at)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.tableStatus}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${selectedBooking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    selectedBooking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                      'bg-red-50 text-red-600 border-red-100'
                    }`}>
                    {selectedBooking.status === 'confirmed' ? trans.statusConfirmed :
                      selectedBooking.status === 'cancelled' ? trans.statusCancelled : trans.statusPending}
                  </span>
                </div>
                <div className="col-span-2 border-t border-dashed border-slate-100 pt-6">
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.tableCourse}</p>
                  <p className="text-lg font-black text-emerald-600">{selectedBooking.courseName}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.tableDate}</p>
                  <p className="font-bold text-slate-900">{selectedBooking.date || selectedBooking.playDate}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.tableSlot}</p>
                  <p className="font-bold text-slate-900">{selectedBooking.teeTime}</p>
                </div>
                <div className="col-span-2 border-t border-dashed border-slate-100 pt-6 flex justify-between items-center">
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.tablePlayers}</p>
                    <p className="text-xl font-black text-slate-900">{selectedBooking.players}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.tablePrice}</p>
                    <p className="text-3xl font-black text-emerald-600">{selectedBooking.price || (selectedBooking.total_price && selectedBooking.total_price.toLocaleString()) || '0'} <span className="text-sm font-bold text-slate-400">VND</span></p>
                  </div>
                </div>
                {selectedBooking.additional_requests && (
                  <div className="col-span-2 border-t border-dashed border-slate-100 pt-6">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{trans.labelAdditionalRequests}</p>
                    <div className="p-4 bg-slate-50 rounded-xl text-slate-700 font-medium text-sm border border-slate-100 italic">
                      "{selectedBooking.additional_requests}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowDetailsModal(false)} className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all shadow-sm">
                {trans.modalClose}
              </button>
              <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md">
                {trans.modalPrint}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
