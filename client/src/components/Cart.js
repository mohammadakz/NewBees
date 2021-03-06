import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Checkout from "./Checkout";
import removeIcon from "../assets/remove-icon.svg";

const Cart = () => {
  const { cartItems, removeItemsFromCart } = useContext(CartContext);

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

    return itemCount;
  }
  const uniqueItems = mostFrequentElement(cartItems); //object

  //immutable update
  const copyState = [...cartItems];
  copyState.forEach((item, index) => {
    Object.keys(uniqueItems).forEach((key) => {
      if (Number(key) === item._id) {
        copyState[index] = { ...copyState[index], counter: uniqueItems[key] };
      }
    });
  });

  //Copying the state
  const newS = [...copyState];
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

  return (
    <>
      <Checkout
        modal={modal}
        setModal={setModal}
        cartPrice={updatedCartPrice}
      />
      <Heading style={{ fontSize: "2em", display: "block" }}>Cart</Heading>
      <Wrapper>
        <ItemList>
          {newState.map((item, index) => {
            return (
              <ItemBox key={index} item={item}>
                <ProductImg style={{ maxWidth: "10%" }} src={item.imageSrc} />
                <h4>{item.name}</h4>
                <h4>{item.price}</h4>
                <span>{item.counter}</span>
                <Button
                  onClick={() =>
                    removeItemsFromCart(cartItems, index, item.counter)
                  }
                >
                  Delete Item
                  <RemoveIcon src={removeIcon} />
                </Button>
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

const Heading = styled.h2`
  width: 75%;
  display: flex;
  margin: auto;
  text-align: left;
  margin-bottom: 5vh;
`;

const RemoveIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Button = styled.button`
  display: flex;
  border: none;
  border: 1px solid lightgray;
  float: right;
  margin-right: 5%;
  padding: 1%;
  justify-content: space-between;
  width: 150px;
  &:hover {
    cursor: pointer;
    background: lightcoral;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  margin: auto;
`;

const ProductImg = styled.img`
  border-radius: 20px;
`;

const ItemList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
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
  min-width: 200px;
  min-height: 50px;
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
