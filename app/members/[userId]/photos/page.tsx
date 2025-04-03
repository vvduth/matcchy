import { getMemberPhotosBuUserId } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider, Image } from "@heroui/react";
import React from "react";

const PhotoPage = async ({params}: {
  params: Promise<{
    userId: string;
  }>;
}) => {

  const {userId} = await params
  const photos = await getMemberPhotosBuUserId(userId)
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {photos && photos.map((photo) => (
            <div key={photo.id}>
              <Image 
                alt={'Image of member'}
                width={300}
                src={photo.url}
                className="aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </CardBody>
    </>
  );
};

export default PhotoPage;
