import { add_to_cart, remove_from_cart } from "./CartContext";

const CartReducer = (state, action) => {
  switch (action.type) {
    case add_to_cart: {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }

    case remove_from_cart: {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item, index) => item.name[index] !== action.payload
        ),
      };
    }

    default:
      return state;
  }
};

export default CartReducer;
