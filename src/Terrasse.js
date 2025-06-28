import React from 'react';

export default function Terrasse() {
  const handleClick = (tableNumber) => {
    console.log(`Table de terrasse ${tableNumber} cliquée pour réservation.`);
    alert(`Table de terrasse ${tableNumber} cliquée pour réservation.`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Terrasse - Crêperie de Saint Côme</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 100px)', gap: '20px', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5, 6].map((table) => (
          <div
            key={table}
            onClick={() => handleClick(table)}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: '#e0f7fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRadius: '8px',
              border: '1px solid #0097a7',
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
