import { auth, signOut } from "@/auth";
import { Button } from "@heroui/react";
import Image from "next/image";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <h1 className="text-3xl text-emerald-500">Hello world</h1>
      <h3 className="text-2xl font-semibold">
        User session data
      </h3>
      {session ? (
        <div><pre>
            {JSON.stringify(session, null, 2)}
          </pre>
          <form action={async () => {
            'use server'
            await signOut()
          }}>
            <Button
            type="submit"
            >
              log out 
            </Button>
          </form>
          </div>
      ): (
        <div>Not sign in</div>
      )}
      <div className="bg-red-300">hi</div>
    </div>
  );
}
