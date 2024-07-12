import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>;
}
const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className="w-full flex items-center flex-row gap-2">
      <input
        type="checkbox"
        autoComplete="off"
        id={id}
        {...register?.(id)}
        placeholder=""
        disabled={disabled}
        className="cursor-pointer"
      />
      <label
        htmlFor={id}
        className={`font-medium cursor-pointer
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
