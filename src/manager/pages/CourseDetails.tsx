
import React from 'react';
import { useLanguage } from '../../shared/LanguageContext';

const CourseDetails: React.FC = () => {
  const { t } = useLanguage();
  const trans = t.manager.course;
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
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">visibility</span> {trans.viewListing}
          </button>
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
                  <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary focus:border-primary" type="text" defaultValue="Green Valley Championship Course" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.aboutCourse}</label>
                  <div className="w-full rounded-lg border border-slate-200 bg-slate-50 overflow-hidden focus-within:ring-2 focus-within:ring-primary/20">
                    <div className="flex items-center gap-1 p-2 border-b border-slate-200 bg-slate-50/50">
                      <button className="p-1 text-slate-500 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
                      <button className="p-1 text-slate-500 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
                      <button className="p-1 text-slate-500 hover:bg-slate-200 rounded"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
                    </div>
                    <textarea className="w-full border-none bg-transparent p-3 text-slate-900 focus:ring-0" rows={4} placeholder={trans.aboutPlaceholder} defaultValue="Nestled in the rolling hills, this 18-hole championship course offers a challenge for golfers of all skill levels." />
                  </div>
                  <p className="text-right text-xs text-slate-400 mt-1">142/500 characters</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.numHoles}</label>
                    <select className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary">
                      <option>{trans.holes9}</option>
                      <option selected>{trans.holes18}</option>
                      <option>{trans.holes36}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.par}</label>
                    <input className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary" type="number" defaultValue={72} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <span className="p-2 bg-green-50 rounded-lg text-primary"><span className="material-symbols-outlined">schedule</span></span>
                <h3 className="text-lg font-bold text-slate-900">{trans.operations}</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.openingHours}</label>
                  <div className="flex items-center gap-3">
                    <input className="flex-1 rounded-lg border-slate-200 bg-slate-50 text-slate-900" type="time" defaultValue="06:00" />
                    <span className="text-slate-400 font-medium">{trans.to}</span>
                    <input className="flex-1 rounded-lg border-slate-200 bg-slate-50 text-slate-900" type="time" defaultValue="19:00" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{trans.cancelPolicy}</label>
                  <textarea className="w-full rounded-lg border-slate-200 bg-slate-50 text-slate-900 focus:ring-primary" rows={3} placeholder="e.g. Full refund if cancelled 24 hours prior..." />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">{trans.publishing}</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-primary text-slate-900 font-bold rounded-lg hover:bg-green-400 shadow-lg shadow-primary/20 flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined">publish</span> {trans.publishChanges}
                </button>
                <button className="w-full py-3 border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 flex justify-center items-center gap-2">
                  <span className="material-symbols-outlined">save</span> {trans.saveDraft}
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 flex justify-between">
                <span>{trans.lastSaved.split(':')[0]}</span><span>2 mins ago</span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{trans.photos}</h3>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">4/10</span>
              </div>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors mb-6 group">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-primary">cloud_upload</span>
                </div>
                <p className="text-sm font-semibold text-slate-700">{trans.uploadLabel}</p>
                <p className="text-xs text-slate-400 mt-1">{trans.uploadHint}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square rounded-lg overflow-hidden bg-cover bg-center border border-slate-100" style={{ backgroundImage: "url('https://picsum.photos/seed/golf1/200/200')" }}></div>
                <div className="aspect-square rounded-lg overflow-hidden bg-cover bg-center border border-slate-100" style={{ backgroundImage: "url('https://picsum.photos/seed/golf2/200/200')" }}></div>
                <div className="aspect-square rounded-lg bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-2">
                  <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-primary w-2/3 animate-pulse"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium uppercase">{trans.uploading}</p>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex gap-3">
              <span className="material-symbols-outlined text-primary">tips_and_updates</span>
              <div>
                <p className="text-sm font-bold text-slate-800 mb-1">Pro Tip</p>
                <p className="text-xs text-slate-600 leading-relaxed">{trans.proTip.replace('Pro Tip: ', '')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl animate-bounce">
          <span className="material-symbols-outlined text-primary">check_circle</span>
          <div>
            <p className="text-sm font-bold">Draft Saved</p>
            <p className="text-xs text-slate-400">All changes secured.</p>
          </div>
          <button className="ml-2 text-slate-500 hover:text-white"><span className="material-symbols-outlined text-[18px]">close</span></button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
