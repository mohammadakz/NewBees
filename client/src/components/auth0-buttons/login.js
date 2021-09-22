import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <StyledButton
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  background: none;
  font-size: 1.2rem;
  padding: 12px 20px;
  background-color: #ffd750;
  border: 2px solid #ffd750;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: #2f3437;
    border: 2px solid #2f3437;
    transition: 0.3s ease-in-out all;
  }
`;

export default LoginButton;
