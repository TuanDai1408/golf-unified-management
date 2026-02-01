
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminApp from './admin/AdminApp';
import AuthPage from './shared/AuthPage';

const App: React.FC = () => {
    const [auth, setAuth] = useState<{ isAuthenticated: boolean, role: 'admin' | 'manager' | null }>(() => {
        const isAdmin = localStorage.getItem('isAdminAuth') === 'true';
        const isManager = localStorage.getItem('isManagerAuth') === 'true';
        if (isAdmin) return { isAuthenticated: true, role: 'admin' };
        if (isManager) return { isAuthenticated: true, role: 'manager' };
        return { isAuthenticated: false, role: null };
    });

    const handleLogin = (role: 'admin' | 'manager') => {
        setAuth({ isAuthenticated: true, role });
        if (role === 'admin') {
            localStorage.setItem('isAdminAuth', 'true');
            localStorage.removeItem('isManagerAuth');
            localStorage.removeItem('token'); // Clear manager token if any
        } else {
            localStorage.setItem('isManagerAuth', 'true');
            localStorage.removeItem('isAdminAuth');
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/admin" replace />} />

            <Route
                path="/admin/*"
                element={
                    auth.isAuthenticated ? (
                        <AdminApp userRole={auth.role!} />
                    ) : (
                        <Routes>
                            <Route path="login/admin" element={<AuthPage type="admin" onLogin={(role) => handleLogin(role)} />} />
                            <Route path="login/manager" element={<AuthPage type="manager" onLogin={(role) => handleLogin(role)} />} />
                            <Route path="*" element={<Navigate to="login/manager" replace />} />
                        </Routes>
                    )
                }
            />

            {/* Redirect old manager routes to admin */}
            <Route path="/manager/*" element={<Navigate to="/admin" replace />} />
        </Routes>
    );
};

export default App;
