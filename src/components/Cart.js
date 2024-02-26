// Cart.js
import React from 'react';
import './Cart.css'; // Import Cart styling

function Cart({ cartItems, removeFromCart, clearCart, openPaymentModal, handleCloseCart, showCart }) {
  const totalPrice = cartItems.reduce((total, item) => total + Number(item.price), 0);
  const canPay = totalPrice !== 0;

  const handlePayClick = () => {
    if (canPay) {
      openPaymentModal();
    }
  };

  return (
    <div className={`cart-overlay ${showCart ? 'open' : ''}`}>
      <div className="cart">
        <h2>Cart</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart-message">Add NFTs to cart</div>
        ) : (
          <>
            <div className='cart-items'>
              <table className='cart-contents'>
                <thead>
                  <tr>
                    <th>NFT Details</th>
                    <th>Price (ETH)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td><img src={item.picture} alt={`NFT ${index}`}/></td>
                      <td>{item.price}</td>
                      <td>
                        <button onClick={() => removeFromCart(item)} className='remove-button'>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="cart-actions">
              <button onClick={clearCart} className='clear-button'>Clear Cart</button>
              {canPay && (
                <button onClick={handlePayClick} className='pay-button'>
                  Pay: {totalPrice.toFixed(8)} ETH
                </button>
              )}
            </div>
          </>
        )}
        <button onClick={handleCloseCart} className='close-button'>Close</button>
      </div>
    </div>
  );
}

export default Cart;
