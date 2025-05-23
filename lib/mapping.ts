import { Message } from "@prisma/client";
import { formatShortDate } from "./util";
import { MessageWithSenderRecipient } from "@/types";

export function mapMessageToMessageDto(message: MessageWithSenderRecipient) {
    return {
        id: message.id,
        text: message.text,
        createdAt: formatShortDate(message.createdAt),
        dateRead: message.dateread ? formatShortDate(message.dateread) : null,
        senderId: message.sender?.userId,
        senderName: message.sender?.name,
        senderImage: message.sender?.image,
        recipientId: message.recipient?.userId,
        recipientName: message.recipient?.name,
        recipientImage: message.recipient?.image,
    }
}