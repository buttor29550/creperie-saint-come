import React from 'react';

export default function PlanSalle() {
  const handleClick = (tableNumber) => {
    console.log(`Table ${tableNumber} cliquée pour réservation.`);
    alert(`Table ${tableNumber} cliquée pour réservation.`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Plan de Salle - Crêperie de Saint Côme</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '20px', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5, 6].map((table) => (
          <div
            key={table}
            onClick={() => handleClick(table)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '18px'
            }}
          >
            Table {table}
          </div>
        ))}
      </div>
    </div>
  );
}
