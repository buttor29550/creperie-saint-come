// 🚩 App.js Crêperie de Saint Côme avec route /admin pour Bloc #2

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import ReservationForm from './pages/ReservationForm';
import GestionReservations from './pages/GestionReservations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/admin" element={<GestionReservations />} />
      </Routes>
    </Router>
  );
}

export default App;
