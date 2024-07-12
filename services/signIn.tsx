import bcrypt from "bcryptjs";
import prisma from "@/libs/prismadb";

interface SignInWithCredentialsParams {
    email: string;
    password: string;
  }
export async function signInWithCredentials({
    email,
    password,
  }: SignInWithCredentialsParams) {
 
    const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
    if (!user || !user.hashedPassword) {
      throw new Error("Invalid email or password!");
    }
  
    const passwordIsValid = await bcrypt.compare(password, user.hashedPassword);
  
    if (!passwordIsValid) {
      throw new Error("Invalid email or password");
    }
  
  
  console.log("================================user")
  console.log(user)
    return user;
  }