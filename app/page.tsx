import { auth, signOut } from "@/auth";
import ClientSession from "@/components/ClientSession";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { GiMatchTip } from "react-icons/gi";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex text-secondary flex-row justify-around mt-20 gap-6">
      <GiMatchTip size={100} />
      <h1 className="text-4xl font-bold">Welcome to matchyy</h1>
      {session ? (
        <>
          <Button
            as={Link}
            href="/members"
            size="lg"
            color="secondary"
            variant="bordered"
          >
            Continue
          </Button>
        </>
      ) : (
        <div className="flex flex-row gap-4">
          <Button
            as={Link}
            href="/login"
            size="lg"
            color="secondary"
            variant="bordered"
          >
            Sign in
          </Button>
          <Button
            as={Link}
            href="/register"
            size="lg"
            color="secondary"
            variant="bordered"
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
