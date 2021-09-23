import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import Profile from "./Profile";

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Title>
          <Home to="/">New Bees</Home>
        </Title>
        <Nav />
      </Container>
    </Wrapper>
  );
};

const Home = styled(Link)`
  text-decoration: none;
  color: #ffd750;
`;

const Wrapper = styled.header`
  width: 100%;
  heigth: 10vh;
  margin-bottom: 8vh;
  border-bottom: 1px solid #e5e5e5;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: sans-serif;
  width: 75%;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #ffd750;
`;

export default Header;
