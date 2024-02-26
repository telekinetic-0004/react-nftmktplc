// App.js
import React, { useState, useEffect } from 'react';
import Cart from './components/Cart';
import NFTData from './components/NFTData';
import PaymentModal from './components/PaymentModal';
import Navbar from './components/Navbar'; // Import Navbar component
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false); // State to control PaymentModal visibility
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    const checkMetaMaskInstalled = async () => {
      if (window.ethereum) {
        setIsMetaMaskInstalled(true);
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsWalletConnected(true);
        }
      }
    };

    checkMetaMaskInstalled();
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setIsWalletConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const handleBuyClick = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleOpenCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const removeFromCart = (itemToRemove) => {
    const updatedCart = cartItems.filter(item => item.id !== itemToRemove.id);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleOpenPaymentModal = () => {
    setShowPaymentModal(true); // Open PaymentModal when called
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false); // Close PaymentModal when called
  };

  if (!isMetaMaskInstalled) {
    return (
      <div>
        <h1>Please install MetaMask to access the marketplace</h1>
      </div>
    );
  }

  return (
    <div className='app'>
      <Navbar handleOpenCart={handleOpenCart} />
      {!isWalletConnected ? (
        <div>
          <h1>Please connect your MetaMask wallet to access the marketplace</h1>
          <button onClick={connectWallet} className='connect-wallet-button'>Connect Wallet</button>
        </div>
      ) : (
        <>
          {showCart && (
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              showCart={showCart}
              clearCart={clearCart}
              setShowCart={setShowCart}
              openPaymentModal={handleOpenPaymentModal} // Pass function to open PaymentModal
              handleCloseCart={handleCloseCart}
            />
          )}
          <NFTData
            onBuyClick={handleBuyClick}
            cartItems={cartItems}
            openCart={handleOpenCart}
          />
          {showPaymentModal && ( // Conditionally render PaymentModal
            <div className='payment-modal-overlay'>
              <div className='payment-modal-popup'>
                <PaymentModal
                  showPaymentModal={showPaymentModal}
                  closePaymentModal={handleClosePaymentModal} // Pass function to close PaymentModal
                  cartItems={cartItems}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
