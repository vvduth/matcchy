"use client";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import React from "react";
import { Button, Image, useDisclosure } from "@heroui/react";
import clsx from "clsx";
import { ImCheckmark, ImCross } from "react-icons/im";
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { approvePhoto, rejectPhoto } from "@/app/actions/adminActions";
import { toast } from "react-toastify";
import AppModal from "./AppModal";
type Props = {
  photo: Photo | null;
};
const MemberImage = ({ photo }: Props) => {
  const role = useRole();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!photo) {
    return null;
  }
  const approve = async (photoId: string) => {
    try {
      await approvePhoto(photoId);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const reject = async (photo: Photo) => {
    try {
      await rejectPhoto(photo);
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
    <div className="cursor-pointer" onClick={onOpen}>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop={"fill"}
          gravity="faces"
          className={clsx("rounded-2xl", {
            "opacity-40": !photo.isApproved && role !== "ADMIN",
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
            onPress={() => approve(photo.id)}
            color="success"
            variant="bordered"
          >
            <ImCheckmark size={20} />
          </Button>
          <Button
            onPress={() => reject(photo)}
            color="danger"
            variant="bordered"
          >
            <ImCross size={20} />
          </Button>{" "}
        </div>
      )}
      <AppModal
        imageModal={true}
        isOpen={isOpen}
        onClose={onClose}
        body={
          <>
            {photo?.publicId ? (
              <CldImage
                alt="image of member"
                src={photo.publicId}
                width={750}
                height={750}
                className={clsx("rounded-2xl", {
                  "opacity-40": !photo.isApproved && role !== "ADMIN",
                })}
                priority
              />
            ) : (
              <Image
                width={750}
                src={photo?.url || "/images/user.png"}
                alt="Image of user"
              />
            )}
          </>
        }
      />
    </div>
  );
};

export default MemberImage;
