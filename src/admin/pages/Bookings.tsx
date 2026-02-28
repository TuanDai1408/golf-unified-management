
import React, { useState, useEffect } from 'react';
import { BookingStatus } from '../types';
import { useLanguage } from '../../shared/LanguageContext';
import { apiService } from '../services/api';

const Bookings: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.admin.bookings;

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");

  const [stats, setStats] = useState({
    total: "0",
    revenue: "0",
    cancelled: "0"
  });

  const formatVNTime = (dateString: string) => {
    if (!dateString) return '---';
    try {
      // Chuẩn hóa chuỗi ISO: thay dấu cách bằng 'T' và thêm 'Z' nếu thiếu múi giờ
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

  const courses = Array.from(new Set(bookings.map(b => b.courseName || b.course))).filter(Boolean);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = (booking.customerName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.bookingCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (booking.id || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
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
          <div className="relative w-full lg:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-[20px]">search</span>
            <input
              type="text"
              placeholder={trans.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 bg-white border border-border-light rounded-xl text-sm font-medium focus:outline-none focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 bg-white border border-border-light rounded-xl text-sm font-bold text-text-muted hover:text-text-main transition-all focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t.admin.common.filter}: {trans.filterAll}</option>
            <option value="confirmed">{trans.filterConfirmed}</option>
            <option value="pending">{trans.filterPending}</option>
            <option value="cancelled">{trans.filterCancelled}</option>
          </select>

          <select
            className="px-4 py-2 bg-white border border-border-light rounded-xl text-sm font-bold text-text-muted hover:text-text-main transition-all focus:outline-none"
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
          className="flex items-center gap-2 px-4 py-2 text-text-muted hover:text-text-main text-sm font-bold transition-all ml-auto lg:ml-0"
        >
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
            <tbody className="divide-y divide-border-light text-sm font-medium">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <p className="text-text-muted font-bold">{t.admin.common.loading}</p>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length > 0 ? (
                filteredBookings.map((booking, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer" onClick={() => { setSelectedBooking(booking); setShowModal(true); }}>
                    <td className="px-6 py-5 text-text-muted font-mono whitespace-nowrap">{booking.bookingCode || (booking.id && booking.id.substring(0, 8)) || booking.id}</td>
                    <td className="px-6 py-5 text-text-muted whitespace-nowrap">{formatVNTime(booking.created_at)}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-border-light flex items-center justify-center font-bold text-text-muted overflow-hidden flex-shrink-0">
                          {booking.customerAvatar ? (
                            <img src={booking.customerAvatar} alt="" className="w-full h-full object-cover" />
                          ) : (
                            (booking.customerName || booking.customer?.name || 'U').split(' ').map((n: string) => n[0]).join('')
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-text-main leading-tight truncate">{booking.customerName || booking.customer?.name}</p>
                          <p className="text-[11px] text-text-muted mt-0.5 truncate">{booking.customerEmail || booking.customer?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <p className="font-bold text-text-main">{booking.teeTime}</p>
                      <p className="text-[11px] text-text-muted">{booking.date || booking.playDate}</p>
                    </td>
                    <td className="px-6 py-5 text-text-main min-w-[150px]">{booking.courseName || booking.course}</td>
                    <td className="px-6 py-5 text-center text-text-main">{booking.players}</td>
                    <td className="px-6 py-5 text-right font-black text-text-main whitespace-nowrap">{booking.price || (booking.total_price && booking.total_price.toLocaleString()) || '0'}</td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${booking.status === BookingStatus.Confirmed || booking.status === 'confirmed' ? 'bg-primary-subtle text-primary border-primary-light' :
                        booking.status === BookingStatus.Confirmed || booking.status === 'PENDING_PAYMENT' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          booking.status === BookingStatus.Pending || booking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                            'bg-red-50 text-red-600 border-red-200'
                        }`}>
                        {booking.status === BookingStatus.Confirmed || booking.status === 'confirmed' ? trans.statusConfirmed :
                          booking.status === 'PENDING_PAYMENT' ? trans.statusPending :
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
                  <td colSpan={9} className="px-6 py-20 text-center text-text-muted italic">
                    {t.admin.common.noData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {!loading && filteredBookings.length > 0 && (
          <div className="bg-slate-50 border-t border-border-light px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[13px] font-medium text-text-muted">
              {t.admin.common.loading.replace('...', '')} <span className="font-bold text-text-main">1</span> to <span className="font-bold text-text-main">{filteredBookings.length}</span> of <span className="font-bold text-text-main">{stats.total}</span> results
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border-light flex justify-between items-center bg-slate-50">
              <h3 className="text-xl font-black text-text-main">{trans.modalTitle}</h3>
              <button onClick={() => setShowModal(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-all">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
              <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-2xl border border-border-light">
                <div className="h-16 w-16 rounded-full bg-white border border-border-light flex items-center justify-center font-bold text-2xl text-primary overflow-hidden shadow-sm">
                  {selectedBooking.customerAvatar ? (
                    <img src={selectedBooking.customerAvatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    (selectedBooking.customerName || 'U').split(' ').map((n: string) => n[0]).join('')
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-main leading-tight">{selectedBooking.customerName}</h4>
                  <p className="text-sm text-text-muted mt-1">{selectedBooking.customerEmail}</p>
                  <p className="text-sm text-primary font-bold mt-0.5">{selectedBooking.customerPhone || trans.modalNoPhone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1.5">{trans.tableBookingTime}</p>
                  <p className="font-bold text-text-main">{formatVNTime(selectedBooking.created_at)}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1.5">{trans.tableStatus}</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${selectedBooking.status === BookingStatus.Confirmed || selectedBooking.status === 'confirmed' ? 'bg-primary-subtle text-primary border-primary-light' :
                    selectedBooking.status === 'PENDING_PAYMENT' || selectedBooking.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                      'bg-red-50 text-red-600 border-red-200'
                    }`}>
                    {selectedBooking.status === 'confirmed' ? trans.statusConfirmed :
                      selectedBooking.status === 'cancelled' ? trans.statusCancelled : trans.statusPending}
                  </span>
                </div>
                <div className="col-span-2 border-t border-dashed border-border-light pt-6">
                  <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1.5">{trans.tableCourse}</p>
                  <p className="text-lg font-black text-primary">{selectedBooking.courseName}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1.5">{trans.tableDate}</p>
                  <p className="font-bold text-text-main">{selectedBooking.date || selectedBooking.playDate}</p>
                </div>
                <div>
                  <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1.5">{trans.tableSlot}</p>
                  <p className="font-bold text-text-main">{selectedBooking.teeTime}</p>
                </div>
                <div className="col-span-2 border-t border-dashed border-border-light pt-6 flex justify-between items-center">
                  <div>
                    <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1.5">{trans.tablePlayers}</p>
                    <p className="text-xl font-black text-text-main">{selectedBooking.players}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-black text-text-muted uppercase tracking-widest mb-1.5">{trans.tablePrice}</p>
                    <p className="text-3xl font-black text-primary">{selectedBooking.price || (selectedBooking.total_price && selectedBooking.total_price.toLocaleString()) || '0'} <span className="text-sm font-bold text-text-muted">VND</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-border-light flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white border border-border-light rounded-xl font-bold text-text-main hover:bg-slate-100 transition-all shadow-sm">
                {trans.modalClose}
              </button>
              <button className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-all shadow-md">
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
