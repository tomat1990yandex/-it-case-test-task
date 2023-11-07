import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { useCart } from './CartContext';

function NavBar() {
  const { cart } = useCart();

  return (
    <nav className="container">
      <Link to="/">Список товаров</Link>
      <Link to="/cart">{`Корзина (${cart.length} товаров)`}</Link>
    </nav>);
}

export default NavBar;