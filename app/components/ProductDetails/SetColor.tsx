"use client";

import { SetColorProps } from "./types";

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div className="flex items-center gap-4 my-1">
      <span className="text-md font-semibold"> COLOR:</span>
      <div className ="flex gap-1">
        {images.map((img, index) => (
          <div
            key={index}
            className={` h-6 w-6 rounded-full border-cyan-500 ${
              img.color === cartProduct.selectedImage.color
                ? "border-[1.5px]"
                : "border-none"
            } flex items-center justify-center cursor-pointer `}
            onClick={()=>handleColorSelect(img)}
          >
           
           <div className={`w-5 h-5 rounded-full  border-[1.2px] border-slate-300`} style={{background:img.colorCode}}></div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SetColor;
