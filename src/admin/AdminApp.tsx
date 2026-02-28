import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Clubs from './pages/Clubs';
import Users from './pages/Users';
import ManagerManagement from './pages/ManagerManagement';
import Slots from './pages/Slots';
import TeeTimeRules from './pages/TeeTimeRules';

// Manager Pages
import CourseDetails from './pages/manager/CourseDetails';

interface AdminAppProps {
  userRole: 'admin' | 'manager';
}

const AdminApp: React.FC<AdminAppProps> = ({ userRole }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isAdmin = userRole === 'admin';

  return (
    <div className={`${userRole}-theme h-screen overflow-hidden bg-background`}>
      <div className="flex h-full overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} userRole={userRole} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Routes>
              {/* Common Routes */}
              <Route path="courses" element={<CourseDetails />} />
              <Route path="clubs" element={<Clubs />} />
              <Route path="tee-time-rules" element={<TeeTimeRules />} />
              <Route path="slots" element={<Slots />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />

              {/* Admin Only Routes */}
              {isAdmin && (
                <>
                  <Route path="users" element={<Users />} />
                  <Route path="managers" element={<ManagerManagement />} />
                </>
              )}

              {/* Default Redirects */}
              <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
