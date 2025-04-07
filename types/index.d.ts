import { ZodIssue } from "zod";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type MessageDto = {
  id: string;
  text: string;
  createdAt: string;
  dateRead: string | null;
  senderId: string;
  senderImage?: string | null;
  senderName?: string; 
  recipientId?: string;
  recipientImage?: string | null;
  recipientName?: string;
};
type MessageWithSenderRecipient = Prisma.MessageGetPayload<{
  select: {
      id: true,
      text: true,
      createdAt: true,
      dateread: true,
      sender: {
          select: { userId, name, image }
      },
      recipient: {
          select: { userId, name, image }
      }
  }
}>