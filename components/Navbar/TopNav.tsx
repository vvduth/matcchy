import { GiMatchTip } from "react-icons/gi";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import Link from "next/link";
import { Button } from "@heroui/button";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import Usermenu from "./Usermenu";
import { getUserById } from "@/app/actions/authActions";
import { getUserInfoForNav } from "@/app/actions/userActions";
import Filters from "../Filters";

const TopNav = async () => {
  const session = await auth();
  const userInfo = session?.user && await getUserInfoForNav()
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
      <NavbarContent justify="center">
        <NavLink label="Members" href="/members" />
        <NavLink label="lists" href="/lists" />

        <NavLink label="messages" href="/messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        {userInfo? (
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
    <Filters />
    </>
  );
};

export default TopNav;
