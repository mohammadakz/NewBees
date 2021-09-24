import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Checkout from "./Checkout";

const Cart = () => {
  const { cartItems, removeItemsFromCart, updateCart } = useContext(
    CartContext
  );
  const { user, isAuthenticated } = useAuth0();

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal);
  };

  // helper function counting items
  function mostFrequentElement(arr) {
    const itemCount = {};
    for (let x of arr) {
      if (Object.keys(itemCount).includes(`${x._id}`)) {
        itemCount[x._id] += 1;
      } else {
        itemCount[x._id] = 1;
      }
    }

    let res = [];
    for (let x of arr) {
      let count = 0;
      for (let i of arr) {
        if (i._id === x._id) {
          count++;
          res.push({ id: i._id });
        }
      }
    }

    return itemCount;
  }
  const uniqueItems = mostFrequentElement(cartItems);

  //Copying the state
  const newS = [...cartItems];
  // getting unique items
  const uniq = new Set(newS.map((e) => JSON.stringify(e)));
  // unique items in state
  const newState = Array.from(uniq).map((e) => JSON.parse(e));

  //Storing user's cart in DB
  useEffect(() => {
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

  // since prices in data come with "$" we have to replace it.
  let cartPrice = cartItems.reduce(
    (amt, item) => +item.price.replace("$", "") + amt,
    0
  );

  // adding price sometimes gives more than 2 decialmals - this variable fixes that.
  let updatedCartPrice = Math.ceil(cartPrice * 100) / 100;

  return;
  <>
    <Checkout modal={modal} setModal={setModal} cartPrice={updatedCartPrice} />
    <Wrapper>
      <ItemList>
        {newState.map((item, index) => {
          return (
            <ItemBox key={item[index]} item={item}>
              <img style={{ maxWidth: "10%" }} src={item.imageSrc} />
              <h4>{item.name}</h4>
              <h4>{item.price}</h4>
              <span>
                {Object.keys(uniqueItems).map((key) => {
                  let count;
                  if (key === `${item._id}`) {
                    count = uniqueItems[item._id];
                  }
                  return count;
                })}
              </span>
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
  </>;
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
  span {
    padding-right: 2rem;
  }
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
