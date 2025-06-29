// 🚩 src/App.js - Crêperie de Saint Côme avec Navbar intégrée

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import ReservationForm from './pages/ReservationForm';
import GestionReservations from './pages/GestionReservations';
import PlanDeSalle from './pages/PlanDeSalle';
import AdminTables from './pages/AdminTables';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/admin" element={<GestionReservations />} />
        <Route path="/plan" element={<PlanDeSalle />} />
        <Route path="/admin-tables" element={<AdminTables />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Router>
  );
}

export default App;
