"use server";

import { prisma } from "@/lib/prisma";
import { registerSchema, RegisterSchema } from "@/lib/registerSchema";
import bcryptjs from "bcryptjs";
export async function registerUser(data: RegisterSchema) {
  const validated = registerSchema.safeParse(data);
  if (!validated.success) {
    //throw new Error(validated.error.errors[0].message);
    return { error: validated.error.errors };
  }

  const { name, email, password } = validated.data;

  const hashedPassword = await bcryptjs.hash(password, 7);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return {
      error: "User already exist",
    };
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });
  return newUser;
}
