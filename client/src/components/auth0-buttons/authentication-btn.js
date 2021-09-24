import React from "react";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const AuthenticationButton = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <Container>
      <LogoutButton />
      <Img src={user.picture} alt="" />
    </Container>
  ) : (
    <LoginButton />
  );
};

const Container = styled.div`
  position: relative;
`;

const Img = styled.img`
  position: absolute;
  top: 5px;
  right: -75px;
  width: 50px;
  border-radius: 25px;
`;

export default AuthenticationButton;
