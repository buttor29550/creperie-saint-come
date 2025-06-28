import React from 'react';

export default function Stats() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Statistiques - Crêperie de Saint Côme</h2>
      <p>Comparaison des réservations :</p>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li>📅 Aujourd'hui vs hier : à intégrer</li>
        <li>📈 Cette semaine vs semaine précédente : à intégrer</li>
        <li>📊 Cette année vs année précédente : à intégrer</li>
      </ul>
      <p style={{ color: 'gray' }}>Module prêt pour connexion Firebase et calculs.</p>
    </div>
  );
}
