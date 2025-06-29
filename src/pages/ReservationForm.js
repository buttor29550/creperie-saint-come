// 🚩 src/pages/ReservationForm.js - Crêperie de Saint Côme avec créneaux horaires fixes et correction

import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    date: '',
    heure: '',
    nombre: '',
    message: ''
  });
  const [confirmation, setConfirmation] = useState('');

  const heuresDisponibles = [
    "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30",
    "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom || !formData.email || !formData.telephone || !formData.date || !formData.heure || !formData.nombre) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    try {
      await addDoc(collection(db, 'reservations'), {
        ...formData,
        statut: 'en attente',
        createdAt: serverTimestamp()
      });
      setConfirmation('✅ Réservation envoyée, en attente de validation.');
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        date: '',
        heure: '',
        nombre: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      alert("Erreur lors de l'envoi de la réservation. Veuillez réessayer.");
    }
  };

  return (
    <div className="container">
      <h2>Réserver une table</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="nom" placeholder="Nom*" value={formData.nom} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email*" value={formData.email} onChange={handleChange} />
        <input type="tel" name="telephone" placeholder="Téléphone*" value={formData.telephone} onChange={handleChange} />
        <input type="date" name="date" placeholder="Date*" value={formData.date} onChange={handleChange} />
        <select name="heure" value={formData.heure} onChange={handleChange}>
          <option value="">Choisissez une heure*</option>
          {heuresDisponibles.map((heure, index) => (
            <option key={index} value={heure}>{heure}</option>
          ))}
        </select>
        <input type="number" name="nombre" placeholder="Nombre de couverts*" value={formData.nombre} onChange={handleChange} />
        <textarea name="message" placeholder="Message (facultatif)" value={formData.message} onChange={handleChange}></textarea>
        <button type="submit">Envoyer la réservation</button>
      </form>
      {confirmation && <p>{confirmation}</p>}
    </div>
  );
}
