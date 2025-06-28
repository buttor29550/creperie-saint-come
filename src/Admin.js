import React from 'react';

export default function Admin() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Admin - Crêperie de Saint Côme</h2>
      <p>Zone d'administration pour :</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>🗂️ Gérer le plan de salle</li>
        <li>🌿 Gérer la terrasse</li>
        <li>🕒 Gérer les créneaux et services</li>
        <li>👥 Gérer les réservations manuelles</li>
      </ul>
      <p style={{ color: 'gray' }}>Structure prête pour développement complet et connexion Firebase.</p>
    </div>
  );
}
