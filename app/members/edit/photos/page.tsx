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
      <CardHeader className="text-2xl font-semibold text-secondary">
        edit profile
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotoUpload />
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
