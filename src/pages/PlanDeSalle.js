// 🚩 src/pages/PlanDeSalle.js - Plan de Salle connecté à Firestore

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

export default function PlanDeSalle() {
  const [tables, setTables] = useState([]);
  const [vue, setVue] = useState('salle'); // salle ou terrasse

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tables'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTables(data);
    });
    return () => unsubscribe();
  }, []);

  const toggleEtat = async (table) => {
    const tableRef = doc(db, 'tables', table.id);
    const newEtat = table.etat === 'libre' ? 'occupée' : 'libre';
    await updateDoc(tableRef, { etat: newEtat });
  };

  const filteredTables = tables.filter(t => t.emplacement === vue);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>Plan de Salle ({vue === 'salle' ? 'Salle' : 'Terrasse'})</h2>
      <button onClick={() => setVue(vue === 'salle' ? 'terrasse' : 'salle')}>
        {vue === 'salle' ? 'Voir Terrasse' : 'Voir Salle'}
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '10px',
        marginTop: '20px'
      }}>
        {filteredTables.map((table) => (
          <div
            key={table.id}
            onClick={() => toggleEtat(table)}
            style={{
              backgroundColor: table.etat === 'libre' ? '#c8e6c9' : '#ffcdd2',
              padding: '10px',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            <strong>{table.nom}</strong><br />
            {table.etat === 'libre' ? 'Libre' : 'Occupée'}
          </div>
        ))}
      </div>
    </div>
  );
}
