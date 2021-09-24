import React from "react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthenticationButton = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <StyledDiv>
      <LogoutButton />
      <Img src={user.picture} alt="" />
    </StyledDiv>
  ) : (
    <LoginButton />
  );
};

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.img`
  display: block;
  top: 22px;
  width: 50px;
  border-radius: 25px;
`;

export default AuthenticationButton;
