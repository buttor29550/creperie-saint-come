// 🚩 src/pages/AdminTables.js - Gestion des tables Crêperie de Saint Côme

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export default function AdminTables() {
  const [tables, setTables] = useState([]);
  const [newTableName, setNewTableName] = useState('');
  const [newTableEmplacement, setNewTableEmplacement] = useState('salle');

  const fetchTables = async () => {
    const querySnapshot = await getDocs(collection(db, 'tables'));
    const tableList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTables(tableList);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const addTable = async () => {
    if (!newTableName.trim()) {
      alert('Veuillez entrer un nom de table.');
      return;
    }
    await addDoc(collection(db, 'tables'), {
      nom: newTableName,
      emplacement: newTableEmplacement,
      etat: 'libre',
      reservations: []
    });
    setNewTableName('');
    fetchTables();
  };

  const deleteTable = async (id) => {
    if (window.confirm('Supprimer cette table ?')) {
      await deleteDoc(doc(db, 'tables', id));
      fetchTables();
    }
  };

  const editTableName = async (id, currentName) => {
    const newName = prompt('Nouveau nom pour la table :', currentName);
    if (!newName) return;
    const tableRef = doc(db, 'tables', id);
    await updateDoc(tableRef, { nom: newName });
    fetchTables();
  };

  const toggleEtat = async (id, currentEtat) => {
    const tableRef = doc(db, 'tables', id);
    const newEtat = currentEtat === 'libre' ? 'occupée' : 'libre';
    await updateDoc(tableRef, { etat: newEtat });
    fetchTables();
  };

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h2>Gestion des Tables</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Nom de la table"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <select
          value={newTableEmplacement}
          onChange={(e) => setNewTableEmplacement(e.target.value)}
          style={{ marginRight: '10px' }}
        >
          <option value="salle">Salle</option>
          <option value="terrasse">Terrasse</option>
        </select>
        <button onClick={addTable}>➕ Ajouter Table</button>
      </div>

      {tables.length === 0 ? (
        <p>Aucune table enregistrée pour le moment.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: '100%', textAlign: 'left' }}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Emplacement</th>
              <th>État</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tables.map(table => (
              <tr key={table.id}>
                <td>{table.nom}</td>
                <td>{table.emplacement}</td>
                <td>{table.etat}</td>
                <td>
                  <button onClick={() => editTableName(table.id, table.nom)}>✏️ Modifier</button>
                  <button onClick={() => toggleEtat(table.id, table.etat)}>🔄 Changer état</button>
                  <button onClick={() => deleteTable(table.id)}>🗑️ Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
