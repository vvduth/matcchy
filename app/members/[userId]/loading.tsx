import { Spinner } from '@heroui/react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
        <Spinner 
            label='Loading...'
            color='secondary'
            labelColor='secondary'
        />
    </div>
  )
}

export default Loading