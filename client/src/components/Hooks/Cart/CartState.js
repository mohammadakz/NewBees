import React, { useReducer, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import CartContext, {
  add_to_cart,
  remove_from_cart,
  updateCartDb,
} from "./CartContext";
import CartReducer from "./CartReducer";

const CartState = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();

  const initialState = {
    cartItems: [],
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addItemsToCart = (item) => {
    dispatch({ type: add_to_cart, payload: item });
  };

  const removeItemsFromCart = (id, items) => {
    console.log("testing", items);
    dispatch({ type: remove_from_cart, payload: id });
    // This fetch updates the items in the cart accordingly
    if (isAuthenticated) {
      fetch("/cartupdate", {
        method: "PUT",
        body: JSON.stringify({
          email: user.email,
          items: items.filter((item) => items.indexOf(item) !== id),
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  };

  const updateCart = (data) => {
    dispatch({ type: updateCartDb, payload: data });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addItemsToCart,
        removeItemsFromCart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartState;
