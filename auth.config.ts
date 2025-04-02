import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./lib/loginSchema";
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      name: "credentials",
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);
          // const isPasswordMatch = await compare(password)
          if (!user) {
            return null;
          }
          const isPasswordMatch = await compare(password, user.passwordHash);
          if (!isPasswordMatch) {
            return null;
          }
          return user
        }
        return null
      },
    }),
  ],
} satisfies NextAuthConfig;
