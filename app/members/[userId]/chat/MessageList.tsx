'use client'
import { MessageDto } from '@/types'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import MessageBox from './MessageBox'
import { pusherClient } from '@/lib/pusher'
import { formatShortDate } from '@/lib/util'

type Props = {
    intitalMessages: MessageDto[],
    currentuserId: string,
    chatId: string
}
const MessageList = ({intitalMessages, currentuserId, chatId}: Props) => {

    const [messages, setMessages] = useState(intitalMessages)

    const handleNewMessage = useCallback((message: MessageDto) => {
        setMessages(prevState => {
            return [...prevState, message]
        })
    },[])

    const handleReadMessages = useCallback((messagesIds: string[]) => {
        setMessages(prevState => prevState.map(message => messagesIds.includes(message.id)
        ? { ...message, dateRead: formatShortDate(new Date())} : message
    ))
    },[])

    useEffect(( ) => {

        const chanel = pusherClient.subscribe(chatId)
        chanel.bind('message:new', handleNewMessage)
        chanel.bind('messages:read', handleReadMessages)
        return () => {
            chanel.unsubscribe()
            chanel.unbind('message:new', handleNewMessage)
            chanel.unbind('messages:read', handleReadMessages)
        }
    }, [chatId, handleNewMessage, handleReadMessages])
  return (
    <div>
      {messages.length > 0 ? (
        <>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentuserId}
            />
          ))}
        </>
      ) : (
        <div>No messages to display</div>
      )}
    </div>
  )
}

export default MessageList