import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import CartProvider from "./providers/CartProvider";
import { plus_Jakarta_Sans } from "./Fonts/Fonts";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "./hooks/useLoading";
import Container from "./components/sharedComponent/Container";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "OriginalTech",
  description: "ECommerceApp",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plus_Jakarta_Sans.className} text-slate-700 relative `}
      >
        <AppRouterCacheProvider>
          <Toaster
            toastOptions={{
              style: { background: `rgb(51 65 85)`, color: "#fff" },
            }}
          />
          <LoadingProvider>
            <CartProvider>
              <Container>
                <div className="w-full flex flex-col justify-between min-h-screen">
                  <NavBar />
                  <main className="bg-[#f8fafa] flex-1 ">
                    {" "}
                    <Suspense> {children}</Suspense>
                  </main>
                  <Footer />
                </div>
              </Container>
            </CartProvider>
          </LoadingProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
