import React from "react";
import FormWrap from "../../components/sharedComponent/FormWrap";
import Container from "../../components/sharedComponent/Container";
import LoginForm from "./LoginForm";
import { getCurrentUser } from "@/services/getCurrentUser";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Login;
