// 🚩 src/pages/PlanDeSalle.js - Crêperie de Saint Côme

import React, { useState } from 'react';

export default function PlanDeSalle() {
  const [vue, setVue] = useState('salle'); // 'salle' ou 'terrasse'
  const [service, setService] = useState(1); // 1 ou 2

  const tablesSalle = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    etat: 'libre',
  }));

  const tablesTerrasse = Array.from({ length: 5 }, (_, i) => ({
    id: i + 11,
    etat: 'libre',
  }));

  const [tables, setTables] = useState(tablesSalle);

  const basculerVue = () => {
    if (vue === 'salle') {
      setVue('terrasse');
      setTables(tablesTerrasse);
    } else {
      setVue('salle');
      setTables(tablesSalle);
    }
  };

  const basculerService = () => {
    setService(service === 1 ? 2 : 1);
  };

  const handleClickTable = (id) => {
    alert('Table ' + id + ' - ' + vue + ' - Service ' + service);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Plan de Salle - Service {service} ({vue === 'salle' ? 'Salle' : 'Terrasse'})</h2>
      <button onClick={basculerVue}>
        {vue === 'salle' ? 'Voir Terrasse' : 'Voir Salle'}
      </button>
      <button onClick={basculerService} style={{ marginLeft: '10px' }}>
        {service === 1 ? 'Voir Service 2' : 'Voir Service 1'}
      </button>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        marginTop: '20px'
      }}>
        {tables.map((table) => (
          <div
            key={table.id}
            onClick={() => handleClickTable(table.id)}
            style={{
              padding: '20px',
              backgroundColor: table.etat === 'libre' ? '#c8e6c9' : '#ffcdd2',
              borderRadius: '8px',
              textAlign: 'center',
              cursor: 'pointer'
            }}
          >
            Table {table.id} <br />
            {table.etat === 'libre' ? 'Libre' : 'Occupée'}
          </div>
        ))}
      </div>
    </div>
  );
}
