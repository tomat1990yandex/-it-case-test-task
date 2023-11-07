import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.item];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item !== action.item);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (<CartContext.Provider value={{ cart, dispatch }}>
    {children}
  </CartContext.Provider>);
};
