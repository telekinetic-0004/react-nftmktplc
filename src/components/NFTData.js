import React, { useState, useEffect, useMemo } from 'react';
import './NFTData.css';

const NFTData = ({ onBuyClick, cartItems = [], openCart }) => {
  const [isInCart, setIsInCart] = useState([]);

  // Define NFT data with randomized prices
  const nftData = useMemo(() => [
    {
      id: 1,
      picture: 'https://i.pinimg.com/564x/ea/7d/52/ea7d5281da8fac29baeca7a863e7d5d7.jpg',
      price: generateRandomPrice(),
    },
    {
      id: 2,
      picture: 'https://i.pinimg.com/564x/e3/2f/51/e32f516e1164e0c445ccd0bfb5f24337.jpg',
      price: generateRandomPrice(),
    },
    {
      id: 3,
      picture: 'https://i.pinimg.com/564x/e5/9d/fe/e59dfed15d6a7d1f7603dfbb104573cd.jpg',
      price: generateRandomPrice(),
    },
    {
      id: 4,
      picture: 'https://i.pinimg.com/564x/24/c8/9b/24c89bda027cbf2b9277f0db67be8d9d.jpg',
      price: generateRandomPrice(),
    },
    {
      id: 5,
      picture: 'https://i.pinimg.com/originals/dc/cf/6c/dccf6c06349ba8bf00c6639b1416924e.jpg',
      price: generateRandomPrice(),
    },
    {
      id: 6,
      picture: 'https://i.pinimg.com/564x/21/62/5d/21625d50f8151fb8f69aa67325f0466f.jpg',
      price: generateRandomPrice(),
    }
  ], []);

  useEffect(() => {
    setIsInCart(cartItems.map(item => item.id));
  }, [cartItems]);

  const handleBuyClick = (item) => {
    if (!isInCart.includes(item.id)) {
      onBuyClick(item);
      setIsInCart(prev => [...prev, item.id]);
    }
  };

  const handleGoToCartClick = () => {
    openCart();
  };

  return (
    <table className="nft-table">
      <tbody>
        {nftData.map((nft, index) => (
          index % 3 === 0 && (
            <tr key={index} className="nft-row">
              {nftData.slice(index, index + 3).map((item) => {
                const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
                return (
                  <td key={item.id} className="nft-cell">
                    <img 
                      src={item.picture} 
                      alt="NFT" 
                      className="nft-image"
                    />
                    <br />
                    <button className="buy-button" onClick={isInCart ? handleGoToCartClick : () => handleBuyClick(item)}>
                      {isInCart ? 'Go to Cart' : `Add to Cart - Buy for ${item.price} ETH`}
                    </button>
                  </td>
                );
              })}
            </tr>
          )
        ))}
      </tbody>
    </table>
  );
};

// Function to generate a random price less than 0.00001 ETH
const generateRandomPrice = () => {
  return (Math.random() * 0.000001).toFixed(8);
};

export default NFTData;
