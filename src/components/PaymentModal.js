import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3'; // Import Web3 library
import contractConfig from '../config.json';
import './PaymentModal.css';
import './Cart.css';

function PaymentModal({ showPaymentModal, closePaymentModal, cartItems, setCartItems }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Access contract address and ABI
  const contractAddress = contractConfig.contractAddress;
  const contractABI = contractConfig.contractABI;

  const web3Ref = useRef();
  const contractInstanceRef = useRef();

  useEffect(() => {
    async function initializeWeb3() {
      if (!window.ethereum) {
        console.error('Web3 is not available in this browser.');
        return;
      }
  
      try {
        web3Ref.current = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        contractInstanceRef.current = new web3Ref.current.eth.Contract(contractABI, contractAddress);
        console.log("We have the contract instance!", contractInstanceRef.current);
      } catch (error) {
        console.error('Error initializing Web3:', error);
      }
    }
  
    initializeWeb3();
  }, [contractABI, contractAddress]);

  const handlePurchase = async () => {
    try {
      if (!web3Ref.current || !contractInstanceRef.current) {
        console.error('Web3 or contract instance is not initialized.');
        return;
      }
  
      setIsProcessing(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
  
      for (const item of cartItems) {
        const amountToSend = web3Ref.current.utils.toWei(item.price, 'ether');
  
        // Assuming item.id is the token ID of the NFT to be purchased
        const transaction = await contractInstanceRef.current.methods.purchase(item.id).send({
          from: account,
          value: amountToSend,
          gasPrice: '1000'
        });
  
        console.log('Transaction Hash:', transaction.transactionHash);
      }
  
      setIsProcessing(false);
      setCartItems([]); // Clear cart after successful purchase
      closePaymentModal();
    } catch (error) {
      setIsProcessing(false);
      setErrorMessage('Error processing purchase. Please try again.');
      console.error('Error purchasing NFTs:', error);
    }
  };
  
  
  return (
    <div className={`modal ${showPaymentModal ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>Payment</h2>
        
        {errorMessage && <div className="error">{errorMessage}</div>}
        {isProcessing ? (
          <div className="spinner"></div> // Add a spinner for processing indicator
        ) : (
          <>
            <p>Confirm purchase of {cartItems.length} NFT(s)?</p>
            <button onClick={handlePurchase} className='final-pay'>Confirm</button>
            <button className="close-button" onClick={closePaymentModal}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentModal;
