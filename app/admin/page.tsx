import React, { Suspense } from "react";
import Summary from "../components/Admin/summary/Summary";


const Admin = async () => {
  // const data = await getSummary();
  const data={}
  return (
    <>
 
        <Summary data={data} />
    </>
  );
};

export default Admin;
