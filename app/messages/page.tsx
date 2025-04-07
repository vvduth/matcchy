import React from 'react'
import MessageSideBar from './MessageSideBar'
import { getMessageByContainer } from '../actions/messageAction'

const MessagesPage = async ({searchParams}: {
  searchParams: Promise<{
    container: string 
  }>
}) => {
  const {container} = await searchParams

  const message = await getMessageByContainer(container)
  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
      <div className='col-span-2'>
        <MessageSideBar />
      </div>
      <div className='col-span-10'>
        mess
      </div>
    </div>
  )
}

export default MessagesPage