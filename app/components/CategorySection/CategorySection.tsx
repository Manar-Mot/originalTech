"use client";
import SearchComponent from "../NavBar/SearchComp";
import Container from "../sharedComponent/Container";
import AllCategory from "./AllCategory";
import List from "../NavBar/NavComp";

const CategoriesSection = () => {
  return (
      <section
        className=" w-full flex flex-wrap bg-[rgb(111,56,223)]  border border-b-purple-300 shadow-md
         justify-between z-0  items-center "
      >
        <AllCategory />
  
      
      </section>
  );
};

export default CategoriesSection;
