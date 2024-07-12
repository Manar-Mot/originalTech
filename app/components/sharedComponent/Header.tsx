import React from "react";
interface HeaderProps {
  title: string;
  customStyles?: string;
}
const Heading: React.FC<HeaderProps> = ({ title, customStyles }) => {
  return (
    <h2
      className={`text-2xl font-semibold text-[#211436] mb-8 ${customStyles}`}
    >
      {title}
    </h2>
  );
};

export default Heading;
