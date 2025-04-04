"use server";

import { memberEditSchema, MemberEditSchema } from "@/lib/memberEditSchema";
import { ActionResult } from "@/types";
import { Member, Photo } from "@prisma/client";
import { getAuthUserid } from "./authActions";
import { prisma } from "@/lib/prisma";

export async function updateMemberProfile(
  data: MemberEditSchema,
  nameUpdated: boolean
): Promise<ActionResult<Member>> {
  try {
    const userId = await getAuthUserid();

    const validated = memberEditSchema.safeParse(data);
    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, description, city, country } = validated.data;

    if (nameUpdated) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
        },
      });
    }

    const member = await prisma.member.update({
      where: {
        userId: userId,
      },
      data: {
        name,
        description,
        city,
        country,
      },
    });
    return { status: "success", data: member };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function addImage(url: string, pulicId: string) {
  try {
    const userId = await getAuthUserid();

    return await prisma.member.update({
      where: {
        userId: userId,
      },
      data: {
        photos: {
          create: [
            {
              url,
              publicId: pulicId,
            },
          ],
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function setMainImage(photo: Photo) {
  try {
    const userId = await getAuthUserid();
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: photo.url,
      },
    });

    return prisma.member.update({
      where: {
        userId: userId,
      },
      data: {
        image: photo.url,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfoForNav() {
  try {
    const userId = await getAuthUserid();
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        image: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
