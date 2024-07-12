import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/libs/prismadb";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { signInWithCredentials } from "@/services/signIn";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      httpOptions: {
        timeout: 10000,
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          required: true,
        },
        password: {
          label: "password",
          type: "password",
          required: true,
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await signInWithCredentials({
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) {
          console.log("==============Invalid email or password")
          throw new Error("Invalid email or password");
        }

        return {...user,cart:null};
      },
    }),
  ],
  pages: {
    error: "/auth/error",
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ user }) {
      try {
        const cart = await prisma.cart.findUnique({
          where: { userId: user.id },
        });

        if (cart) {
          user.cart = cart;
        } else {
          user.cart = null;
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.cart = user.cart || null;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        cart: token.cart || null,
      };
      return session;
    },

  },
};

export default NextAuth(authOptions);
