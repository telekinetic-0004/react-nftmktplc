import React, { useState, useEffect } from 'react';
import Cart from './components/Cart';
import NFTData from './components/NFTData';
import PaymentModal from './components/PaymentModal';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [nftData, setNFTData] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const updateNFTList = (purchasedItems) => {
    const updatedNFTList = nftData.filter(item => !purchasedItems.some(purchasedItem => purchasedItem.id === item.id));
    setNFTData(updatedNFTList);
  };

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
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
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
  {!isWalletConnected && (
    <div>
      <h1>Please connect your MetaMask wallet (base-sepolia testnet) to access the marketplace</h1>
      <button onClick={connectWallet} className='connect-wallet-button'>Connect Wallet</button>
    </div>
  )}
  {isWalletConnected && (
    <>
      <Navbar handleOpenCart={handleOpenCart} />
      {showCart && (
        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          showCart={showCart}
          clearCart={clearCart}
          setShowCart={setShowCart}
          openPaymentModal={handleOpenPaymentModal}
          handleCloseCart={handleCloseCart}
        />
      )}
      <NFTData
        onBuyClick={handleBuyClick}
        cartItems={cartItems}
        openCart={handleOpenCart}
        updateNFTList={updateNFTList}
      />
      {showPaymentModal && (
        <div className='payment-modal-overlay'>
          <div className='payment-modal-popup'>
            <PaymentModal
              showPaymentModal={showPaymentModal}
              closePaymentModal={handleClosePaymentModal}
              cartItems={cartItems}
              updateNFTList={updateNFTList}
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
