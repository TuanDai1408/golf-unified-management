
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminApp from './admin/AdminApp';
import ManagerApp from './manager/ManagerApp';
import AuthPage from './shared/AuthPage';

const App: React.FC = () => {
    const [isAdminAuth, setIsAdminAuth] = useState(() => {
        return localStorage.getItem('isAdminAuth') === 'true';
    });

    const [isManagerAuth, setIsManagerAuth] = useState(() => {
        return localStorage.getItem('isManagerAuth') === 'true';
    });

    const handleAdminLogin = () => {
        setIsAdminAuth(true);
        localStorage.setItem('isAdminAuth', 'true');
    };

    const handleManagerLogin = () => {
        setIsManagerAuth(true);
        localStorage.setItem('isManagerAuth', 'true');
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/manager" replace />} />

            <Route
                path="/manager/*"
                element={
                    isManagerAuth ? (
                        <ManagerApp />
                    ) : (
                        <AuthPage type="manager" onLogin={handleManagerLogin} />
                    )
                }
            />

            <Route
                path="/admin/*"
                element={
                    isAdminAuth ? (
                        <AdminApp />
                    ) : (
                        <AuthPage type="admin" onLogin={handleAdminLogin} />
                    )
                }
            />
        </Routes>
    );
};

export default App;
