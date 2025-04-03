import { CardBody, CardHeader, Divider } from '@heroui/react'
import React from 'react'

const ChatPage = () => {
  return (
    <>
    <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
    </CardHeader>
    <Divider />
    <CardBody>
        Chat
    </CardBody>
</>
  )
}

export default ChatPage