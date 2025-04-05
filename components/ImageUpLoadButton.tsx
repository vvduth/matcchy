'use client'
import { on } from 'events'
import {CldUploadButton, CloudinaryUploadWidgetResults} from 'next-cloudinary'
import React from 'react'
import { HiPhoto } from 'react-icons/hi2'

type Props = {
    onUploadImage: (res: CloudinaryUploadWidgetResults) => void;
}

const ImageUpLoadButton = ({onUploadImage}: Props) => {
  return (
    <CldUploadButton
        options={{maxFiles: 1}}
        onSuccess={onUploadImage}
        signatureEndpoint={'/api/sign-image'}
        uploadPreset='matchyy'
        className='flex items-center gap-2 border-2 border-secondary
        text-secondary py-2 px-4 hover:bg-secondary/70 rounded-md'
    >
        <HiPhoto size={28} />
        Upload new Image
    </CldUploadButton>
  )
}

export default ImageUpLoadButton