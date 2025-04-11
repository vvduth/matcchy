import { auth, signOut } from "@/auth";
import ClientSession from "@/components/ClientSession";
import { Button } from "@heroui/react";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  return (
    <div className="flex flex-row justify-around mt-20 gap-6">
      <div className="bg-rose-50 p-10 rounded-xl shadow-md w-1/2 overflow-auto">
      <h1 className="text-3xl text-emerald-500">Hello world</h1>
      <h3 className="text-2xl font-semibold">Server session data</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>Not sign in</div>
      )}
      <div className="bg-red-300">hi</div></div>
      <ClientSession/>
    </div>
  );
}
