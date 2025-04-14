import { GiMatchTip } from "react-icons/gi";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import Usermenu from "./Usermenu";
import { getUserInfoForNav } from "@/app/actions/userActions";
import FilterWrapper from "./FilterWrapper";
import { useState } from "react";
import clsx from "clsx";
import MobileMenu from "./MobileMenu";

const TopNav = async () => {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());
  

  const memberLinks = [
    { href: "/members", label: "Matches" },
    { href: "/lists", label: "Lists" },
    { href: "/messages", label: "Messages" },
  ];

  const adminLinks = [{ href: "/admin/moderation", label: "Photo Moderation" }];
  const links = session?.user.role === "ADMIN" ? adminLinks : memberLinks;
  return (
    <>
      <Navbar
        maxWidth={"xl"}
        className="bg-gradient-to-r from-purple-400 to-purple-700"
        classNames={{
          item: [
            "text-xl",
            "text-white",
            "uppercase",
            "data-[active=true]:text-yellow-200",
          ],
        }}
      >
        <NavbarBrand as={Link} href="/">
          <GiMatchTip size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Matc</span>
            <span className="text-gray-200">chy</span>
          </div>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex" justify="center">
          {session &&
            links.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
        </NavbarContent>
        <MobileMenu session={session} links={links} />
        <NavbarContent justify="end">
          {userInfo ? (
            <Usermenu user={userInfo} />
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                variant="bordered"
                className={"text-white"}
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                variant="bordered"
                className={"text-white"}
              >
                Register
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <FilterWrapper />
    </>
  );
};

export default TopNav;
