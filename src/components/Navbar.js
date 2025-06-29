// 🚩 src/components/Navbar.js - Crêperie de Saint Côme

import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navStyle = {
    padding: '10px',
    backgroundColor: '#4caf50',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    flexWrap: 'wrap',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '5px',
    backgroundColor: '#388e3c',
    transition: 'background-color 0.2s ease',
  };

  const hoverStyle = {
    backgroundColor: '#2e7d32'
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Accueil</Link>
      <Link to="/plan" style={linkStyle}>Plan de salle</Link>
      <Link to="/admin" style={linkStyle}>Gestion réservations</Link>
      <Link to="/admin-tables" style={linkStyle}>Gestion tables</Link>
      <Link to="/stats" style={linkStyle}>Statistiques</Link>
    </nav>
  );
}
