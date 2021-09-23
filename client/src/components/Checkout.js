import React, { useContext, useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";

const Checkout = ({ modal, setModal }) => {
  const checkoutRef = useRef();
  const closeModal = (e) => {
    if (checkoutRef.current === e.target) {
      setModal(false);
    }
  };

  //animating the modal
  const animation = useSpring({
    config: {
      duration: 200,
    },
    opacity: modal ? 1 : 0,
    transform: modal ? `translateY(0%)` : `translateY(100%)`,
  });

  const { cartItems, removeItemsFromCart, updateCart } =
    useContext(CartContext);

  const cartPrice = cartItems.reduce(
    (amt, item) => +item.price.replace("$", "") + amt,
    0
  );

  let updatedCartPrice = Math.ceil(cartPrice * 100) / 100;

  return (
    <>
      {modal ? (
        <Container ref={checkoutRef} onClick={closeModal}>
          <animated.div style={animation}>
            <Wrapper modal={modal}>
              <Form>
                <Input type="text" placeholder="Full Name"></Input>
                <Input type="text" placeholder="Billing Address"></Input>
                <Input type="number" placeholder="Credit Card Number"></Input>
                <div>Total</div>
                <div>${updatedCartPrice}</div>
                <AddButton>Checkout</AddButton>
              </Form>
            </Wrapper>
          </animated.div>
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: grid;
  position: absolute;
  grid-template-columns: 1fr;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 999;
`;

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 50%;
  margin: auto;
`;

const Form = styled.div`
  background-color: #fafafa;
  padding: 5%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Input = styled.input`
  display: block;
  font-size: 18px;
  width: 230px;
  padding: 10px;
  margin: 4% auto 4% auto;
  background: #ffffe0;
  border: none;
  border-radius: 3px;

  ::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const AddButton = styled.button`
  margin-top: 5%;
  width: 250px;
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

export default Checkout;
