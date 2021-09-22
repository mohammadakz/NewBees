import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <p>Copyright &copy; New Bees 2021</p>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Container = styled.div`
  witdth: 75%;
  margin: 25px auto;
  font-family: sans-serif;

  p {
    text-align: center;
  }
`;

export default Footer;
