import React from 'react'
import { getMembers } from '../actions/memberActions'

 const  MemberPage = async () => {
  const member = await getMembers()
  return (
    <div>MemberPage</div>
  )
}

export default MemberPage