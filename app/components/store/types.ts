import { IProductParams } from "@/services/getProducts";
import { Product } from "@prisma/client";
interface SearchParams {
  category?: string | null;
  color?: string | null;
  maxPrice?: string | null;
  minPrice?: string | null;
  sort?: string | null;
}
export interface StoreClientProps {
  products?: Product[];
  searchParams: IProductParams;
  totalPages?: number;
}
export interface FilterSectionProps {
  handlePriceFilter: (event: Event, newValue: number | number[]) => void;
  priceFilter: {min:number,max:number};
  handleQueryString: (newParams: IProductParams) => void;
  searchParams: IProductParams;
}
