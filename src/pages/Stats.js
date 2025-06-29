// 🚩 src/pages/Stats.js - Version Debug Crêperie de Saint Côme

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'reservations'));
        const reservations = snapshot.docs.map(doc => doc.data());

        console.log("Reservations récupérées :", reservations);

        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const month = today.getMonth();

        let todayCount = 0;
        let weekCount = 0;
        let monthCount = 0;
        let totalCouvertsToday = 0;
        let totalCouvertsWeek = 0;

        reservations.forEach(res => {
          if (!res.date) return;
          if (res.date === todayStr) {
            todayCount++;
            totalCouvertsToday += parseInt(res.nombre || 0);
          }
          const resDate = new Date(res.date);
          if (resDate >= weekStart) {
            weekCount++;
            totalCouvertsWeek += parseInt(res.nombre || 0);
          }
          if (resDate.getMonth() === month) {
            monthCount++;
          }
        });

        setStats({
          today: todayCount,
          thisWeek: weekCount,
          thisMonth: monthCount,
          totalCouvertsToday,
          totalCouvertsWeek
        });
      } catch (err) {
        console.error("Erreur Firestore:", err);
        setError('Erreur lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="container"><p>Chargement des statistiques...</p></div>;
  if (error) return <div className="container"><p>{error}</p></div>;
  if (!stats) return <div className="container"><p>Aucune donnée de statistiques disponible.</p></div>;

  return (
    <div className="container">
      <h2>Statistiques des Réservations</h2>
      <div className="card">
        <p>📅 Réservations aujourd'hui : <strong>{stats.today}</strong></p>
        <p>👥 Couverts aujourd'hui : <strong>{stats.totalCouvertsToday}</strong></p>
      </div>
      <div className="card">
        <p>📈 Réservations cette semaine : <strong>{stats.thisWeek}</strong></p>
        <p>👥 Couverts cette semaine : <strong>{stats.totalCouvertsWeek}</strong></p>
      </div>
      <div className="card">
        <p>📊 Réservations ce mois-ci : <strong>{stats.thisMonth}</strong></p>
      </div>
    </div>
  );
}
