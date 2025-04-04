"use client";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";
import { Image } from "@heroui/react";
type Props = {
  photo: Photo | null;
};
const MemberImage = ({ photo }: Props) => {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop={"fill"}
          gravity="faces"
          className="rounded-2xl"
        />
      ) : (
        <Image
          width={220}
          className="aspect-square object-cover"
          src={photo?.url}
          isZoomed
          alt={"user photo"}
        />
      )}
    </div>
  );
};

export default MemberImage;
