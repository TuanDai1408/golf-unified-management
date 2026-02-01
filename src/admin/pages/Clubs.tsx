
import React, { useMemo, useState, useEffect } from 'react';
import { ClubStatus } from '../types';
import { useLanguage } from '../../shared/LanguageContext';
import { apiService } from '../services/api';

const Clubs: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.admin.clubs;

  const [clubs, setClubs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCourses().catch(() => null);
        if (data) {
          // Robust check for different response structures
          const clubsArray = Array.isArray(data) ? data : (data.Courses || data.courses || data.data || []);

          const mappedClubs = clubsArray.map((course: any) => ({
            ...course,
            id: course.id || `#GC-${Math.floor(Math.random() * 9000) + 1000}`,
            image: (Array.isArray(course.images) && course.images.length > 0)
              ? course.images[0]
              : (course.image || course.imageUrl || 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1000'),
            trend: course.trend || '+0%',
            progress: course.progress || 0,
            bookings: course.bookings || '0/0',
            location: course.region || course.address?.split(',').slice(-1)[0]?.trim() || 'Việt Nam',
            price: (course.price_weekday || 1500000).toLocaleString() + ' VND'
          }));
          setClubs(mappedClubs);
        }
      } catch (error) {
        console.error("Failed to fetch clubs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ClubStatus>('all');

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    location: '',
    holes: 18,
    par: 72,
    status: ClubStatus.Open as ClubStatus,
    image: '',
  });

  const filteredClubs = useMemo(
    () =>
      clubs.filter((club) => {
        const matchSearch =
          !searchTerm ||
          club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          club.id.toLowerCase().includes(searchTerm.toLowerCase());

        const matchStatus =
          statusFilter === 'all'
            ? true
            : club.status === statusFilter;

        return matchSearch && matchStatus;
      }),
    [clubs, searchTerm, statusFilter]
  );

  const openEditModal = (index: number) => {
    const club = clubs[index];
    setEditingIndex(index);
    setEditForm({
      name: club.name,
      location: club.location,
      holes: club.holes,
      par: club.par,
      status: club.status,
      image: club.image,
    });
  };

  const closeEditModal = () => {
    setEditingIndex(null);
  };

  const handleEditChange = (
    field: 'name' | 'location' | 'holes' | 'par' | 'status' | 'image',
    value: string
  ) => {
    setEditForm((prev) => ({
      ...prev,
      [field]:
        field === 'holes' || field === 'par'
          ? Number(value) || 0
          : field === 'status'
            ? (value as ClubStatus)
            : value,
    }));
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;

    setClubs((prev) =>
      prev.map((club, idx) =>
        idx === editingIndex
          ? { ...club, ...editForm }
          : club
      )
    );

    setEditingIndex(null);
  };

  const statusTags = [
    {
      label: trans.filterAll,
      key: 'all' as const,
      color: 'primary',
    },
    {
      label: t.admin.slots.statusAvailable,
      key: ClubStatus.Open as const,
      color: 'emerald',
    },
    {
      label: trans.statusMaintenance,
      key: ClubStatus.Maintenance as const,
      color: 'amber',
    },
    {
      label: t.admin.slots.statusClosed,
      key: ClubStatus.Closed as const,
      color: 'red',
    },
  ];

  return (
    <div className="p-6 lg:p-10 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-text-main tracking-tight">{trans.title}</h2>
          <p className="text-text-muted font-medium">{trans.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 h-12 rounded-xl border border-border-light bg-white text-text-main text-sm font-black hover:bg-slate-50 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            {t.admin.common.export}
          </button>
          <button className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-black shadow-lg shadow-green-200 transition-all active:scale-95">
            <span className="material-symbols-outlined text-[20px]">add</span>
            {trans.addClub}
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-border-light shadow-sm flex flex-col xl:flex-row gap-6 items-center">
        <div className="relative w-full xl:w-80 group">
          <input
            className="w-full h-11 rounded-xl bg-slate-50 border border-border-light text-text-main placeholder-text-muted focus:border-primary focus:ring-1 focus:ring-primary pl-10 text-sm font-medium"
            placeholder={trans.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-3 top-3 text-text-muted text-[20px] group-focus-within:text-primary transition-colors">search</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full">
          <span className="text-[10px] font-black uppercase text-text-muted tracking-widest mr-2">{trans.quickFilter}:</span>
          {statusTags.map((tag) => (
            <button
              key={tag.key}
              onClick={() => setStatusFilter(tag.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${statusFilter === tag.key
                ? 'bg-primary text-white border-primary shadow-md'
                : 'bg-white text-text-muted border-border-light hover:border-slate-400'
                }`}
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border-light rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-border-light text-[11px] uppercase tracking-widest text-text-muted font-black">
                <th className="p-6">{trans.title.split(' ').slice(0, 2).join(' ')}</th>
                <th className="p-6">{t.admin.bookings.tableCourse}</th>
                <th className="p-6">{t.admin.reports.inventory}</th>
                <th className="p-6">{t.admin.slots.status}</th>
                <th className="p-6">{trans.bookingsToday}</th>
                <th className="p-6 text-right">{t.admin.bookings.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light font-medium">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                      <p className="text-text-muted font-bold">{t.admin.common.loading}</p>
                    </div>
                  </td>
                </tr>
              ) : filteredClubs.length > 0 ? (
                filteredClubs.map((club, i) => (
                  <tr key={i} className="group hover:bg-slate-50 transition-all cursor-pointer">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div
                          className="h-12 w-12 rounded-xl bg-cover bg-center shrink-0 border border-border-light shadow-sm group-hover:scale-105 transition-transform"
                          style={{ backgroundImage: `url(${club.image})` }}
                        ></div>
                        <div className="flex flex-col">
                          <span className="text-text-main font-black text-base group-hover:text-primary transition-colors">{club.name}</span>
                          <span className="text-[11px] text-text-muted font-mono">{club.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-1.5 text-sm text-text-muted">
                        <span className="material-symbols-outlined text-[18px]">location_on</span>
                        {club.location}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <span className="px-2 py-1 rounded-lg bg-slate-50 border border-border-light text-[10px] text-text-muted font-black uppercase">{club.holes} {trans.holes}</span>
                        <span className="px-2 py-1 rounded-lg bg-slate-50 border border-border-light text-[10px] text-text-muted font-black uppercase">{trans.par} {club.par}</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider ${club.status === ClubStatus.Open ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        club.status === ClubStatus.Maintenance ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-red-50 text-red-600 border-red-200'
                        }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${club.status === ClubStatus.Open ? 'bg-emerald-500' :
                          club.status === ClubStatus.Maintenance ? 'bg-amber-500 animate-pulse' :
                            'bg-red-500'
                          }`}></span>
                        {club.status === ClubStatus.Open ? t.admin.slots.statusAvailable :
                          club.status === ClubStatus.Maintenance ? trans.statusMaintenance :
                            t.admin.slots.statusClosed}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-end justify-between">
                          <span className="text-text-main font-black text-sm">{club.bookings}</span>
                          <span className={`text-[11px] font-bold ${typeof club.trend === 'string' && club.trend.includes('+') ? 'text-emerald-600' : 'text-text-muted'}`}>{club.trend}</span>
                        </div>
                        <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                          <div
                            className={`h-full transition-all duration-1000 ${club.progress === 100 ? 'bg-amber-500' : 'bg-primary'}`}
                            style={{ width: `${club.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditModal(i)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-black border border-border-light text-text-muted hover:text-text-main hover:bg-slate-100 transition-all"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                          {trans.editClub || t.admin.common.edit}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-text-muted italic font-bold">
                    {t.admin.common.noData}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit club modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-border-light max-w-xl w-full mx-4 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-text-main">{trans.editClub}</h3>
                <p className="text-sm text-text-muted mt-1">
                  Cập nhật thông tin hiển thị của sân golf trong bảng điều khiển.
                </p>
              </div>
              <button
                onClick={closeEditModal}
                className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-slate-100 text-text-muted transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">
                  Tên sân
                </label>
                <input
                  className="w-full h-10 rounded-xl border border-border-light px-3 text-sm font-medium text-text-main bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={editForm.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">
                  Vị trí
                </label>
                <input
                  className="w-full h-10 rounded-xl border border-border-light px-3 text-sm font-medium text-text-main bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={editForm.location}
                  onChange={(e) => handleEditChange('location', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">
                  Số hố
                </label>
                <input
                  type="number"
                  min={1}
                  max={36}
                  className="w-full h-10 rounded-xl border border-border-light px-3 text-sm font-medium text-text-main bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={editForm.holes}
                  onChange={(e) => handleEditChange('holes', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">
                  Par
                </label>
                <input
                  type="number"
                  min={1}
                  max={80}
                  className="w-full h-10 rounded-xl border border-border-light px-3 text-sm font-medium text-text-main bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={editForm.par}
                  onChange={(e) => handleEditChange('par', e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">
                  Trạng thái
                </label>
                <select
                  className="w-full h-10 rounded-xl border border-border-light px-3 text-sm font-medium text-text-main bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={editForm.status}
                  onChange={(e) => handleEditChange('status', e.target.value)}
                >
                  <option value={ClubStatus.Open}>{t.admin.slots.statusAvailable}</option>
                  <option value={ClubStatus.Maintenance}>{trans.statusMaintenance}</option>
                  <option value={ClubStatus.Closed}>{t.admin.slots.statusClosed}</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-text-muted">
                  Ảnh (URL)
                </label>
                <input
                  className="w-full h-10 rounded-xl border border-border-light px-3 text-sm font-medium text-text-main bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  value={editForm.image}
                  onChange={(e) => handleEditChange('image', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeEditModal}
                className="px-4 h-10 rounded-xl border border-border-light text-sm font-bold text-text-muted hover:bg-slate-100 transition-all"
              >
                {t.admin.common.cancel}
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-5 h-10 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-black shadow-md shadow-green-200 transition-all active:scale-95"
              >
                {t.admin.common.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
