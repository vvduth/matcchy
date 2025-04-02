import { GiMatchTip } from "react-icons/gi";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import NavLink from "./NavLink";

const TopNav = () => {
  return (
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
          <span className="text-gray-900">Next</span>
          <span className="text-gray-200">Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavLink label="Members" href="/members" />
        <NavLink label="lists" href="/lists" />

        <NavLink label="messages" href="/messages" />

      </NavbarContent>
      <NavbarContent justify="end">
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
      </NavbarContent>
    </Navbar>
  );
};

export default TopNav;
