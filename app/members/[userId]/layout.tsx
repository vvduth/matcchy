import { getMemberById } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";
import MemberSidebar from "../MemberSidebar";
import { Card } from "@heroui/react";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    userId: string;
  }>;
}) => {
  const { userId } = await params;
  const member = await getMemberById(userId);
  if (!member) {
    return notFound()
  }
  return <div className="grid grid-cols-12 gap-5 h-[80vh]">
    <div className="col-span-5 lg:col-span-3">
    <MemberSidebar member={member}/>
    </div>
    <div className="col-span-7 lg:col-span-9">
        <Card className="w-full mt-10 h-[80vh]">
            {children}
        </Card>
    </div>
  </div>;
};

export default Layout;
