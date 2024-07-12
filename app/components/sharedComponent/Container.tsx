import React from "react";
export interface ContainerProps {
  children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className="
    max-w-[1400px] mx-auto "
    >
      {children}
    </div>
  );
};

export default Container;
