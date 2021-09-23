import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <SubNav>
        <SubNavLink to={"/"}>All Products</SubNavLink>
        <br />
        <SubNavLink to={"/categories"}>View Categories</SubNavLink>
      </SubNav>
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
  grid-template-columns: repeat(auto-fill, minmax(250px, 30%));
  grid-gap: 2rem;
  padding-top: 2rem;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

const SubNav = styled.div`
  display: flex;
  margin: 0 auto 5% auto;
  width: 40%;
  height: 4vh;
  justify-content: space-evenly;
`;

const SubNavLink = styled(Link)``;
export default Home;
