"use client";
import { Tab, Tabs } from "@heroui/react";
import { Member } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Key, useTransition } from "react";
import MemberCard from "../members/MemberCard";
import LoadingComponent from "@/components/LoadingComponent";

type Props = {
  members: Member[];
  likeIds: string[];
};
const ListsTabs = ({ members, likeIds }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [isPending, startTransititon] = useTransition();
  const tabes = [
    { id: "source", label: "members I have liked" },
    { id: "target", label: "members that liked me" },
    { id: "mutual", label: "We both like each other" },
  ];

  const handleTabChange = (key: Key) => {
    startTransititon(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathName}?${params.toString()}`);
    });
  };
  return (
    <div className="flex w-full flex-col mt-10 gap-5">
      <Tabs
        aria-label="Like tabs"
        items={tabes}
        color="secondary"
        onSelectionChange={(key) => handleTabChange(key)}
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            {isPending ? (
              <LoadingComponent />
            ) : (
              <>
                {members.length > 0 ? (
                  <div
                    className="mt-10 grid grid-cols-2 md:grid-cols-2 
    lg:grid-cols-3 xl:grid-cols-6 gap-8"
                  >
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        likeIds={likeIds}
                        member={member}
                      />
                    ))}
                  </div>
                ) : (
                  <div>No member found</div>
                )}
              </>
            )}
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default ListsTabs;
