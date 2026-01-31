import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../../shared/LanguageContext';
import { apiService } from '../services/api';

const TeeTimeRules: React.FC = () => {
    const { t, language } = useLanguage();
    const trans = t.admin.teeTimeRules;
    const commonTrans = t.admin.common;

    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [rules, setRules] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Modal states
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
    const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
    const [editingRule, setEditingRule] = useState<any>(null);

    // Form states
    const [ruleForm, setRuleForm] = useState({
        start_time: '06:00',
        end_time: '18:00',
        interval_minutes: 10,
        max_players: 4,
        apply_days: [] as string[],
        status: 'active'
    });

    const [generateForm, setGenerateForm] = useState({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (selectedCourseId) {
            fetchRules(selectedCourseId);
        } else {
            setRules([]);
        }
    }, [selectedCourseId]);

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

    const fetchRules = async (courseId: string) => {
        setIsLoading(true);
        try {
            const data = await apiService.getRules(courseId);
            setRules(data);
        } catch (error) {
            console.error('Failed to fetch rules:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveRule = async () => {
        try {
            if (editingRule) {
                await apiService.updateRule(editingRule.id, ruleForm);
            } else {
                await apiService.createRule({ ...ruleForm, golf_course_id: selectedCourseId });
            }
            setIsRuleModalOpen(false);
            fetchRules(selectedCourseId);
        } catch (error) {
            alert('Failed to save rule');
        }
    };

    const handleDeleteRule = async (id: string) => {
        if (window.confirm(trans.confirmDelete)) {
            try {
                await apiService.deleteRule(id);
                fetchRules(selectedCourseId);
            } catch (error) {
                alert('Failed to delete rule');
            }
        }
    };

    const handleGenerate = async () => {
        try {
            const res = await apiService.generateInstances({
                courseId: selectedCourseId,
                ...generateForm
            });
            alert(trans.successGenerate.replace('{count}', res.count || 0));
            setIsGenerateModalOpen(false);
        } catch (error: any) {
            alert(error.message || 'Failed to generate slots');
        }
    };

    const toggleDay = (day: string) => {
        setRuleForm(prev => ({
            ...prev,
            apply_days: prev.apply_days.includes(day)
                ? prev.apply_days.filter(d => d !== day)
                : [...prev.apply_days, day]
        }));
    };

    const openEditModal = (rule: any) => {
        setEditingRule(rule);
        setRuleForm({
            start_time: rule.start_time.substring(0, 5),
            end_time: rule.end_time.substring(0, 5),
            interval_minutes: rule.interval_minutes,
            max_players: rule.max_players,
            apply_days: rule.apply_days,
            status: rule.status || 'active'
        });
        setIsRuleModalOpen(true);
    };

    const openAddModal = () => {
        setEditingRule(null);
        setRuleForm({
            start_time: '06:00',
            end_time: '18:00',
            interval_minutes: 10,
            max_players: 4,
            apply_days: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
            status: 'active'
        });
        setIsRuleModalOpen(true);
    };

    const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

    return (
        <div className="p-6 lg:p-10 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h2 className="text-4xl font-black text-text-main tracking-tight">{trans.title}</h2>
                    <p className="text-text-muted font-medium">{trans.subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsGenerateModalOpen(true)}
                        className="flex items-center gap-2 px-6 h-12 rounded-xl border border-border-light bg-white text-text-main text-sm font-black hover:bg-slate-50 transition-all shadow-sm"
                    >
                        <span className="material-symbols-outlined text-[20px]">magic_button</span>
                        {trans.generateSlots}
                    </button>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-6 h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-black shadow-lg shadow-green-200 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        {trans.addRule}
                    </button>
                </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-border-light shadow-sm flex flex-col xl:flex-row gap-6 items-center">
                <div className="relative w-full xl:w-96">
                    <label className="text-[10px] font-black uppercase text-text-muted tracking-widest block mb-2">{t.admin.slots.selectCourse}</label>
                    <select
                        className="w-full h-11 rounded-xl bg-slate-50 border border-border-light text-text-main px-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                    >
                        <option value="">-- {t.admin.slots.selectCourse} --</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-surface border border-border-light rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-border-light text-[11px] uppercase tracking-widest text-text-muted font-black">
                                <th className="p-6">{trans.startTime} - {trans.endTime}</th>
                                <th className="p-6">{trans.interval}</th>
                                <th className="p-6">{trans.maxPlayers}</th>
                                <th className="p-6">{trans.applyDays}</th>
                                <th className="p-6">{trans.status}</th>
                                <th className="p-6 text-right">{t.admin.bookings.tableActions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border-light font-medium">
                            {rules.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-10 text-center text-text-muted">{trans.noRules}</td>
                                </tr>
                            ) : (
                                rules.map((rule) => (
                                    <tr key={rule.id} className="group hover:bg-slate-50 transition-all">
                                        <td className="p-6 font-bold text-text-main">
                                            {rule.start_time.substring(0, 5)} - {rule.end_time.substring(0, 5)}
                                        </td>
                                        <td className="p-6">
                                            <span className="px-2 py-1 rounded-lg bg-slate-50 border border-border-light text-[10px] text-text-muted font-black uppercase">
                                                {rule.interval_minutes} {language === 'vi' ? 'phút' : language === 'ko' ? '분' : 'min'}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[18px] text-text-muted">group</span>
                                                {rule.max_players}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-wrap gap-1">
                                                {rule.apply_days.map((day: any) => (
                                                    <span key={day} className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                                                        {(trans.days as any)[day]}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border uppercase tracking-wider ${rule.status === 'active' || !rule.status ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200'
                                                }`}>
                                                <span className={`h-1.5 w-1.5 rounded-full ${rule.status === 'active' || !rule.status ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                                {rule.status === 'active' || !rule.status ? trans.active : trans.inactive}
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="inline-flex items-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(rule)}
                                                    className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary-subtle transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteRule(rule.id)}
                                                    className="p-2 rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-all"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Rule Modal */}
            {isRuleModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl border border-border-light max-w-lg w-full p-8 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-text-main">
                                {editingRule ? trans.editRule : trans.addRule}
                            </h3>
                            <button onClick={() => setIsRuleModalOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.startTime}</label>
                                    <input
                                        type="time"
                                        className="w-full h-12 rounded-xl bg-slate-50 border border-border-light px-4 text-sm font-bold outline-none focus:border-primary transition-all"
                                        value={ruleForm.start_time}
                                        onChange={e => setRuleForm({ ...ruleForm, start_time: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.endTime}</label>
                                    <input
                                        type="time"
                                        className="w-full h-12 rounded-xl bg-slate-50 border border-border-light px-4 text-sm font-bold outline-none focus:border-primary transition-all"
                                        value={ruleForm.end_time}
                                        onChange={e => setRuleForm({ ...ruleForm, end_time: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.interval}</label>
                                    <input
                                        type="number"
                                        className="w-full h-12 rounded-xl bg-slate-50 border border-border-light px-4 text-sm font-bold outline-none focus:border-primary transition-all"
                                        value={ruleForm.interval_minutes}
                                        onChange={e => setRuleForm({ ...ruleForm, interval_minutes: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.maxPlayers}</label>
                                    <input
                                        type="number"
                                        className="w-full h-12 rounded-xl bg-slate-50 border border-border-light px-4 text-sm font-bold outline-none focus:border-primary transition-all"
                                        value={ruleForm.max_players}
                                        onChange={e => setRuleForm({ ...ruleForm, max_players: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.status}</label>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setRuleForm({ ...ruleForm, status: 'active' })}
                                        className={`flex-1 h-12 rounded-xl border-2 font-bold transition-all ${ruleForm.status === 'active' ? 'bg-primary/5 border-primary text-primary' : 'bg-slate-50 border-transparent text-text-muted'}`}
                                    >
                                        {trans.active}
                                    </button>
                                    <button
                                        onClick={() => setRuleForm({ ...ruleForm, status: 'inactive' })}
                                        className={`flex-1 h-12 rounded-xl border-2 font-bold transition-all ${ruleForm.status === 'inactive' ? 'bg-slate-200 border-slate-400 text-slate-700' : 'bg-slate-50 border-transparent text-text-muted'}`}
                                    >
                                        {trans.inactive}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.applyDays}</label>
                                <div className="flex flex-wrap gap-2">
                                    {dayKeys.map(day => (
                                        <button
                                            key={day}
                                            onClick={() => toggleDay(day)}
                                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all border ${ruleForm.apply_days.includes(day)
                                                    ? 'bg-primary text-white border-primary shadow-md'
                                                    : 'bg-slate-50 text-text-muted border-transparent hover:border-slate-300'
                                                }`}
                                        >
                                            {(trans.days as any)[day]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-10">
                            <button
                                onClick={() => setIsRuleModalOpen(false)}
                                className="flex-1 h-12 rounded-xl border border-border-light font-bold text-text-muted hover:bg-slate-50 transition-all"
                            >
                                {commonTrans.cancel}
                            </button>
                            <button
                                onClick={handleSaveRule}
                                className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover text-white font-black shadow-lg shadow-green-200 transition-all active:scale-95"
                            >
                                {commonTrans.save}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Generate Slots Modal */}
            {isGenerateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl shadow-2xl border border-border-light max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-text-main">{trans.generateSlots}</h3>
                            <button onClick={() => setIsGenerateModalOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-all">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.startDate}</label>
                                <input
                                    type="date"
                                    className="w-full h-12 rounded-xl bg-slate-50 border border-border-light px-4 text-sm font-bold outline-none focus:border-primary transition-all"
                                    value={generateForm.startDate}
                                    onChange={e => setGenerateForm({ ...generateForm, startDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-text-muted tracking-widest">{trans.endDate}</label>
                                <input
                                    type="date"
                                    className="w-full h-12 rounded-xl bg-slate-50 border border-border-light px-4 text-sm font-bold outline-none focus:border-primary transition-all"
                                    value={generateForm.endDate}
                                    onChange={e => setGenerateForm({ ...generateForm, endDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="mt-10">
                            <button
                                onClick={handleGenerate}
                                className="w-full h-14 rounded-2xl bg-primary hover:bg-primary-hover text-white font-black shadow-xl shadow-green-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined">magic_button</span>
                                {trans.generateButton}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeeTimeRules;
