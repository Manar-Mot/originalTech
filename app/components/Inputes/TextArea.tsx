"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  id: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}
const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  required,
  disabled,
  register,
  errors,
}) => {
  return (
    <div
      className={`w-full relative pt-6 border rounded-md ${
        errors?.[id] ? "border-rose-400 " : "border-slate-400 "
      }`}
    >
      <textarea
        id={id}
        {...register?.(id, { required })}
        placeholder=""
        disabled={disabled}
        rows={1}
        style={{ resize: "none" }}
        className={`peer w-full px-4 outline-none
  bg-white font-light ransition
  disabled:opacity-70 max-h-[150px]  disabled:cursor-not-allowed  `}
        onInput={(e) => {
          e.currentTarget.rows = 1;
          e.currentTarget.rows = Math.ceil(e.currentTarget.scrollHeight / 20);
        }}
      />
      <label
        htmlFor={id}
        className={`absolute cursor-text text-md transition
         duration-75 transform -translate-y-3 top-5 z-10 origin-[0] 
         left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
         peer-focus:scale-75 peer-focus:-translate-y-4
         ${errors?.[id] ? "text-rose-500" : "text-slate-400"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
