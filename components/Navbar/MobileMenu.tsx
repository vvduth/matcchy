"use client";
import { Button, NavbarContent } from "@heroui/react";
import clsx from "clsx";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Session } from "next-auth";
import { FiX, FiMenu } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkType = {
  href: string;
  label: string;
}[];
type Props = {
  session: Session | null;
  links: LinkType;
};

const MobileMenu = ({ session, links }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="md:hidden flex flex-col items-center">
        <Button
          as={Button}
          onPress={toggleMenu}
          className="items-center justify-center p-2 rounded-md text-gray-700
           hover:text-pink-500 hover:bg-pink-50 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </Button>
        
      </div>
      <NavbarContent
          className={clsx("md:hidden py-3", isMenuOpen ? "block" : "hidden")}
        >
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {session &&
              links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "text-pink-500 bg-pink-50"
                      : "text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </NavbarContent>
    </>
  );
};

export default MobileMenu;
