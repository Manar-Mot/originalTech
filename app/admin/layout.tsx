import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AdminNav from "../components/Admin/AdminNav";
import TempDrawer from './tempDrower';
import Container from "../components/sharedComponent/Container";

export const metadata = {
  title: "OriginalTech Admin ",
  descrption: "OriginalTech Admin Dashboard",
};
const AdminLayout = async({ children }: { children: React.ReactNode }) => {
  
  return (
    <AppRouterCacheProvider>
      <Container>
        <TempDrawer >
        {children}
        </TempDrawer>
  
      </Container>
    </AppRouterCacheProvider>
  );
};

export default AdminLayout;
