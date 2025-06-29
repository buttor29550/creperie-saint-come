// 🚩 src/pages/AdminTables.js - Bloc #5 Étape 1 Crêperie de Saint Côme

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

  const updateTableSeats = async (id, newSeats) => {
    await updateDoc(doc(db, 'tables', id), { places: parseInt(newSeats) });
    fetchTables();
  };

  return (
    <div className="container">
      <h2>🪑 Gestion des Tables</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Nom de la table"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Places"
          value={newTableSeats}
          onChange={(e) => setNewTableSeats(e.target.value)}
          min="1"
        />
        <button onClick={addTable}>Ajouter Table</button>
      </div>

      {tables.map(table => (
        <div key={table.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={table.nom}
            onChange={(e) => updateTableName(table.id, e.target.value)}
            style={{ flex: '1' }}
          />
          <input
            type="number"
            value={table.places}
            onChange={(e) => updateTableSeats(table.id, e.target.value)}
            style={{ width: '60px' }}
            min="1"
          />
          <button onClick={() => deleteTable(table.id)} style={{ backgroundColor: '#f44336' }}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}
