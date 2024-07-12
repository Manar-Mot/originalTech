import { Order, User } from "@prisma/client";

export type safeUser = Omit<
  User,
  "emailVerified" | "createdAt" | "updatedAt"
> & {
  createdAt: string | null;
  updatedAt: string | null;
  emailVerified: string | null;
  orders:Order[]|null
};
export interface CurrentUserProps {
  currentUser: safeUser | null;
}
