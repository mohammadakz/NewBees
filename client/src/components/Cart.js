import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Checkout from "./Checkout";

const Cart = () => {
  const { cartItems, removeItemsFromCart, updateCart } =
    useContext(CartContext);
  const { user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(true);

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal);
  };

  //Updating user's cart in DB
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetch("/cartupdate", {
  //       method: "POST",
  //       body: JSON.stringify({ email: user.email, items: cartItems }),
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     // .then((res) => res.json())
  //     // .then((data) => {
  //     //   updateCart(data.data);
  //     //   setLoading(false);
  //     // });
  //   }
  // }, [cartItems]);

  //Fetching user's cart from the DB
  useEffect(() => {
    if (isAuthenticated) {
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
          setLoading(false);
        });
    }
  }, [isAuthenticated]);

  //Storing user's cart in DB
  useEffect(() => {
    if (isAuthenticated) {
      const userData = {
        email: user.email,
        items: cartItems,
      };
      setLoading(true);

      fetch("/cart", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      setLoading(false);
    }
  }, []);

  // since prices in data come with "$" we have to replace it.
  let cartPrice = cartItems.reduce(
    (amt, item) => +item.price.replace("$", "") + amt,
    0
  );

  // adding price sometimes gives more than 2 decialmals - this variable fixes that.
  let updatedCartPrice = Math.ceil(cartPrice * 100) / 100;

  return loading ? (
    "Loading..."
  ) : (
    <>
      <Checkout
        modal={modal}
        setModal={setModal}
        cartPrice={updatedCartPrice}
      />
      <Wrapper>
        <ItemList>
          {cartItems.map((item, index) => {
            return (
              <ItemBox key={item[index]} item={item}>
                <img style={{ maxWidth: "10%" }} src={item.imageSrc} />
                <h4>{item.name}</h4>
                <h4>{item.price}</h4>
                <button onClick={() => removeItemsFromCart(index, cartItems)}>
                  REMOVE ITEM
                </button>
              </ItemBox>
            );
          })}
        </ItemList>
        <TotalWrap>
          <CartTotal>
            <TotalText>
              <div>Total</div>${updatedCartPrice}
            </TotalText>
            <AddButton onClick={openModal}>Proceed to Checkout</AddButton>
          </CartTotal>
        </TotalWrap>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 75%;
  display: flex;
  margin: auto;
`;

const ItemList = styled.ul`
  width: 60%;
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
  display: flex;
  flex-direction: column;
  border: lightgray solid 1px;
  padding: 5%;
`;

const TotalWrap = styled.div`
  display: flex;
  width: 40%;
  height: 40vh;
`;

const TotalText = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5% 0 10% 0;
`;

const AddButton = styled.button`
  margin-top: 5%;
  width: 200px;
  border-style: none;
  font-weight: bold;
  height: 4vh;
  background-color: #ffd750;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  cursor: pointer;
  z-index: 100;
  border-radius: 11px;
  &:hover {
    background-color: orange;
  }
`;
export default Cart;
