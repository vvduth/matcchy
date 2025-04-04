import { Member } from '@prisma/client'
import React from 'react'


type Props = {
    member: Member
}

const EditForm = ({member}: Props ) => {
  return (
    <div>{member.name}</div>
  )
}

export default EditForm