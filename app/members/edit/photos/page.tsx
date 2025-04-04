import { CardHeader, Divider, CardBody, Image } from "@heroui/react";
import React from "react";
import { getAuthUserid } from "@/app/actions/authActions";
import {
  getMemberById,
  getMemberPhotosBuUserId,
} from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import StarButton from "@/components/StarButton";
import DeleteButton from "@/components/DeleteButton";
import ImageUpLoadButton from "@/components/ImageUpLoadButton";

const PhotosPage = async () => {
  const userId = await getAuthUserid();
  const photos = await getMemberPhotosBuUserId(userId);
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        edit profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="pt-5 pl-5">
          <ImageUpLoadButton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  className="aspect-square object-cover"
                  src={photo.url}
                  isZoomed
                  alt={"user photo"}
                />
                <div className="absolute top-3 left-3 z-50">
                  <StarButton selected={false} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
};

export default PhotosPage;
