import { getCurrentUser } from "@/services/getCurrentUser";
import Container from "@/app/components/sharedComponent/Container";
import FormWrap from "@/app/components/sharedComponent/FormWrap";
import AddProductForm from "../../components/Admin/AddProductForm";
import NullData from "@/app/components/sharedComponent/NullData";
const AddProducts = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access denied"/>
  }
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
