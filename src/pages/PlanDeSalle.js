// 🚩 src/pages/PlanDeSalle.js - Bloc #5 Étape 2 Crêperie de Saint Côme

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function PlanDeSalle() {
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const fetchData = async () => {
    const tablesSnapshot = await getDocs(collection(db, 'tables'));
    const reservationsSnapshot = await getDocs(collection(db, 'reservations'));
    const tablesData = tablesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), occupied: false, reservationId: null }));
    const reservationsData = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Marquer les tables occupées selon les réservations validées
    reservationsData.forEach(res => {
      if (res.statut === 'validé' && res.tableId) {
        const table = tablesData.find(t => t.id === res.tableId);
        if (table) {
          table.occupied = true;
          table.reservationId = res.id;
        }
      }
    });

    setTables(tablesData);
    setReservations(reservationsData.filter(res => res.statut === 'en attente'));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const assignReservationToTable = async (tableId) => {
    if (!selectedReservation) {
      alert("Veuillez sélectionner une réservation à attribuer.");
      return;
    }
    await updateDoc(doc(db, 'reservations', selectedReservation.id), {
      statut: 'validé',
      tableId: tableId
    });
    setSelectedReservation(null);
    fetchData();
  };

  return (
    <div className="container">
      <h2>🪑 Plan de Salle - Attribution des Réservations</h2>
      <div style={{ display: 'flex', gap: '20px' }}>

        {/* Réservations en attente */}
        <div style={{ flex: '1' }}>
          <h3>📋 Réservations en attente</h3>
          {reservations.length === 0 && <p>Aucune réservation en attente.</p>}
          {reservations.map(res => (
            <div
              key={res.id}
              className="card"
              style={{
                border: selectedReservation?.id === res.id ? '2px solid green' : '1px solid #ccc',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedReservation(res)}
            >
              <p><strong>{res.nom}</strong> ({res.nombre} pers)</p>
              <p>{res.date} à {res.heure}</p>
            </div>
          ))}
        </div>

        {/* Plan de salle */}
        <div style={{ flex: '1' }}>
          <h3>🪑 Tables</h3>
          {tables.length === 0 && <p>Aucune table enregistrée.</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {tables.map(table => (
              <div
                key={table.id}
                onClick={() => !table.occupied && assignReservationToTable(table.id)}
                style={{
                  padding: '10px',
                  border: '1px solid #ccc',
                  backgroundColor: table.occupied ? '#f44336' : '#4caf50',
                  color: '#fff',
                  textAlign: 'center',
                  cursor: table.occupied ? 'not-allowed' : 'pointer',
                  borderRadius: '8px'
                }}
              >
                <strong>{table.nom}</strong><br />
                {table.places} places<br />
                {table.occupied && "Occupée"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
