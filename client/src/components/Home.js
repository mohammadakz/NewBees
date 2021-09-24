import React, { useContext, useState } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Hero from "../assets/Hero_Pics/hero.png";
import SubNav from "./SubNav";

const Home = () => {
  return (
    <>
      <HeroWrap>
        <HeroText>
          Keep track of your health <br />
          chez New Bees.
          <br />
          <FeatureLink to={"/products/6554"}>View Feature Product</FeatureLink>
        </HeroText>
        <HeroPic src={Hero} />
      </HeroWrap>
      <br />
      <SubNav />
      <br />
      <Wrapper>
        <ProductCard />
      </Wrapper>
    </>
  );
};

const HeroWrap = styled.div`
  display: flex;
  padding: 3%;
  border-radius: 20px;
  background-color: #ffe99e;
  width: 77%;
  margin: auto;
  overflow: hidden;
`;
const HeroText = styled.h2`
  padding: 5%;
  font-size: 2em;
`;

const FeatureLink = styled(Link)`
  font-size: 0.5em;
  text-decoration: none;
  color: gray;
  &:hover {
    text-decoration: underline;
  }
`;

const HeroPic = styled.img`
  display: flex;
  width: 22%;

  margin-left: auto;
  margin-right: 15%;
`;

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
