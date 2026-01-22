import React, { useState, useRef } from 'react';
import { useLanguage } from '../../shared/LanguageContext';
import { createCourse, uploadCourseImages } from '../services/courseService';

const CourseDetails: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.manager.course;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: 'Green Valley Championship Course',
    description: 'Nestled in the rolling hills, this 18-hole championship course offers a challenge for golfers of all skill levels.',
    address: 'Hanoi, Vietnam',
    holes: 18,
    lat: 21.0285,
    lng: 105.8542,
    images: [] as string[],
    max_players: 4,
    region: 'Hanoi',
    price_weekday: 2500000,
    price_weekend: 3500000,
    tee_times: ['06:00', '06:15', '06:30', '07:00', '07:30'] as string[]
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<{ url: string; file: File }[]>([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: '', sub: '' });
  const [newTeeTime, setNewTeeTime] = useState('06:00');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'holes' || name === 'lat' || name === 'lng' || name === 'max_players' || name === 'price_weekday' || name === 'price_weekend' ? Number(value) : value
    }));
  };

  const addTeeTime = () => {
    if (!formData.tee_times.includes(newTeeTime)) {
      setFormData(prev => ({
        ...prev,
        tee_times: [...prev.tee_times, newTeeTime].sort()
      }));
    }
  };

  const removeTeeTime = (time: string) => {
    setFormData(prev => ({
      ...prev,
      tee_times: prev.tee_times.filter(t => t !== time)
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

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);

    // Revoke URL to avoid memory leaks
    URL.revokeObjectURL(previews[index].url);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (status: 'active' | 'draft') => {
    if (selectedFiles.length === 0 && formData.images.length === 0) {
      setToastMessage({ title: 'Error', sub: 'Please upload at least one image' });
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      let imageUrls = [...formData.images];
      if (selectedFiles.length > 0) {
        setToastMessage({ title: 'Uploading', sub: `Uploading ${selectedFiles.length} images...` });
        setShowToast(true);
        const uploadedUrls = await uploadCourseImages(selectedFiles);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      await createCourse({ ...formData, images: imageUrls, status });
      setToastMessage({ title: 'Success', sub: status === 'active' ? 'Course published' : 'Draft saved' });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

      // Reset after success if active
      if (status === 'active') {
        setSelectedFiles([]);
        setPreviews([]);
      }
    } catch (error: any) {
      setToastMessage({ title: 'Error', sub: error.message });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 overflow-y-auto h-full custom-scrollbar bg-background-light">
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900">{trans.title}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> {trans.draft}
              </span>
            </div>
            <p className="text-slate-500 max-w-2xl">{trans.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <span className="p-2 bg-green-50 rounded-lg text-primary"><span className="material-symbols-outlined">golf_course</span></span>
                <h3 className="text-lg font-bold text-slate-900">{trans.generalInfo}</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.courseName}</label>
                  <input
                    name="name"
                    className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                  />
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
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary"
                      value={formData.holes}
                      onChange={handleChange}
                    >
                      <option value={9}>{trans.holes9}</option>
                      <option value={18}>{trans.holes18}</option>
                      <option value={36}>{trans.holes36}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.maxPlayers}</label>
                    <select
                      name="max_players"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary"
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
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary"
                      value={formData.region}
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
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.weekdayPrice}</label>
                    <input
                      name="price_weekday"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary"
                      type="number"
                      value={formData.price_weekday}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.weekendPrice}</label>
                    <input
                      name="price_weekend"
                      className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary"
                      type="number"
                      value={formData.price_weekend}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-semibold text-slate-700 mb-4">{trans.teeTimes}</label>
                  <div className="flex gap-2 mb-4">
                    <select
                      className="flex-1 rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary"
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
                    {formData.tee_times.map(time => (
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
                  onClick={() => handleSubmit('active')}
                  disabled={loading}
                  className="w-full py-3 bg-primary text-slate-900 font-bold rounded-lg hover:bg-green-400 shadow-lg shadow-primary/20 flex justify-center items-center gap-2 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">{loading ? 'sync' : 'publish'}</span> {loading ? 'Processing...' : trans.publishChanges}
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

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl">
            <span className={`material-symbols-outlined text-primary ${loading ? 'animate-spin' : ''}`}>
              {toastMessage.title === 'Error' ? 'error' : (toastMessage.title === 'Uploading' ? 'sync' : 'check_circle')}
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



