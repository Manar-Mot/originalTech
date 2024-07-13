import React from "react";
import CheckOutClient from "../components/checkOut/CheckOutClient";
import Container from "../components/sharedComponent/Container";
import FormWrap from "../components/sharedComponent/FormWrap";

const CheckOut = () => {
  return (
    <Container>
      <FormWrap>
        <CheckOutClient />
      </FormWrap>
    </Container>
  );
};

export default CheckOut;
