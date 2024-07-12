"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  disabled,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id}
        {...register?.(id, { required })}
        placeholder=""
        disabled={disabled}
        type={type}
        className={`peer w-full p-4 pt-6 outline-none bg-white font-light border rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${
          errors?.[id]
            ? "border-rose-400 focus:border-rose-400"
            : "border-slate-400 focus:border-slate-400"
        }`}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md transition
         duration-75 transform -translate-y-3 top-5 z-10 origin-[0] 
         left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
         peer-focus:scale-75 peer-focus:-translate-y-4
         ${errors?.[id]?"text-rose-500":"text-slate-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
