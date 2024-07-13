import React from "react";
import Container from "../../components/sharedComponent/Container";
import FormWrap from "../../components/sharedComponent/FormWrap";
import RegisterForm from "../../components/auth/RegisterForm";
import { getCurrentUser } from "@/services/getCurrentUser";

const Register = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Register;
