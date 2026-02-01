import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLanguage } from '../../../shared/LanguageContext';
import { createCourse, uploadCourseImages, getCourses, updateCourse, deleteCourse } from '../../services/courseService';

interface Course {
  id?: string;
  name: string;
  description: string;
  address: string;
  holes: number;
  lat?: number | null;
  lng?: number | null;
  images: string[] | null;
  max_players: number;
  region: string | null;
  price_weekday: number | null;
  price_weekend: number | null;
  tee_times: string[] | null;
  status: 'active' | 'inactive';
}

const CourseDetails: React.FC = () => {
  const { t, language } = useLanguage();
  const trans = t.manager.course;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterHoles, setFilterHoles] = useState<string>('all');
  const [filterMaxPlayers, setFilterMaxPlayers] = useState<string>('all');
  const [filterPriceRange, setFilterPriceRange] = useState<string>('all');

  const [formData, setFormData] = useState<Course>({
    name: '',
    description: '',
    address: '',
    holes: 18,
    lat: 21.0285,
    lng: 105.8542,
    images: [],
    max_players: 4,
    region: 'Hanoi',
    price_weekday: 2500000,
    price_weekend: 3500000,
    tee_times: ['06:00', '06:15', '06:30', '07:00', '07:30'],
    status: 'active'
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', sub: '', type: 'success' as 'success' | 'error' | 'uploading' });
  const [newTeeTime, setNewTeeTime] = useState('06:00');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load courses on mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setIsLoadingCourses(true);
    try {
      const data = await getCourses(true);
      // Transform API data to match our interface
      const transformedData = (Array.isArray(data) ? data : []).map((course: any) => ({
        id: course.id,
        name: course.name || '',
        description: course.description || '',
        address: course.address || '',
        holes: course.holes || 18,
        lat: course.lat,
        lng: course.lng,
        images: course.images || [],
        max_players: course.max_players || 4,
        region: course.region,
        price_weekday: course.price_weekday,
        price_weekend: course.price_weekend,
        tee_times: course.tee_times || [],
        status: course.status || 'active'
      }));
      setCourses(transformedData);
    } catch (error: any) {
      console.error('Failed to load courses:', error);
      setToastMessage({ title: t.manager.common.error, sub: trans.failedToLoadCourses, type: 'error' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoadingCourses(false);
    }
  };

  // Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search by name
      const matchSearch = !searchTerm ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.address.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by region
      const matchRegion = filterRegion === 'all' || course.region === filterRegion;

      // Filter by holes
      const matchHoles = filterHoles === 'all' || course.holes.toString() === filterHoles;

      // Filter by max players
      const matchMaxPlayers = filterMaxPlayers === 'all' || course.max_players.toString() === filterMaxPlayers;

      // Filter by price range
      let matchPrice = true;
      if (filterPriceRange !== 'all') {
        const weekdayPrice = course.price_weekday || 0;
        const weekendPrice = course.price_weekend || 0;
        const avgPrice = (weekdayPrice + weekendPrice) / 2;

        switch (filterPriceRange) {
          case 'under-2m':
            matchPrice = avgPrice < 2000000;
            break;
          case '2m-3m':
            matchPrice = avgPrice >= 2000000 && avgPrice < 3000000;
            break;
          case '3m-4m':
            matchPrice = avgPrice >= 3000000 && avgPrice < 4000000;
            break;
          case 'over-4m':
            matchPrice = avgPrice >= 4000000;
            break;
        }
      }

      return matchSearch && matchRegion && matchHoles && matchMaxPlayers && matchPrice;
    });
  }, [courses, searchTerm, filterRegion, filterHoles, filterMaxPlayers, filterPriceRange]);

  // Get unique regions from courses
  const availableRegions = useMemo(() => {
    const regions = courses
      .map(c => c.region)
      .filter((r): r is string => r !== null && r !== undefined)
      .filter((value, index, self) => self.indexOf(value) === index);
    return regions.sort();
  }, [courses]);

  const handleSelectCourse = (course: Course) => {
    setSelectedCourseId(course.id || null);
    setFormData({
      name: course.name || '',
      description: course.description || '',
      address: course.address || '',
      holes: course.holes || 18,
      lat: course.lat || 21.0285,
      lng: course.lng || 105.8542,
      images: course.images || [],
      max_players: course.max_players || 4,
      region: course.region || 'Hanoi',
      price_weekday: course.price_weekday || 2500000,
      price_weekend: course.price_weekend || 3500000,
      tee_times: course.tee_times || ['06:00', '06:15', '06:30', '07:00', '07:30'],
      status: course.status || 'active'
    });
    setSelectedFiles([]);
    setPreviews([]);

    // Scroll to form
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleNewCourse = () => {
    setSelectedCourseId(null);
    setFormData({
      name: '',
      description: '',
      address: '',
      holes: 18,
      lat: 21.0285,
      lng: 105.8542,
      images: [],
      max_players: 4,
      region: 'Hanoi',
      price_weekday: 2500000,
      price_weekend: 3500000,
      tee_times: ['06:00', '06:15', '06:30', '07:00', '07:30'],
      status: 'active'
    });
    setSelectedFiles([]);
    setPreviews([]);

    // Scroll to form
    setTimeout(() => {
      formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'holes' || name === 'lat' || name === 'lng' || name === 'max_players' || name === 'price_weekday' || name === 'price_weekend' ? Number(value) : value
    }));
  };

  const addTeeTime = () => {
    if (!formData.tee_times?.includes(newTeeTime)) {
      setFormData(prev => ({
        ...prev,
        tee_times: [...(prev.tee_times || []), newTeeTime].sort()
      }));
    }
  };

  const removeTeeTime = (time: string) => {
    setFormData(prev => ({
      ...prev,
      tee_times: (prev.tee_times || []).filter(t => t !== time)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...selectedFiles, ...newFiles].slice(0, 5);
      setSelectedFiles(updatedFiles);

      const newPreviews = updatedFiles.map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setPreviews(newPreviews);
    }
  };

  const removeExistingImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index)
    }));
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    // Revoke URL to avoid memory leaks
    URL.revokeObjectURL(previews[index].url);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  const formatPrice = (price: number | null) => {
    if (!price) return trans.notAvailable;
    const locale = language === 'vi' ? 'vi-VN' : language === 'ko' ? 'ko-KR' : 'en-US';
    return new Intl.NumberFormat(locale).format(price) + ' VND';
  };

  const handleDeleteClick = (course: Course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!courseToDelete?.id) return;

    setIsDeleting(true);
    try {
      await deleteCourse(courseToDelete.id);
      setToastMessage({
        title: t.manager.common.success,
        sub: trans.courseDeletedSuccess,
        type: 'success'
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reload courses
      await loadCourses();

      // Clear selection if deleted course was selected
      if (selectedCourseId === courseToDelete.id) {
        setSelectedCourseId(null);
        handleNewCourse();
      }

      // Close modal
      setShowDeleteModal(false);
      setCourseToDelete(null);
    } catch (error: any) {
      setToastMessage({
        title: t.manager.common.error,
        sub: error.message || trans.deleteFailed,
        type: 'error'
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleStatus = async (e: React.MouseEvent, course: Course) => {
    e.stopPropagation();
    if (!course.id) return;

    const newStatus = course.status === 'active' ? 'inactive' : 'active';
    try {
      await updateCourse(course.id, { status: newStatus });
      setToastMessage({
        title: t.manager.common.success,
        sub: trans.courseUpdatedSuccess,
        type: 'success'
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Update local state
      setCourses(prev => prev.map(c => c.id === course.id ? { ...c, status: newStatus } : c));

      // Update form if this course is selected
      if (selectedCourseId === course.id) {
        setFormData(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error: any) {
      setToastMessage({
        title: t.manager.common.error,
        sub: error.message || trans.errorOccurred,
        type: 'error'
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0 && (!formData.images || formData.images.length === 0)) {
      setToastMessage({ title: t.manager.common.error, sub: trans.pleaseUploadImage, type: 'error' });
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      let imageUrls = [...(formData.images || [])];
      if (selectedFiles.length > 0) {
        setToastMessage({ title: trans.uploading, sub: trans.uploadingImages.replace('{count}', selectedFiles.length.toString()), type: 'uploading' });
        setShowToast(true);
        const uploadedUrls = await uploadCourseImages(selectedFiles);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      const coursePayload = { ...formData, images: imageUrls };

      if (selectedCourseId) {
        // Update existing course
        await updateCourse(selectedCourseId, coursePayload);
        setToastMessage({ title: t.manager.common.success, sub: trans.courseUpdatedSuccess, type: 'success' });
        await loadCourses(); // Reload courses
      } else {
        // Create new course
        await createCourse(coursePayload);
        setToastMessage({ title: t.manager.common.success, sub: status === 'active' ? trans.coursePublished : trans.draftSaved, type: 'success' });
        await loadCourses(); // Reload courses
      }

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset after success if active
      if (formData.status === 'active') {
        setSelectedFiles([]);
        setPreviews([]);
        if (!selectedCourseId) {
          handleNewCourse();
        }
      }
    } catch (error: any) {
      setToastMessage({ title: t.manager.common.error, sub: error.message || trans.errorOccurred, type: 'error' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 overflow-y-auto h-full custom-scrollbar bg-background-light">
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">{trans.title}</h1>
              {selectedCourseId && (
                <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> {t.manager.common.edit}
                </span>
              )}
            </div>
            <p className="text-slate-500 max-w-2xl">{trans.subtitle}</p>
          </div>
          <button
            onClick={handleNewCourse}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-slate-900 font-bold rounded-lg hover:bg-green-400 shadow-md transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            {trans.addNewCourse}
          </button>
        </div>

        {/* Course List Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">{trans.courseList} ({filteredCourses.length})</h3>
            <button
              onClick={loadCourses}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              {trans.refresh}
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={trans.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">search</span>
            </div>

            {/* Filter Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Region Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.filterRegion}</label>
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{trans.all}</option>
                  {availableRegions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Holes Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.filterHoles}</label>
                <select
                  value={filterHoles}
                  onChange={(e) => setFilterHoles(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{trans.all}</option>
                  <option value="9">{trans.holes9}</option>
                  <option value="18">{trans.holes18}</option>
                  <option value="27">27 {trans.holesLabel.split(' ')[1] || 'lỗ'}</option>
                  <option value="36">{trans.holes36}</option>
                </select>
              </div>

              {/* Max Players Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.filterMaxPlayers}</label>
                <select
                  value={filterMaxPlayers}
                  onChange={(e) => setFilterMaxPlayers(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{trans.all}</option>
                  <option value="1">1 {trans.player}</option>
                  <option value="2">2 {trans.players}</option>
                  <option value="3">3 {trans.players}</option>
                  <option value="4">4 {trans.players}</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.filterPriceRange}</label>
                <select
                  value={filterPriceRange}
                  onChange={(e) => setFilterPriceRange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="all">{trans.all}</option>
                  <option value="under-2m">{trans.under2M}</option>
                  <option value="2m-3m">{trans.between2M3M}</option>
                  <option value="3m-4m">{trans.between3M4M}</option>
                  <option value="over-4m">{trans.over4M}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course List */}
          {isLoadingCourses ? (
            <div className="text-center py-12 text-slate-500">
              <span className="material-symbols-outlined animate-spin text-4xl mb-2">sync</span>
              <p>{t.manager.common.loading}</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <span className="material-symbols-outlined text-4xl mb-2">golf_course</span>
              <p>{trans.noCoursesFound}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCourses.map((course) => (
                <div
                  key={course.id || course.name}
                  onClick={() => handleSelectCourse(course)}
                  className={`p-5 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${selectedCourseId === course.id
                    ? 'border-primary bg-primary/5 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Course Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      {course.images && course.images.length > 0 ? (
                        <img
                          src={course.images[0]}
                          alt={course.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Golf+Course';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                          <span className="material-symbols-outlined text-slate-400 text-3xl">golf_course</span>
                        </div>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg mb-1">{course.name}</h4>
                          <p className="text-sm text-slate-600 flex items-center gap-1 mb-2">
                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                            {course.address}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${course.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-500'
                          }`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {course.status === 'active' ? 'visibility' : 'visibility_off'}
                          </span>
                          {course.status === 'active' ? trans.active : trans.inactive}
                        </span>
                        {course.price_weekday && (
                          <span className="px-3 py-1 bg-green-50 text-primary text-xs font-semibold rounded-full">
                            {trans.weekday}: {formatPrice(course.price_weekday)}
                          </span>
                        )}
                        {course.price_weekend && (
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                            {trans.weekend}: {formatPrice(course.price_weekend)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCourse(course);
                          }}
                          className="p-2 rounded-lg hover:bg-slate-200 text-slate-600 transition-colors"
                          title={t.manager.common.edit}
                        >
                          <span className="material-symbols-outlined text-[20px]">edit</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(course);
                          }}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                          title={trans.deleteCourse}
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                      </div>
                      <button
                        onClick={(e) => handleToggleStatus(e, course)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${course.status === 'active'
                          ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          : 'bg-primary text-slate-900 hover:bg-green-400'
                          }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {course.status === 'active' ? 'toggle_on' : 'toggle_off'}
                        </span>
                        {course.status === 'active' ? trans.inactive : trans.active}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Form Section */}
        <div ref={formSectionRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <span className="p-2 bg-green-50 rounded-lg text-primary"><span className="material-symbols-outlined">golf_course</span></span>
                <h3 className="text-lg font-bold text-slate-900">{trans.generalInfo}</h3>
              </div>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.courseName}</label>
                    <input
                      name="name"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary p-2.5"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={trans.enterCourseName}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.status}</label>
                    <select
                      name="status"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="active">{trans.active}</option>
                      <option value="inactive">{trans.inactive}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.aboutCourse}</label>
                  <textarea
                    name="description"
                    className="w-full rounded-lg border-slate-200 bg-slate-50 p-3 text-slate-900 focus:ring-primary"
                    rows={4}
                    placeholder={trans.aboutPlaceholder}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.numHoles}</label>
                    <select
                      name="holes"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      value={formData.holes}
                      onChange={handleChange}
                    >
                      <option value={9}>{trans.holes9}</option>
                      <option value={18}>{trans.holes18}</option>
                      <option value={27}>27 lỗ</option>
                      <option value={36}>{trans.holes36}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.maxPlayers}</label>
                    <select
                      name="max_players"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      value={formData.max_players}
                      onChange={handleChange}
                    >
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? trans.player : trans.players}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.region}</label>
                    <select
                      name="region"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      value={formData.region || 'Hanoi'}
                      onChange={handleChange}
                    >
                      <option value="Hanoi">{trans.hanoi}</option>
                      <option value="Da Nang">{trans.daNang}</option>
                      <option value="Ho Chi Minh City">{trans.hoChiMinh}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.address}</label>
                    <input
                      name="address"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={trans.enterAddress}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.weekdayPrice}</label>
                    <input
                      name="price_weekday"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      type="number"
                      value={formData.price_weekday || ''}
                      onChange={handleChange}
                      placeholder={trans.enterWeekdayPrice}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.weekendPrice}</label>
                    <input
                      name="price_weekend"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      type="number"
                      value={formData.price_weekend || ''}
                      onChange={handleChange}
                      placeholder={trans.enterWeekendPrice}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">{trans.teeTimes}</label>
                  <div className="flex gap-2 mb-4">
                    <select
                      className="flex-1 rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary p-2.5"
                      value={newTeeTime}
                      onChange={(e) => setNewTeeTime(e.target.value)}
                    >
                      {Array.from({ length: 48 }).map((_, i) => {
                        const hour = Math.floor(i / 2).toString().padStart(2, '0');
                        const min = (i % 2 === 0 ? '00' : '30');
                        const time = `${hour}:${min}`;
                        return <option key={time} value={time}>{time}</option>;
                      })}
                    </select>
                    <button
                      type="button"
                      onClick={addTeeTime}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                    >
                      {trans.addTime}
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(formData.tee_times || []).map(time => (
                      <span key={time} className="flex items-center gap-1 px-3 py-1 bg-green-50 text-primary border border-primary/20 rounded-full text-sm font-bold">
                        {time}
                        <button onClick={() => removeTeeTime(time)} className="hover:text-red-500 flex items-center">
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{trans.publishing}</h3>
              <div className="space-y-3">
                <button
                  onClick={() => handleSubmit()}
                  disabled={loading}
                  className="w-full py-3 bg-primary text-slate-900 font-bold rounded-lg hover:bg-green-400 shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">{loading ? 'sync' : 'save'}</span> {loading ? trans.processing : (selectedCourseId ? trans.saveChanges : trans.publishChanges)}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{trans.photos}</h3>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{previews.length}/5</span>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />

              <div className="grid grid-cols-2 gap-3 mb-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                    <img src={preview.url} className="w-full h-full object-cover" alt={`Preview ${index}`} />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}

                {(formData.images || []).map((imageUrl, index) => (
                  <div key={`existing-${index}`} className="relative group aspect-square rounded-lg overflow-hidden border border-slate-200">
                    <img src={imageUrl} className="w-full h-full object-cover" alt={`Existing ${index}`} />
                    <button
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                ))}

                {previews.length < 5 && (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-primary">add_a_photo</span>
                    <span className="text-[10px] font-bold mt-1 text-slate-400 uppercase">Add Photo</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-400 text-center">{trans.uploadHint}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && courseToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50 rounded-full">
                <span className="material-symbols-outlined text-red-600 text-2xl">warning</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{trans.confirmDeleteTitle}</h3>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-slate-700">
                {trans.confirmDeleteMessage.replace('{name}', courseToDelete.name)}
              </p>
              <p className="text-sm text-red-600 font-semibold">
                {trans.confirmDeleteWarning}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {t.manager.common.cancel}
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    {trans.processing}
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                    {trans.deleteCourse}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl">
            <span className={`material-symbols-outlined text-primary ${loading || toastMessage.type === 'uploading' ? 'animate-spin' : ''}`}>
              {toastMessage.type === 'error' ? 'error' : (toastMessage.type === 'uploading' ? 'sync' : 'check_circle')}
            </span>
            <div>
              <p className="text-sm font-bold">{toastMessage.title}</p>
              <p className="text-xs text-slate-400">{toastMessage.sub}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
