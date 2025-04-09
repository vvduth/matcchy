"use server";

import { messageSchema, MessageSchema } from "@/lib/messageSchema";
import { ActionResult, MessageDto } from "@/types";
import { Message } from "@prisma/client";
import { getAuthUserid } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mapping";
import { pusherServer } from "@/lib/pusher";
import { createChatId } from "@/lib/util";

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserid();

    const validated = await messageSchema.safeParse(data);

    if (!validated.success) {
      return {
        status: "error",
        error: validated.error.errors,
      };
    }

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        senderId: userId,
        recipientId: recipientUserId,
      },
      select: messageSelect
    });
    const messageDto = mapMessageToMessageDto(message)

    // push to pusher
    await pusherServer.trigger(createChatId(userId, recipientUserId), 'message:new', messageDto)
    await pusherServer.trigger(`private-${recipientUserId}`, 'message:new', messageDto)
    return {
      status: "success",
      data: messageDto,
    };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "Something went wrong creating message",
    };
  }
}

export async function getMessages(recipientId: string) {
  try {
    const userId = await getAuthUserid();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId: recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      select: messageSelect,
    });

    if (messages.length > 0) {

      const readMessageIds = messages.filter(m => m.dateread === null &&
        m.recipient?.userId === userId && 
        m.sender?.userId === recipientId
      ).map(m => m.id)

      await prisma.message.updateMany({
        where: {
         id: {in: readMessageIds}
        },
        data: {
          dateread: new Date(),
        },
      });

      await pusherServer.trigger(createChatId(recipientId, userId), 'messages:read', readMessageIds)
    }

    const mappedMessages = messages.map((message) =>
      mapMessageToMessageDto(message)
    );

    return mappedMessages;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMessageByContainer(container: string) {
  try {
    const userId = await getAuthUserid();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : {
            recipientDeleted: false,
          }),
    };

    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        createdAt: "desc",
      },
      select: messageSelect,
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteMessage(messageId: string, isOutBox: boolean) {
  const selector = isOutBox ? "senderDeleted" : "recipientDeleted";

  try {
    const userId = await getAuthUserid();

    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        [selector]: true,
      },
    });

    const messageToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    });

    if (messageToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messageToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUnreadMesagesCount() {
  try {
    const userId = await getAuthUserid()
    const count =  await prisma.message.count({
      where: {
        recipientId: userId,
        dateread: null,
        recipientDeleted: false 
      }
    })
    
    return count
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const messageSelect = {
  id: true,
  text: true,
  createdAt: true,
  senderId: true,
  dateread: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
