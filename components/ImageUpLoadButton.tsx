'use client'
import {CldUploadButton} from 'next-cloudinary'
import React from 'react'
import { HiPhoto } from 'react-icons/hi2'
const ImageUpLoadButton = () => {
  return (
    <CldUploadButton
        options={{maxFiles: 1}}
        onSuccess={(res) => console.log(res)}
        signatureEndpoint={'/api/sign-image'}
        uploadPreset='matchyy'
        className='flex items-center gap-2 bg-secondary
        text-white py-2 px-4 hover:bg-secondary/70 rounded-md'
    >
        <HiPhoto size={28} />
        Upload new Image
    </CldUploadButton>
  )
}

export default ImageUpLoadButton