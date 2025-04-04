"use client";
import React from "react";
import MemberImage from "./MemberImage";
import StarButton from "./StarButton";
import DeleteButton from "./DeleteButton";
import { Photo } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteImage, setMainImage } from "@/app/actions/userActions";
type Props = {
  photos: Photo[] | null | undefined;
  editing?: boolean;
  mainImageUrl?: string | null;
};

const MemberPhotos = ({ photos, editing, mainImageUrl }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState({ type: "", loading: false, id: "" });

  const onSetMain = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ type: "main", loading: true, id: photo.id });
    await setMainImage(photo);
    router.refresh();
    setLoading({ type: "", loading: false, id: "" });
  };

  const onDelete = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return null;
    setLoading({ type: "delete", loading: true, id: photo.id });
    await deleteImage(photo);
    router.refresh();
    setLoading({ type: "", loading: false, id: "" });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div
                  onClick={() => onSetMain(photo)}
                  className="absolute top-3 left-3 z-50"
                >
                  <StarButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.loading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div 
                    onClick={() => onDelete(photo)}
                className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={
                      loading.loading &&
                      loading.type === "delete" &&
                      loading.id === photo.id
                    }/>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default MemberPhotos;
