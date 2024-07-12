import React from "react";
interface ServiceCardProps {
  title: string;
  description: string;
  Icon: React.ReactNode;
}
const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  Icon,
}) => {
  return (
    <div
      className="  bg-white cursor-pointer flex  group items-center px-0 pb-4 pt-8 h-[260px]
flex-col  transition-all duration-75 ease-linear shadow-lg border border-slate-300  "
    >
     
      <span className={`border  px-6  py-4 rounded-lg  `}>{Icon}</span>
      <div className="mx-4">
        <h3 className="font-bold text-center mt-4 my-2 max-w-[400px]">
          {title}
        </h3>
        <div className="h-auto text-sm text-center">{description}</div>
      </div>
    </div>
  );
};

export default ServiceCard;
