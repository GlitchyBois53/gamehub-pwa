"use client";

import Button from "../shared/Button";
import FriendSearch from "./FriendSearch";
import AddFriend from "./AddFriend";
import Request from "./Request";
import { useState } from "react";

export default function FriendContainer({ clerkId, users }) {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  return (
    <article className="flex justify-between gap-[24px] flex-wrap items-start">
      <FriendSearch placeholder={"search for a friend..."} />
      <div className="flex gap-[12px]">
        <Button
          icon={"/friend-icon-dark.svg"}
          lightIcon={"/friend-icon.svg"}
          variant={"secondary"}
          text={"Requests"}
          attributes="py-[11px] px-[15px] text-[12px] tracking-[0.72px]"
          handleClick={() => setIsRequestOpen(true)}
        />
        <Button
          icon={"/add-friend-icon.png"}
          text={"Add Friend"}
          attributes="py-[11px] px-[15px] text-[12px] tracking-[0.72px]"
          handleClick={() => setIsAddFriendOpen(true)}
        />
      </div>
      <AddFriend
        isAddFriendOpen={isAddFriendOpen}
        setIsAddFriendOpen={setIsAddFriendOpen}
        users={users}
        clerkId={clerkId}
      />
      <Request
        isRequestOpen={isRequestOpen}
        setIsRequestOpen={setIsRequestOpen}
      />
    </article>
  );
}
