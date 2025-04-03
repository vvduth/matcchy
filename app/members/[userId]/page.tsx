import { getMemberById } from "@/app/actions/memberActions";
import { CardBody, CardHeader, Divider } from "@heroui/react";
import { notFound } from "next/navigation";
import React from "react";


const MemberDetailsPage = async ({
  params,
}: {
  params: Promise<{
    userId: string;
  }>;
}) => {
  const { userId } = await params;
  const member = await getMemberById(userId);

  if (!member) return notFound();
  return (
    <>
        <CardHeader className="text-2xl font-semibold text-secondary">
            Profile
        </CardHeader>
        <Divider />
        <CardBody>
            {member.description}
        </CardBody>
    </>
  )
};

export default MemberDetailsPage;
