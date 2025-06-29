// 🚩 src/pages/Stats.js - Crêperie de Saint Côme avec graphiques Chart.js

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Stats() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'reservations'));
      const data = snapshot.docs.map(doc => doc.data());
      setReservations(data);
    };
    fetchData();
  }, []);

  // 📊 Préparation des données pour le graphique Bar
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const reservationsPerDay = [0, 0, 0, 0, 0, 0, 0];
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());

  reservations.forEach(res => {
    if (!res.date) return;
    const resDate = new Date(res.date);
    if (resDate >= weekStart) {
      const dayIndex = resDate.getDay();
      reservationsPerDay[dayIndex]++;
    }
  });

  const barData = {
    labels: days,
    datasets: [
      {
        label: 'Réservations cette semaine',
        data: reservationsPerDay,
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
      },
    ],
  };

  // 📈 Préparation des données pour le graphique Line
  const lineLabels = [];
  const lineDataValues = [];
  for (let i = 1; i <= 31; i++) {
    lineLabels.push(i.toString());
    lineDataValues.push(0);
  }

  reservations.forEach(res => {
    if (!res.date || !res.nombre) return;
    const resDate = new Date(res.date);
    if (resDate.getMonth() === now.getMonth()) {
      const day = resDate.getDate();
      lineDataValues[day - 1] += parseInt(res.nombre);
    }
  });

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: 'Couverts par jour (ce mois)',
        data: lineDataValues,
        fill: false,
        borderColor: 'rgba(33, 150, 243, 0.8)',
        tension: 0.1,
      },
    ],
  };

  // 🧩 Préparation des données pour le graphique Pie
  let enAttente = 0, valide = 0, refuse = 0;
  reservations.forEach(res => {
    if (res.statut === 'en attente') enAttente++;
    else if (res.statut === 'validée') valide++;
    else if (res.statut === 'refusée') refuse++;
  });

  const pieData = {
    labels: ['En attente', 'Validées', 'Refusées'],
    datasets: [
      {
        label: 'Statut des réservations',
        data: [enAttente, valide, refuse],
        backgroundColor: ['rgba(255, 193, 7, 0.6)', 'rgba(76, 175, 80, 0.6)', 'rgba(244, 67, 54, 0.6)'],
      },
    ],
  };

  return (
    <div className="container">
      <h2>📊 Statistiques des Réservations</h2>

      <div className="card">
        <h3>📅 Réservations par jour (cette semaine)</h3>
        <Bar data={barData} />
      </div>

      <div className="card">
        <h3>📈 Couverts par jour (ce mois)</h3>
        <Line data={lineData} />
      </div>

      <div className="card">
        <h3>🧩 Répartition des réservations</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
