import { getMemberById } from "@/app/actions/memberActions";
import CardInnerWrapper from "@/components/CardInnerWrapper";
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
        <CardInnerWrapper 
          header='Profile'
          body={
            <CardBody className="flex flex-col gap-4">
              <div className="text-2xl font-semibold text-secondary">
                {member.name}
              </div>
              <div className="text-sm text-gray-500">{member.description}</div>
            </CardBody>
          }
        />
    </>
  )
};

export default MemberDetailsPage;
