import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <Wrapper>
        <ProductCard />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 75%;
  display: grid;
  position: relative;
  grid-template-columns: repeat(auto-fill, minmax(300px, 30%));
  grid-gap: 2rem;
  padding-top: 2rem;
  margin: auto;
  justify-content: center;
  align-items: center;
`;
export default Home;
