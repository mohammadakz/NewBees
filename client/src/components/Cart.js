import React, { useContext } from "react";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";

const Cart = () => {
  const { cartItems, removeItemsFromCart } = useContext(CartContext);

  return (
    <Wrapper>
      <ItemList>
        {cartItems.map((item, index) => {
          return (
            <ItemBox key={item[index]} item={item}>
              <img style={{ maxWidth: "10%" }} src={item.imageSrc} />
              <h4>{item.name}</h4>
              <h4>{item.price}</h4>
              <button onClick={() => removeItemsFromCart(item.name[index])}>
                REMOVE ITEM
              </button>
            </ItemBox>
          );
        })}
      </ItemList>
      <CartTotal>
        <div>Total</div>$
        {cartItems.reduce((amt, item) => +item.price.replace("$", "") + amt, 0)}
      </CartTotal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 75%;
  display: flex;
  margin: auto;
`;

const ItemList = styled.ul`
  width: 60%;
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 0.25rem;
  margin: auto;
  list-style: none;
`;

const ItemBox = styled.li`
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const CartTotal = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
`;

export default Cart;
