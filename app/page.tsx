import Banner from "./components/Banner/Banner";
import UniqueProducts from "./components/ProductsSection/UniqueProducts";
import ServicesSection from "./components/Services/Services";
import View from "./components/View/View";
import Brands from "./components/Brands/Brands";
import UpComming from "./components/UpCommingSection/UpComming";
import CategoriesSection from "./components/CategorySection/CategorySection";
import  { IProductParams } from "@/services/getProducts";
import getTopRatedProducts from "@/services/getUniqueProducts";
import getNewProducts from "@/services/getNewProducts";
interface HomeProps {
  searchParams: IProductParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const { products:topRatedProducts } = await getTopRatedProducts();
  const { products:newProducts } = await getNewProducts();
  return (
    <>
      <CategoriesSection />
      <Banner />
      <ServicesSection />
      <UniqueProducts products={topRatedProducts} title="Featured Products" />
      <UpComming />
      <UniqueProducts products={newProducts} title="New Products" />
      <View />
      <Brands />
    </>
  );
}
