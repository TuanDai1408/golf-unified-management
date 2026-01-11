import React, { useState } from 'react';
import { PageId } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TeeSheetCalendar from './pages/TeeSheetCalendar';
import StaffManagement from './pages/StaffManagement';
import TeeSheetList from './pages/TeeSheetList';
import Pricing from './pages/Pricing';
import CourseDetails from './pages/CourseDetails';

const ManagerApp: React.FC = () => {
  const [activePage, setActivePage] = useState<PageId>('tee-sheet');
  const [subView, setSubView] = useState<'calendar' | 'list'>('calendar');

  const renderPage = () => {
    switch (activePage) {
      case 'tee-sheet':
        return subView === 'calendar' ? <TeeSheetCalendar /> : <TeeSheetList />;
      case 'staff':
        return <StaffManagement />;
      case 'pricing':
        return <Pricing />;
      case 'courses':
        return <CourseDetails />;
      default:
        return (
          <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">Page Under Development</h1>
            <p className="text-slate-500">The {activePage} module is currently being built.</p>
          </div>
        );
    }
  };

  return (
    <div className="manager-theme h-screen overflow-hidden">
      <div className="h-full flex overflow-hidden">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <div className="flex-1 flex flex-col min-w-0 bg-background-light">
          <Header
            activePage={activePage}
            subView={subView}
            onSetSubView={setSubView}
            onNavigate={setActivePage}
          />
          <main className="flex-1 overflow-hidden relative">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManagerApp;
