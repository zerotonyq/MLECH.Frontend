import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import MechanicUpdatePage from './components/MechanicUpdatePage';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/mechanic-update" element={<MechanicUpdatePage />} />
        <Route path="/admin-page" element={<AdminPage />} />
        {/* Перенаправление для неизвестных путей */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
