import { createContext } from "react";

//declaring types of cart functionality/states
export const add_to_cart = "add_to_cart";
export const remove_from_cart = "remove_item";

// Creating context hook for managing cart state across the website.

const CartContext = createContext(null);

export default CartContext;
