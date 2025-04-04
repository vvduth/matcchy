'use client'
import { addImage } from '@/app/actions/userActions'
import ImageUpLoadButton from '@/components/ImageUpLoadButton'
import { CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'react-toastify'

const MemberPhotoUpload = () => {

    const router = useRouter()

    const onAddImage = async (res: CloudinaryUploadWidgetResults) => {
        if (res.info && typeof res.info === 'object') {
           await addImage(res.info.secure_url, res.info.public_id)
           router.refresh()
        } else {
          toast.error('Error uploading image')
        }
    }
  return (
    <div>
        <div className="pt-5 pl-5">
          <ImageUpLoadButton 
          onUploadImage={onAddImage}
          />
        </div>
    </div>
  )
}

export default MemberPhotoUpload