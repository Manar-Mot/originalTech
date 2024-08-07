"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col 
    items-center gap-2 transition-all duration-75  hover:border-[#6c3abb] cursor-pointer ${
      selected ? "border-[#6c3abb]" : "border-slate-200"
    }`}
    >
      <Icon size={30} className={`${selected && "text-[#6c3abb] "}`} />
      <div
        className={`font-medium ${selected && "text-[#6c3abb] "}`}
      >
        {label}
      </div>
    </div>
  );
};

export default CategoryInput;
