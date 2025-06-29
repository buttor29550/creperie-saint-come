// 🚩 src/pages/PlanDeSalle.js - Bloc #5 Étape 2 avec glisser-déposer Crêperie de Saint Côme

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ReservationCard = ({ reservation }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'RESERVATION',
    item: reservation,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className="card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        padding: '10px',
        marginBottom: '8px',
        border: '1px solid #ccc'
      }}
    >
      <p><strong>{reservation.nom}</strong> ({reservation.nombre} pers)</p>
      <p>{reservation.date} à {reservation.heure}</p>
    </div>
  );
};

const TableCard = ({ table, onDropReservation }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'RESERVATION',
    drop: (item) => onDropReservation(item, table),
    canDrop: () => !table.occupied,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }), [table]);

  return (
    <div
      ref={drop}
      style={{
        padding: '10px',
        border: '2px dashed #ccc',
        backgroundColor: table.occupied ? '#f44336' : isOver && canDrop ? '#4caf50' : '#fff',
        color: table.occupied ? '#fff' : '#000',
        textAlign: 'center',
        borderRadius: '8px',
        cursor: table.occupied ? 'not-allowed' : 'pointer',
        minHeight: '80px'
      }}
    >
      <strong>{table.nom}</strong><br />
      {table.places} places<br />
      {table.occupied && "Occupée"}
    </div>
  );
};

export default function PlanDeSalle() {
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);

  const fetchData = async () => {
    const tablesSnapshot = await getDocs(collection(db, 'tables'));
    const reservationsSnapshot = await getDocs(collection(db, 'reservations'));
    const tablesData = tablesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), occupied: false, reservationId: null }));
    const reservationsData = reservationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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

  const handleDropReservation = async (reservation, table) => {
    if (table.occupied) {
      alert("Table occupée !");
      return;
    }
    await updateDoc(doc(db, 'reservations', reservation.id), {
      statut: 'validé',
      tableId: table.id
    });
    fetchData();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <h2>🪑 Plan de Salle - Glisser/Déposer</h2>
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Réservations */}
          <div style={{ flex: '1' }}>
            <h3>📋 Réservations en attente</h3>
            {reservations.length === 0 && <p>Aucune réservation en attente.</p>}
            {reservations.map(res => (
              <ReservationCard key={res.id} reservation={res} />
            ))}
          </div>

          {/* Tables */}
          <div style={{ flex: '1' }}>
            <h3>🪑 Tables</h3>
            {tables.length === 0 && <p>Aucune table enregistrée.</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              {tables.map(table => (
                <TableCard key={table.id} table={table} onDropReservation={handleDropReservation} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
