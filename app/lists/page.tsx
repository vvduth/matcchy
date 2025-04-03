import React from 'react'
import ListsTabs from './ListsTabs'
import { fetchCurrentUserLikeIds, fetchCurrentUserLikes } from '../actions/likeAction'

const ListPage = async ({
  searchParams
}: { searchParams:Promise< {type: string}>}) => {
  const {type} = await searchParams
  const likeIds = await fetchCurrentUserLikeIds()
  const members = await fetchCurrentUserLikes(type)
  return (
    <div>
      <ListsTabs
      members={members}
      likeIds={likeIds}

      />
    </div>
  )
}

export default ListPage