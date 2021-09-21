import React, { useContext } from "react";
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
  grid-gap: 2rem;
  margin: auto;
`;
export default Home;
