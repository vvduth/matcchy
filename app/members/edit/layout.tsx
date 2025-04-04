import { getMemberById } from "@/app/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";
import MemberSidebar from "../MemberSidebar";
import { Card } from "@heroui/react";
import { getAuthUserid } from "@/app/actions/authActions";

const Layout = async ({
  children
}: {
  children: React.ReactNode;
 
}) => {
  const  userId  = await getAuthUserid()
  const member = await getMemberById(userId);
  const basePath = `/members/edit`;
  if (!member) {
    return notFound()
  }
  const navLinks = [
    { name: "Update profile", href: basePath },
    { name: "Edit photos", href: `${basePath}/photos` },
  ];
  return <div className="grid grid-cols-12 gap-5 h-[80vh]">
    <div className="col-span-5 lg:col-span-3">
    <MemberSidebar member={member}
     navLinks ={navLinks}/>
    </div>
    <div className="col-span-7 lg:col-span-9">
        <Card className="w-full mt-10 h-[80vh]">
            {children}
        </Card>
    </div>
  </div>;
};

export default Layout;
