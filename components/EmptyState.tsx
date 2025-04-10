import { Card, CardBody, CardHeader } from '@heroui/react'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='flex justify-center items-center mt-20'>
        <Card className='p-5'>
            <CardHeader className='text-xl text-secondary'>
                No result for this filter
            </CardHeader>
            <CardBody className='text-center'>
                Please select another one
            </CardBody>
        </Card>
    </div>
  )
}

export default EmptyState