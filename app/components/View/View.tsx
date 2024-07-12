import { productView1, productView2 } from "../../../public/assets";
import ViewCard from "./ViewCard";

const View = () => {
  return (
    <div className="bg-[#f8f8f8] w-full py-10">
    <div className="py-10 flex justify-between flex-wrap gap-10 w-[90%] mx-auto ">
      <ViewCard src={productView1} title="Lenovo Tablet" discount={20} />
      <ViewCard src={productView2} title=" Gaming Console" discount={40} />
    </div>
    </div>
  );
};
export default View;
