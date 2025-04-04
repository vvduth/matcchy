import { CardHeader, Divider, CardBody } from "@heroui/react";
import React from "react";
import EditForm from "./EditForm";
import { getAuthUserid } from "@/app/actions/authActions";
import { getMemberById } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";

const EditPage = async () => {
  const userId = await getAuthUserid();
  const member = await getMemberById(userId);
  if (!member) return notFound();
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        edit profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </>
  );
};

export default EditPage;
