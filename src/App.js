import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<ProductList/>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
