import React from "react";
import styled from "styled-components";

const Contact = () => {
  return (
    <Wrapper>
      <Container>
        <h1>Contact</h1>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  font-family: sans-serif;
  width: 75%;
  margin: 0 auto;
`;

export default Contact;
