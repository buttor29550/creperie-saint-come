// 🚩 src/pages/Accueil.js - Page d'accueil simple pour Crêperie de Saint Côme

import React from 'react';
import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenue à la Crêperie de Saint Côme</h1>
      <p>Réservez votre table en ligne en quelques clics.</p>
      <Link to="/reservation">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Réserver une table
        </button>
      </Link>
    </div>
  );
}
