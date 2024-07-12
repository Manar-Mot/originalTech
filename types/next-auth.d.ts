import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      cart: Cart|null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    cart: Cart|null;
  }

  interface Token {
    id: string;
    cart: Cart;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    cart: Cart|null;

  }
}
interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: {
    color: string|null;
    colorCode: string|null;
    url: string;
  };
}
