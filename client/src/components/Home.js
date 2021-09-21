import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";

const Home = () => {
  const { addItemsToCart, cartItems } = useContext(CartContext);

  return (
    <>
      <TempHeader>
        {cartItems.length > 0 && <h3>{cartItems.length}</h3>}
      </TempHeader>
      <Wrapper>
        <ProductCard />
      </Wrapper>
    </>
  );
};

const TempHeader = styled.div`
  height: 8vh;
  border-bottom: 1px solid orange;
  margin: auto;
  width: 50%;
  font-size: 2em;
`;

const Wrapper = styled.div`
  width: 75%;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.25rem;
  margin: auto;
  border: 1px solid green;
`;
export default Home;
