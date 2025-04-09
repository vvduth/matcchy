import React from 'react'
import MessageSideBar from './MessageSideBar'
import { getMessageByContainer } from '../actions/messageAction'
import MessageTable from './MessageTable'

const MessagesPage = async ({searchParams}: {
  searchParams: Promise<{
    container: string 
  }>
}) => {
  const {container} = await searchParams

  const messages = await getMessageByContainer(container)
  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
      <div className='col-span-2'>
        <MessageSideBar />
      </div>
      <div className='col-span-10'>
        <MessageTable initialMessages={messages} />
      </div>
    </div>
  )
}

export default MessagesPage