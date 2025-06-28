// 🚩 App.js Crêperie de Saint Côme avec gestion dynamique des tables

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import ReservationForm from './pages/ReservationForm';
import GestionReservations from './pages/GestionReservations';
import PlanDeSalle from './pages/PlanDeSalle';
import AdminTables from './pages/AdminTables';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/admin" element={<GestionReservations />} />
        <Route path="/plan" element={<PlanDeSalle />} />
        <Route path="/admin-tables" element={<AdminTables />} />
      </Routes>
    </Router>
  );
}

export default App;
