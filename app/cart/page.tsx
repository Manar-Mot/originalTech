import React from "react";
import CartClient from "./CartClient";
import { getCurrentUser } from "@/services/getCurrentUser";
const Cart = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div>
      <CartClient currentUser={currentUser} />
    </div>
  );
};

export default Cart;
