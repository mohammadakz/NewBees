import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import CartContext from "./Hooks/Cart/CartContext";
import Category from "./CategoryCards";
import { CategoryContext } from "./CategoryContext";
import CategoryDisplay from "./CategoryDisplay";
import CategoryCards from "./CategoryCards";

const Home = () => {
  const { addItemsToCart, cartItems } = useContext(CartContext);
  const { categorySelected, setCategorySelected, isSelected, setIsSelected } = React.useContext(CategoryContext);

  return (
    <>
      <Wrapper>
          <CategoryCards />
        {/*         <ProductCard />
 */}      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 75%;
  display: grid;
  position: relative;
  grid-template-columns: repeat(auto-fill, minmax(250px, 30%));
  grid-gap: 2rem;
  padding-top: 2rem;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
export default Home;
