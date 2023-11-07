import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import '../styles/Cart.css';
import { getSize } from '../services/api';

function Cart() {
  const { cart, dispatch } = useCart();
  const [sizes, setSizes] = useState({});

  useEffect(() => {
    const fetchSizes = async () => {
      const sizesData = {};
      for (const item of cart) {
        const sizeLabel = await getSize(item.size);
        sizesData[item.size] = sizeLabel.label;
      }
      setSizes(sizesData);
    };

    fetchSizes();
  }, [cart]);

  const handleRemoveFromCart = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', item });
  };

  return (
    <div className="cart-container">
      <h1>Корзина</h1>
      <div className="cart-list">
        {cart.length === 0 ? (
          <p>Ваша корзина пуста.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.color.images[0]} alt={item.name}/>
              <p>{item.name}</p>
              <p>{sizes[item.size]}</p>
              <p>{item.price}</p>
              <button onClick={() => handleRemoveFromCart(item)}>Удалить</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Cart;
