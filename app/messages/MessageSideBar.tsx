"use client";
import { useMessageStore } from "@/hooks/useMessageStore";
import { Chip } from "@heroui/react";
import clsx from "clsx";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { GoInbox } from "react-icons/go";
import { MdOutlineOutbox } from "react-icons/md";

const MessageSideBar = () => {
  const unreadCount = useMessageStore(state => state.unreadCount)
  const searchParams = useSearchParams();
  const router = useRouter()
  const pathname = usePathname()
  const [selected, setSelected] = useState(searchParams.get("container") || "");
  const items = [
    { key: "inbox", label: "Inbox", Icon: GoInbox, chip: true },
    { key: "outbox", label: "OutBox", Icon: MdOutlineOutbox, chip: true },
  ];

  const handleSelect = (key: string) => {
    setSelected(key)
    const params  = new URLSearchParams()
    params.set('container', key)
    router.replace(`${pathname}?${params}`)
  }
  return (
    <div className="flex flex-col shadow-md rounded-lg cursor-pointer">
      {items.map(({ key, label, Icon, chip }) => (
        <div
          key={key}
          className={clsx("flex items-center rounded-t-lg gap-2 p-3", {
            "text-secondary font-semibold": selected === key,
            "text-black hover:text-secondary/70": selected !== key,
          })}
          onClick={() => handleSelect(key)}
        >
          <Icon size={24} />
          <div className="flex justify-between gap-2 flex-grow">
            <span>{label}</span>
            {(chip && key==='inbox') && <Chip>{unreadCount}</Chip>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSideBar;
