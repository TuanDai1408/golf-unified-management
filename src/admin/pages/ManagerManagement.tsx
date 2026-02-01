import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { useLanguage } from '../../shared/LanguageContext';

const ManagerManagement: React.FC = () => {
    const { t } = useLanguage();
    const trans = t.admin.managers;
    const [managers, setManagers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingManager, setEditingManager] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    const [newManager, setNewManager] = useState({
        email: '',
        password: '',
        full_name: '',
        phone: '',
        course_ids: [] as string[]
    });

    const [assignments, setAssignments] = useState<Record<string, string[]>>({});

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (managers.length > 0) {
            fetchAssignments();
        }
    }, [managers]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [mRes, cRes] = await Promise.all([
                apiService.getManagers(),
                apiService.getCourses()
            ]);
            setManagers(mRes);
            const clubsArray = Array.isArray(cRes) ? cRes : (cRes.Courses || cRes.courses || cRes.data || []);
            setCourses(clubsArray);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAssignments = async () => {
        const newAssignments: Record<string, string[]> = {};
        await Promise.all(managers.map(async (m) => {
            try {
                const courseIds = await apiService.getManagerAssignments(m.id);
                newAssignments[m.id] = courseIds;
            } catch (error) {
                console.error(`Failed to fetch assignments for manager ${m.id}:`, error);
            }
        }));
        setAssignments(newAssignments);
    };

    const getAssignedCourseNames = (managerId: string) => {
        const assignedIds = assignments[managerId] || [];
        if (assignedIds.length === 0) return t.admin.common.noData;

        return assignedIds.map(id => {
            const course = courses.find(c => c.id === id);
            return course ? course.name : id;
        }).join(', ');
    };

    const handleCreateManager = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiService.createManager(newManager);
            setShowAddModal(false);
            fetchData();
            // Reset form
            setNewManager({
                email: '',
                password: '',
                full_name: '',
                phone: '',
                course_ids: []
            });
        } catch (error: any) {
            console.error("Create manager error:", error);
            alert(`Lỗi khi tạo manager: ${error.message || "Không xác định"}`);
        }
    };

    const handleUpdateAssignments = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingManager) return;

        setSaving(true);
        try {
            await apiService.updateManagerAssignments(editingManager.id, editingManager.course_ids);
            setShowEditModal(false);
            fetchData();
        } catch (error: any) {
            console.error("Update assignments error:", error);
            alert(`Lỗi khi cập nhật gán sân: ${error.message || "Không xác định"}`);
        } finally {
            setSaving(false);
        }
    };

    const toggleCourseSelection = (courseId: string, isEdit: boolean = false) => {
        if (isEdit) {
            setEditingManager((prev: any) => ({
                ...prev,
                course_ids: prev.course_ids.includes(courseId)
                    ? prev.course_ids.filter((id: string) => id !== courseId)
                    : [...prev.course_ids, courseId]
            }));
        } else {
            setNewManager(prev => ({
                ...prev,
                course_ids: prev.course_ids.includes(courseId)
                    ? prev.course_ids.filter(id => id !== courseId)
                    : [...prev.course_ids, courseId]
            }));
        }
    };

    const openEditModal = (manager: any) => {
        setEditingManager({
            ...manager,
            course_ids: assignments[manager.id] || []
        });
        setShowEditModal(true);
    };

    return (
        <div className="p-6 lg:p-10 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-text-main">{trans.title}</h2>
                    <p className="text-text-muted font-medium">{trans.subtitle}</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95"
                >
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    {trans.addBtn}
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-border-light">
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest">{trans.tableName}</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest">{trans.tableContact}</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest">{trans.tableCourses}</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest text-right">{trans.tableActions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light">
                            {managers.length > 0 ? managers.map((m) => (
                                <tr key={m.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-text-main">{m.full_name || m.name}</td>
                                    <td className="px-6 py-4 text-sm text-text-muted">
                                        <div>{m.email}</div>
                                        <div>{m.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {assignments[m.id] ? (
                                                getAssignedCourseNames(m.id).split(', ').map((name, idx) => (
                                                    <span key={idx} className="text-[10px] bg-primary-subtle text-primary border border-primary-light px-2 py-0.5 rounded-full font-bold">
                                                        {name}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="text-xs text-text-muted italic">{t.admin.common.loading}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => openEditModal(m)}
                                            className="p-2 text-text-muted hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-text-muted italic">{trans.empty}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal - Basic implementation */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-border-light flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-black text-text-main">{trans.modalTitle}</h3>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleCreateManager} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-text-muted ml-1">{trans.labelName}</label>
                                    <input
                                        required
                                        className="w-full h-12 px-4 rounded-xl border border-border-light bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-medium"
                                        placeholder={trans.labelName}
                                        value={newManager.full_name}
                                        onChange={e => setNewManager({ ...newManager, full_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-text-muted ml-1">{trans.labelPhone}</label>
                                    <input
                                        required
                                        className="w-full h-12 px-4 rounded-xl border border-border-light bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-medium"
                                        placeholder="0xxxxxxxxx"
                                        value={newManager.phone}
                                        onChange={e => setNewManager({ ...newManager, phone: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-text-muted ml-1">{trans.labelEmail}</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full h-12 px-4 rounded-xl border border-border-light bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-medium"
                                        placeholder="manager@golfviet.vn"
                                        value={newManager.email}
                                        onChange={e => setNewManager({ ...newManager, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-text-muted ml-1">{trans.labelPassword}</label>
                                    <input
                                        required
                                        type="password"
                                        className="w-full h-12 px-4 rounded-xl border border-border-light bg-slate-50 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm font-medium"
                                        placeholder="••••••••"
                                        value={newManager.password}
                                        onChange={e => setNewManager({ ...newManager, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase text-text-muted ml-1 block">{trans.labelAssign}</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {courses.map(course => (
                                        <button
                                            key={course.id}
                                            type="button"
                                            onClick={() => toggleCourseSelection(course.id)}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${newManager.course_ids.includes(course.id)
                                                ? 'bg-primary-subtle border-primary text-primary'
                                                : 'bg-white border-border-light text-text-muted hover:border-slate-400'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {newManager.course_ids.includes(course.id) ? 'check_box' : 'check_box_outline_blank'}
                                            </span>
                                            <span className="text-xs font-bold truncate">{course.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 h-12 rounded-xl border border-border-light font-bold text-text-muted hover:bg-slate-50 transition-all"
                                >
                                    {trans.btnCancel}
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-green-200 transition-all"
                                >
                                    {trans.btnConfirm}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Edit Modal */}
            {showEditModal && editingManager && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-border-light flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="text-xl font-black text-text-main">Chỉnh sửa gán sân</h3>
                                <p className="text-sm font-bold text-text-muted">{editingManager.full_name || editingManager.name}</p>
                            </div>
                            <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleUpdateAssignments} className="p-6 space-y-6">
                            <div className="space-y-4">
                                <label className="text-xs font-black uppercase text-text-muted ml-1 block">{trans.labelAssign}</label>
                                <div className="grid grid-cols-2 gap-2 max-h-[40vh] overflow-y-auto pr-2">
                                    {courses.map(course => (
                                        <button
                                            key={course.id}
                                            type="button"
                                            onClick={() => toggleCourseSelection(course.id, true)}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${editingManager.course_ids.includes(course.id)
                                                ? 'bg-primary-subtle border-primary text-primary'
                                                : 'bg-white border-border-light text-text-muted hover:border-slate-400'
                                                }`}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {editingManager.course_ids.includes(course.id) ? 'check_box' : 'check_box_outline_blank'}
                                            </span>
                                            <span className="text-xs font-bold truncate">{course.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 h-12 rounded-xl border border-border-light font-bold text-text-muted hover:bg-slate-50 transition-all"
                                >
                                    {trans.btnCancel}
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 h-12 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {saving && <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />}
                                    {trans.btnConfirm}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagerManagement;
