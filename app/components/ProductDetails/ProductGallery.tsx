"use client";
import Image from "next/image";
import { ProductImage } from "../ProductsSection/types";
import { banner1 } from "../../../public/assets/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { settings } from "../sharedComponent/sliderSettings";
import { ProductGalleryProps } from "./types";
import ProductImageMagnify from "./ProductImageMagnify";
const ProductGallery: React.FC<ProductGalleryProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className="flex flex-col justify-between items-center  h-full ">
      <ProductImageMagnify src={cartProduct.selectedImage.url} />
      {product.images && (
        <div className=" max-w-[400px] min-w-[300px]  mt-4  px-8  ">
          <Slider
            dots={false}
            infinite={false}
            speed={500}
            slidesToShow={4}
            slidesToScroll={1}
            centerMode={false}
            responsive={[
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 810,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
            ]}
          >
            {product.images.map((img: ProductImage, index: number) => (
              <div
                key={index}
                className={`  object-contain mx-2  rounded-lg cursor-pointer`}
              >
                <Image
                  src={img.url}
                  alt="product"
                  width={60}
                  height={60}
                  className={` w-[70px] h-[70px] rounded-md  border  ${
                    cartProduct.selectedImage.color === img.color
                      ? "border-2 border-purple-500"
                      : " border-slate-400"
                  }`}
                  onClick={() => handleColorSelect(img)}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}                        
    </div>
  );
};

export default ProductGallery;
