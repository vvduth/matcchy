import { CardHeader, Divider, CardBody, Image } from "@heroui/react";
import React from "react";
import { getAuthUserid } from "@/app/actions/authActions";
import {
  getMemberById,
  getMemberPhotosBuUserId,
} from "@/app/actions/memberActions";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/components/MemberPhotos";

const PhotosPage = async () => {
  const userId = await getAuthUserid();
  const photos = await getMemberPhotosBuUserId(userId);
  const member = await getMemberById(userId);
  return (
    <>
      <CardHeader className='flex flex-col md:flex-row justify-between items-center'>
        <div className="text-2xl font-semibold text-secondary">Edit profile</div>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        
        <MemberPhotos
          photos={photos}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  );
};

export default PhotosPage;
