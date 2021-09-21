import React, { useReducer, useState } from "react";
import CartContext, { add_to_cart, remove_from_cart } from "./CartContext";
import CartReducer from "./CartReducer";

const CartState = ({ children }) => {
  const initialState = {
    cartItems: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addItemsToCart = (item) => {
    dispatch({ type: add_to_cart, payload: item });
  };

  const removeItemsFromCart = (id) => {
    dispatch({ type: remove_from_cart, payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addItemsToCart,
        removeItemsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
