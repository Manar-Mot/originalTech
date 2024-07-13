import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import AdminNav from "../components/Admin/AdminNav";
// import TempDrawer from "./tempDrower";
import Container from "../components/sharedComponent/Container";
import { Suspense } from "react";

export const metadata = {
  title: "OriginalTech Admin ",
  descrption: "OriginalTech Admin Dashboard",
};
const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <Container>
        {/* <TempDrawer> */}
          <Suspense>{children}</Suspense>
        {/* </TempDrawer> */}
      </Container>
    </AppRouterCacheProvider>
  );
};

export default AdminLayout;
