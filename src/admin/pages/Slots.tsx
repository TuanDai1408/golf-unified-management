import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../shared/LanguageContext';
import { apiService } from '../services/api';

const Slots: React.FC = () => {
  const { t, language } = useLanguage();
  const trans = t.admin.slots;

  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [slots, setSlots] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId && selectedDate) {
      fetchSlots(selectedCourseId, selectedDate);
    }
  }, [selectedCourseId, selectedDate]);

  const fetchCourses = async () => {
    try {
      const data = await apiService.getCourses();
      setCourses(data);
      if (data.length > 0 && !selectedCourseId) {
        setSelectedCourseId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const fetchSlots = async (courseId: string, date: string) => {
    console.log(`[Slots] Fetching slots for course: ${courseId}, date: ${date}`);
    setIsLoading(true);
    try {
      const data = await apiService.getTeeTimes(courseId, date, true); // allStatus = true
      console.log(`[Slots] Received ${data?.length || 0} slots`);
      // Sort by time
      const sorted = data.sort((a: any, b: any) => a.tee_time.localeCompare(b.tee_time));
      setSlots(sorted);
    } catch (error) {
      console.error('Failed to fetch slots:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const statusColors: any = {
    available: 'bg-emerald-50 border-emerald-500 text-emerald-700',
    full: 'bg-red-50 border-red-500 text-red-700',
    booked: 'bg-blue-50 border-blue-500 text-blue-700',
    locked: 'bg-amber-50 border-amber-500 text-amber-700',
    closed: 'bg-slate-100 border-slate-400 text-slate-500',
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available': return trans.statusAvailable;
      case 'full': return trans.statusFull;
      case 'closed': return trans.statusClosed;
      default: return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-slate-50">
      <div className="p-6 lg:p-8 border-b border-border-light bg-white space-y-6">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <h2 className="text-3xl font-black text-text-main tracking-tight">{trans.title}</h2>
            <div className="flex items-center gap-4 mt-3">
              <button
                onClick={handlePrevDay}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-border-light hover:bg-slate-100 text-text-muted transition-all"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex items-center gap-2 group relative">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
                <input
                  type="date"
                  className="text-xl font-black text-text-main bg-transparent outline-none cursor-pointer"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <button
                onClick={handleNextDay}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-border-light hover:bg-slate-100 text-text-muted transition-all"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              {selectedDate === new Date().toISOString().split('T')[0] && (
                <span className="px-3 py-1 bg-primary-subtle text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary-light">Today</span>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 w-64">
              <label className="text-[10px] font-black uppercase text-text-muted tracking-widest">{trans.selectCourse}</label>
              <select
                className="h-11 rounded-xl bg-slate-50 border border-border-light text-text-main px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 md:p-8">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : slots.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-text-muted bg-white rounded-3xl border border-dashed border-slate-300">
            <span className="material-symbols-outlined text-6xl mb-4">event_busy</span>
            <p className="font-bold">{t.admin.common.noData}</p>
            <p className="text-sm mt-1">Vui lòng kiểm tra Quy tắc Tee Time hoặc chọn ngày khác.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`group relative bg-white rounded-3xl border-2 p-5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${slot.status === 'full' ? 'opacity-70 grayscale-[0.3]' : 'hover:-translate-y-1'
                  } ${statusColors[slot.status] || 'border-slate-200'}`}
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-current opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-500"></div>

                <div className="flex justify-between items-start mb-4">
                  <div className="flex flex-col">
                    <span className="text-3xl font-black tracking-tight">{slot.tee_time.substring(0, 5)}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Tee Time</span>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-current border-opacity-20 bg-white/50 backdrop-blur-sm shadow-sm`}>
                    {getStatusLabel(slot.status)}
                  </div>
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold opacity-70">{trans.capacity}</span>
                    <span className="font-black">{slot.booked_players} / {slot.max_players}</span>
                  </div>

                  <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-current transition-all duration-1000"
                      style={{ width: `${(slot.booked_players / slot.max_players) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between pt-4 border-t border-current border-opacity-10">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] opacity-70">person</span>
                    <span className="text-xs font-black">{slot.max_players - slot.booked_players} {t.admin.clubs.holes.split(' ')[0]} {language === 'vi' ? 'còn trống' : 'left'}</span>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-8 right-8 z-30 flex flex-col gap-3">
        <button
          onClick={() => fetchSlots(selectedCourseId, selectedDate)}
          className="h-14 w-14 rounded-full bg-white text-text-main shadow-xl border border-border-light hover:rotate-180 transition-all duration-500 flex items-center justify-center group"
        >
          <span className="material-symbols-outlined text-[28px] font-black group-hover:text-primary">refresh</span>
        </button>
        <button className="h-14 w-14 rounded-full bg-primary text-white shadow-xl shadow-green-200 hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
          <span className="material-symbols-outlined text-[28px] font-black">add</span>
        </button>
      </div>
    </div>
  );
};

export default Slots;
