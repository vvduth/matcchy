"use client";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";
import { Button, Image } from "@heroui/react";
import clsx from "clsx";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useRole } from "@/hooks/useRole";
type Props = {
  photo: Photo | null;
};
const MemberImage = ({ photo }: Props) => {
  const role = useRole();
  return (
    <div className='cursor-pointer'>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop={"fill"}
          gravity="faces"
          className={clsx('rounded-2xl', {
            'opacity-40': !photo.isApproved && role !== 'ADMIN'
        })}
          priority
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
      {!photo?.isApproved && role !== "ADMIN" && (
        <div className="absolute bottom-2 w-auto bg-slate-200 p-1">
          <div className="flex justify-center text-danger font-semibold">
            Awaiting approval
          </div>
        </div>
      )}
      {role === "ADMIN" && (
        <div className="flex flex-row gap-2 mt-2">
          <Button
            onPress={() => {}}
            color="success"
            variant="bordered"
            
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onPress={() => {}}
            color="danger"
            variant="bordered"
            
          >
            <ImCross size={20} />
          </Button>{" "}
        </div>
      )}
    </div>
  );
};

export default MemberImage;
