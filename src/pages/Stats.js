// 🚩 src/pages/Stats.js - Crêperie de Saint Côme

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function Stats() {
  const [stats, setStats] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    totalCouvertsToday: 0,
    totalCouvertsWeek: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, 'reservations'));
      const reservations = snapshot.docs.map(doc => doc.data());

      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
      const month = new Date().getMonth();

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
    };

    fetchStats();
  }, []);

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
