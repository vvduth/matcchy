"use server";

import { messageSchema, MessageSchema } from "@/lib/messageSchema";
import { ActionResult } from "@/types";
import { Message } from "@prisma/client";
import { getAuthUserid } from "./authActions";
import { prisma } from "@/lib/prisma";
import { mapMessageToMessageDto } from "@/lib/mapping";

export async function createMessage(
  recipientUserId: string,
  data: MessageSchema
): Promise<ActionResult<Message>> {
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
    });

    return {
      status: "success",
      data: message,
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
          },
          {
            senderId: recipientId,
            recipientId: userId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
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
      },
    });

    if (messages.length > 0) {
      await prisma.message.updateMany({
        where: {
          senderId: recipientId,
          recipientId: userId,
          dateread: null,
        },
        data: {
          dateread: new Date(),
        },
      });
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

    const selector = container === "outbox" ? "senderId" : "recipientId";

    const messages = await prisma.message.findMany({
      where: {
        [selector]: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
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
      },
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function deleteMessage ( messageId: string, isOutBox: boolean) {
  const selector = isOutBox ? 'senderDeleted': 'recipientDeleted';
}