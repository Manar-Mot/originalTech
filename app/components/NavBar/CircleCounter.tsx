import React from "react";

interface CircleCounterProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  navigate: () => void;
}

const CircleCounter: React.FC<CircleCounterProps> = ({
  title,
  icon,
  count,
  navigate,
}: CircleCounterProps) => {
  return (
    <div className="relative mx-1" title={title} onClick={() => navigate()}>
      <span className="absolute flex items-center justify-center min-w-[18px] h-[18px] p-1 bg-accent-10 -top-[10px] -right-[9px] text-[#fff] text-[10px] font-semibold rounded-full">
        {count}
        
       
      </span>
      {icon}
    </div>
  );
};

export default CircleCounter;
