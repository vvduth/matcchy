"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getAuthUserid } from "./authActions";
import { pusherServer } from "@/lib/pusher";
import { getMemberById } from "./memberActions";
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

      // create a private channel, send user id
      // cm901illz000id4kowgza9lzo
      const sourceMember = await getMemberById(userId)
      await pusherServer.trigger(`private-like-${targetUserId}`, 'like:new', sourceMember)
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

    return likeIds.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// fetch the list of users  that current user have like
export async function fetchCurrentUserLikes(type = "source") {
  try {
    const userId = await getAuthUserid();

    switch (type) {
      case "source":
        // get who you have liked
        return await fetchSourceLike(userId);
      case "target":
        // get who liked you
        return await fetchTargetLike(userId);
      case "mutual":
        // get who u have liked and liked you back
        return await fetchMutualLike(userId);
      default:
        return [];
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function fetchSourceLike(userId: string) {
  const sourceList = await prisma.like.findMany({
    where: {
      sourceUserId: userId,
    },
    select: { targetMember: true },
  });

  return sourceList.map((x) => x.targetMember);
}

async function fetchTargetLike(userId: string) {
  const targetList = await prisma.like.findMany({
    where: {
      targetUserId: userId,
    },
    select: { sourceMember: true },
  });

  return targetList.map((x) => x.sourceMember);
}

async function fetchMutualLike(userId: string) {
  // get the list of memeber useid the source use has liked
  const likedUsers = await prisma.like.findMany({
    where: { sourceUserId: userId },
    select: { targetUserId: true },
  });

  const likedIds = likedUsers.map((x) => x.targetUserId);

  // fond out those user id are indsdie the target memeber as wll
  const mutualList = await prisma.like.findMany({
    where: {
      AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
    },
    select: { sourceMember: true },
  });

  return mutualList.map((x) => x.sourceMember);
}
