import { getMemberById } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";
import MemberSidebar from "../MemberSidebar";

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
  return <div>{member.name}
  <MemberSidebar
   member={member}
  />
  </div>;
};

export default MemberDetailsPage;
