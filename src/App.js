import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Accueil from './Accueil';
import PlanSalle from './PlanSalle';
import Terrasse from './Terrasse';
import Stats from './Stats';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Crêperie de Saint Côme</h1>
        <nav>
          <Link to="/">Accueil</Link> |{' '}
          <Link to="/plan-salle">Plan Salle</Link> |{' '}
          <Link to="/terrasse">Terrasse</Link> |{' '}
          <Link to="/stats">Statistiques</Link> |{' '}
          <Link to="/admin">Admin</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/plan-salle" element={<PlanSalle />} />
          <Route path="/terrasse" element={<Terrasse />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
