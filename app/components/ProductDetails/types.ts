import { Product, ProductImage } from "../ProductsSection/types";
export interface ProductDetailsProps {
  product: Product;
}
export interface CartProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  selectedImage: ProductImage;
  quantity: number;
}
export interface SetColorProps {
  images: ProductImage[];
  cartProduct: CartProduct;
  handleColorSelect: (value: ProductImage) => void;
}
export interface SetQuantityProps {
  isCartCounter: boolean;
  cartProduct: CartProduct;
  handleQtyInc: () => void;
  handleQtyDec: () => void;
}
export interface ProductGalleryProps {
  cartProduct: CartProduct;
  product: any;
  handleColorSelect: (value: ProductImage) => void;
}
