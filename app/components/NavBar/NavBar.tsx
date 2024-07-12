import { useState, useEffect } from "react";
import { getCurrentUser } from "@/services/getCurrentUser";
import NavComp from "./NavComp";

const NavBar = async () => {
  const currentUser = await getCurrentUser();
 

  return (
   <>
      <NavComp currentUser={currentUser}/>
   </>
    
  );
};

export default NavBar;
