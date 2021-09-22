import React, { useContext } from "react";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = () => {
  const { cartItems, removeItemsFromCart, updateCart } = useContext(
    CartContext
  );
  const { user, isAuthenticated } = useAuth0();

  React.useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      console.log("hello");
      fetch("/getcart", {
        method: "POST",
        body: JSON.stringify({ email: user.email }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          updateCart(data.data);
        });
    }
  }, [isAuthenticated]);

  ///
  ///
  React.useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        email: user.email,
        items: cartItems,
      };
      fetch("/cart", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    }
  }, []);

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
