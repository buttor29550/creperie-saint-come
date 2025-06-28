// 🚩 App.js prêt pour Crêperie de Saint Côme avec route formulaire /reservation

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './pages/Accueil';
import ReservationForm from './pages/ReservationForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/reservation" element={<ReservationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
