import { SliderSettings } from "../ProductsSection/types";

const responsiveSettings = [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 4,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 810,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      centerMode:false,
      slidesToScroll: 1,
    },
  },
];

export const settings: SliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  

  responsive: responsiveSettings,
  appendDots: (dots: JSX.Element[]) => {
    return <ul style={{ display: "none" }}>{dots}</ul>;
  },
};
