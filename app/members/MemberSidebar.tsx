'use client'
import PresenceDot from "@/components/PresenceDot";
import { calAge, transformImgUrl } from "@/lib/util";
import { Button, Card, CardBody, CardFooter, Divider, Image } from "@heroui/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type Props = {
  member: Member;
  navLinks: {name: string, href: string}[]
};
const MemberSidebar = ({ member, navLinks }: Props) => {
  const pathName = usePathname();
  
 
  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        height={200}
        width={200}
        src={transformImgUrl(member.image) || "/images/user.png"}
        alt="user profile main image"
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody className="overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="flex">
          <div className="text-2xl">
            {member.name}, {calAge(member.dateOfBirth)}
          </div>
          <div>
            <PresenceDot member={member} />
          </div>
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className="my-3" />
      <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
        {navLinks.map((link) => (
          <Link
            href={link.href}
            key={link.name}
            className={`block rounded ${pathName === link.href ? "text-secondary" : "hover:text-secondary/50"}`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      </CardBody>
      <CardFooter>
        <Button as={Link}
            href="/members"
            color="secondary"
            variant="bordered"
            fullWidth
        >
            Go back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberSidebar;
