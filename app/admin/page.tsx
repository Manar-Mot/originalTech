import React from "react";
import Summary from "./summary/Summary";
import { getSummary } from "@/services/getSummary";

const Admin = async() => {
  const data = await getSummary();
  return (
    <>
      <Summary data={data}  />
    </>
  );
};

export default Admin;
