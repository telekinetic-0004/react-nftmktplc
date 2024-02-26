// Navbar.js
import React from 'react';
import './Navbar.css'; // Import Navbar styling

function Navbar({ handleOpenCart }) {
  return (
    <nav className="navbar">
      <div className="logo">NFT Marketplace</div>
      <button className="cart-button" onClick={handleOpenCart}>Open Cart</button>
    </nav>
  );
}

export default Navbar;
