import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authSchema } from "~/schemas/auth";
import { prisma } from "./prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (props) => {
        const validated = await authSchema.safeParseAsync(props);

        if (!validated.success) {
          return null;
        }

        const { username, password } = validated.data;

        const user = await prisma.user.findFirst({
          where: {
            username,
          },
        });

        if (!user) {
          return null;
        }

        const isValid = await compare(password, user.password);

        if (!isValid) {
          return null;
        }

        console.log("user", user);

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, ...props }) => {
      return token;
    },
    session: async ({ session, ...props }) => {
      return session;
    },
  },
});
