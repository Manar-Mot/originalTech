"use client";
import Image from "next/image";
import { useState } from "react";
interface ProductImageMagnifyProps {
  src: string;
}
const ProductImageMagnify: React.FC<ProductImageMagnifyProps> = ({ src }) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div className=" relative border  border-slate-400 rounded-md w-full md:w-[400px] h-[400px]  m-auto grid place-items-center">
      <Image
        src={src}
        className="  my-auto  border-red-400 object-cover"
        width={200}
        height={200}
        onMouseEnter={(e) => {
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          console.log(width);
          setSize([width, height]);
          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();
          const x = e.pageX - left - window.scrollX;
          const y = e.pageY - top - window.scrollY;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setShowMagnifier(false);
        }}
        alt={"product-image"}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${100}px`,
          width: `${100}px`,
          top: `${y - 100 / 2}px`,
          left: `${x - 100 / 2}px`,
          opacity: "1",
          border: "1px solid gray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * 1.5}px ${imgHeight * 1.5}px`,
          backgroundPositionX: `${-x * 1.5 + 100 / 2}px`,
          backgroundPositionY: `${-y * 1.5 + 100 / 2}px`,
        }}
      ></div>
    </div>
  );
};

export default ProductImageMagnify;
