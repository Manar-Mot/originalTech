import React from "react";

const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  min-h-fit h-full flex items-center justify-center pt-10 pb-12">
      <div className="mx-auto border border-slate-300 bg-white max-w-[650px] w-full flex flex-col gap-3 shadow-md items-center shadow-slate-300 rounded-md p-4 md:p-8 ">
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
