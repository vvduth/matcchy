'use client'

import { signOut } from "@/auth";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from '@heroui/dropdown';
import {Avatar} from '@heroui/avatar';
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

type Props = {
  user: Session["user"];
};
const Usermenu = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as={"button"}
          className="transititon-transform"
          color="secondary"
          name={user?.name || "user avatar"}
          size="sm"
          src={user?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="user action menu">
        <DropdownSection showDivider>
          <DropdownItem
            key={"name"}
            isReadOnly
            as={"span"}
            className="h-14 flex flex-row"
            aria-label="user name"
          >
            Helo {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem key={"edit"} as={Link} href="/members/edit">
          Edit profile
        </DropdownItem>
        <DropdownItem key={"logout"} 
        onPress={async() => {}}
        color="danger">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Usermenu;
