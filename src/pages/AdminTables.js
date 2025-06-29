// 🚩 src/pages/AdminTables.js - Bloc #5 Étape 1 version améliorée (ergonomie)

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

export default function AdminTables() {
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState('');
  const [newTableSeats, setNewTableSeats] = useState(2);

  const fetchTables = async () => {
    const snapshot = await getDocs(collection(db, 'tables'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTables(data);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const addTable = async () => {
    if (!newTableName.trim()) {
      alert('Veuillez entrer un nom de table.');
      return;
    }
    await addDoc(collection(db, 'tables'), { nom: newTableName, places: parseInt(newTableSeats) });
    setNewTableName('');
    setNewTableSeats(2);
    fetchTables();
  };

  const deleteTable = async (id) => {
    if (window.confirm('Supprimer cette table ?')) {
      await deleteDoc(doc(db, 'tables', id));
      fetchTables();
    }
  };

  const updateTableName = async (id, newName) => {
    await updateDoc(doc(db, 'tables', id), { nom: newName });
    fetchTables();
  };

  const handleSeatsChange = (index, value) => {
    const updatedTables = [...tables];
    updatedTables[index].places = value;
    setTables(updatedTables);
  };

  const saveSeats = async (id, value) => {
    await updateDoc(doc(db, 'tables', id), { places: parseInt(value) });
    fetchTables();
  };

  return (
    <div className="container">
      <h2>🪑 Gestion des Tables</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
        <label>Nom :</label>
        <input
          type="text"
          placeholder="Nom de la table"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
        />
        <label>Places :</label>
        <input
          type="number"
          placeholder="Places"
          value={newTableSeats}
          onChange={(e) => setNewTableSeats(e.target.value)}
          min="1"
          style={{ width: '80px' }}
        />
        <button onClick={addTable}>Ajouter Table</button>
      </div>

      {tables.map((table, index) => (
        <div key={table.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', padding: '10px' }}>
          <label>Nom :</label>
          <input
            type="text"
            value={table.nom}
            onChange={(e) => updateTableName(table.id, e.target.value)}
            style={{ flex: '1' }}
            placeholder="Nom de la table"
          />
          <label>Places :</label>
          <input
            type="number"
            value={table.places}
            onChange={(e) => handleSeatsChange(index, e.target.value)}
            onBlur={() => saveSeats(table.id, table.places)}
            style={{ width: '80px' }}
            min="1"
            placeholder="Places"
          />
          <button onClick={() => deleteTable(table.id)} style={{ backgroundColor: '#f44336' }}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}
