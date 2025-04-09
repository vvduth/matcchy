import usePresenceStore from '@/hooks/usePresenceStore'
import { Member } from '@prisma/client'
import React from 'react'


type Props = {
    member: Member
}
const PresenceDot = ({member}: Props) => {
    const {members  } = usePresenceStore(state => ({
        members: state.members
    }))

    const isOnline = members.indexOf(member.userId) !== -1

    if (!isOnline) return null
  return (
    <div>PresenceDot</div>
  )
}

export default PresenceDot