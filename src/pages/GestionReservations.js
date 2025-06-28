// 🚩 src/pages/GestionReservations.js - Crêperie de Saint Côme

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function GestionReservations() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    const querySnapshot = await getDocs(collection(db, 'reservations'));
    const pendingReservations = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(res => res.statut === 'en attente');
    setReservations(pendingReservations);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleValidation = async (id) => {
    const reservationRef = doc(db, 'reservations', id);
    await updateDoc(reservationRef, { statut: 'validé' });
    alert('Réservation validée');
    fetchReservations();
  };

  const handleRefus = async (id) => {
    const motif = prompt('Raison du refus : Complet, Hors horaires, Autre...');
    if (!motif) return;
    const reservationRef = doc(db, 'reservations', id);
    await updateDoc(reservationRef, { statut: 'refusé', motifRefus: motif });
    alert('Réservation refusée avec motif : ' + motif);
    fetchReservations();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Gestion des Réservations (En attente)</h2>
      {reservations.length === 0 ? (
        <p>Aucune réservation en attente.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Couverts</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.nom}</td>
                <td>{res.email}</td>
                <td>{res.telephone}</td>
                <td>{res.date}</td>
                <td>{res.heure}</td>
                <td>{res.nombre}</td>
                <td>{res.message}</td>
                <td>
                  <button onClick={() => handleValidation(res.id)}>✅ Valider</button>
                  <button onClick={() => handleRefus(res.id)}>❌ Refuser</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
