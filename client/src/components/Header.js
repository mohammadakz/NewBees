import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";
import Profile from "./Profile";

const Header = ({ setU }) => {
  return (
    <Wrapper>
      <Container>
        <Nav />
      </Container>
      <Profile setU={setU} />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  margin-bottom: 3%;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0px;
  background-color: #eaeded;
  z-index: 9999;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-family: sans-serif;
  width: 80%;
  padding: 0 3% 0 3%;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #ffd750;
`;

export default Header;
