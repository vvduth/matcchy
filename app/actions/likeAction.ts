"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAuthUserid } from "./authActions";
export async function toogleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("unauthorized");
    }

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId: targetUserId,
          },
        },
      });
    } else {
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId: targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// fetch the list of user id that current user have like
export async function fetchCurrentUserLikeIds() {
  try {
    const userId = await getAuthUserid();

    const likeIds = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    });

    return likeIds.map(like => like.targetUserId)
  } catch (error) {
    console.log(error);
    throw error;
  }
}
