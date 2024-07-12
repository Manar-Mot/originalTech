export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: any;
    image: string;
    hashedPassword: any;
    createdAt: string;
    updatedAt: string;
    role: string;
  };
}
export interface ProductCardProps {
  productItem: any;
}
export interface ProductImage {
  color: string;
  colorCode: string;
  url: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  inStock: boolean;
  images: ProductImage[];
  reviews?: any;
}
export interface SliderSettings {
  dots: boolean;
  infinite: boolean;
  speed: number;
  centerMode?: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  responsive?: ResponsiveSetting[];
  appendDots?: (dots: JSX.Element[]) => JSX.Element;
  autoplay?: boolean;
  autoplaySpeed?: number;
  cssEase?: string;
  rtl?: boolean;
  initialSlide?: number;
}

export interface ResponsiveSetting {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
}
export interface ProductsSectionProps {
  products: Product[];
  title: string;
}
