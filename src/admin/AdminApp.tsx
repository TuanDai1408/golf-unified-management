import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Clubs from './pages/Clubs';
import Users from './pages/Users';
import Slots from './pages/Slots';

const AdminApp: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="admin-theme h-screen overflow-hidden">
      <div className="flex h-full overflow-hidden bg-background">
        {/* Sidebar - Mobile Toggle Placeholder */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="clubs" element={<Clubs />} />
              <Route path="users" element={<Users />} />
              <Route path="slots" element={<Slots />} />
              <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminApp;
