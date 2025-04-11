"use server";

import { auth, signIn, signOut } from "@/auth";
import { LoginSchema } from "@/lib/loginSchema";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/prisma";
import {
  combineRegisterSchema,
  registerSchema,
  RegisterSchema,
} from "@/lib/registerSchema";
import { generateToken, getExistingTokenByToken } from "@/lib/token";
import { ActionResult } from "@/types";
import { TokenType, User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email);
    if (!existingUser || !existingUser.email) {
      return {
        status: "error",
        error: "Invalid credentials",
      };
    }

    //   if (!existingUser.emailVerified) {
    //     const token = await generateToken(existingUser.email, TokenType.VERIFICATION);

    //     await sendVerificationEmail(token.email, token.token);

    //     return { status: 'error', error: 'Please verify your email address before logging in' }
    // }

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return {
      status: "success",
      data: "Successfully log in",
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return {
        status: "error",
        error: "Something went wrong",
      };
    }
  }
}

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validated = combineRegisterSchema.safeParse(data);

    if (!validated.success) {
      return {
        status: "error",
        error: validated.error.errors[0].message,
      };
    }

    const {
      name,
      email,
      password,
      gender,
      description,
      dateOfBirth,
      city,
      country,
    } = validated.data;

    const hashedPassword = await bcryptjs.hash(password, 7);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return {
        status: "error",
        error: "User already exist",
      };
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        profileComplete: true,
        member: {
          create: {
            name,
            description,
            city,
            country,
            dateOfBirth: new Date(dateOfBirth),
            gender,
          },
        },
      },
    });

    // const verificationToken = await generateToken(email, TokenType.VERIFICATION);

    //     await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      status: "success",
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "Something went wrong",
    };
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function getAuthUserid() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("unauthorized");
  }
  return userId;
}



export async function verifyEmail(token: string ): Promise<ActionResult<string>> {
  try {
    const existingToken = await getExistingTokenByToken(token)
    if (!existingToken) {
      return {
        status:'error',
        error: 'Invalid token'
      }
    }

    const hasExpired = new Date() > existingToken.expires

    if (hasExpired) {
      return {status: 'error', error: 'Token has expried'}
    }
    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) {
        return { status: 'error', error: 'User not found' }
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: { emailVerified: new Date() }
    })

    await prisma.token.delete({ where: { id: existingToken.id } });

    return { status: 'success', data: 'Success' }

  } catch (error) {
    console.log(error);
    throw error;
  }
}