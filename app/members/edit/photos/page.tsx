import { CardHeader, Divider, CardBody, Image } from '@heroui/react'
import React from 'react'
import { getAuthUserid } from '@/app/actions/authActions'
import { getMemberById, getMemberPhotosBuUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation'

const PhotosPage = async() => {

    const userId = await getAuthUserid()
    const photos = await getMemberPhotosBuUserId(userId)
  return (
    <>
    <CardHeader className="text-2xl font-semibold text-secondary">
            edit profile
        </CardHeader>
        <Divider />
        <CardBody>
           <div className='grid grid-cols-5 gap3 p-5'>
            {photos && photos.map((photo) => (
                <div key={photo.id} className='relative'>
                    <Image 
                    width={220}
                    src={photo.url}
                    alt={"user photo"}
                        />
                </div>
            ))}
           </div>
        </CardBody>
    </>
    
  )
}

export default PhotosPage