'use client'
import { MessageDto } from '@/types'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import MessageBox from './MessageBox'
import { pusherClient } from '@/lib/pusher'

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

    useEffect(( ) => {

        const chanel = pusherClient.subscribe(chatId)
        chanel.bind('message:new', handleNewMessage)
        return () => {
            chanel.unsubscribe()
            chanel.unbind('message:new', handleNewMessage)
        }
    }, [chatId, handleNewMessage])
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