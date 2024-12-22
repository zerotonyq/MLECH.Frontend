import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import MechanicUpdatePage from './components/MechanicUpdatePage';
import DriverUpdatePage from './components/DriverUpdatePage';
import AdminPageM from './components/AdminPageM';
import AdminPageDrivers from './components/AdminPageDrivers';
import AdminPageMain from './components/AdminPageMain';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/mechanic-update" element={<MechanicUpdatePage />} />
        <Route path="/admin-page-mechanics" element={<AdminPageM />} />
        <Route path="/admin-page-main" element={<AdminPageMain />} />
        <Route path="/driver-update" element={<DriverUpdatePage />} />
        <Route path="/admin-page-drivers" element={<AdminPageDrivers />} />
        {/* Перенаправление для неизвестных путей */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
