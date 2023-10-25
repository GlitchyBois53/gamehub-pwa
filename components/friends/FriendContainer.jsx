"use client";

import Button from "../shared/Button";
import FriendSearch from "./FriendSearch";
import AddFriend from "./AddFriend";
import Request from "./Request";
import { useState } from "react";
import { handleFriendRequest } from "../../lib/actions/user.actions";

export default function FriendContainer({ clerkId }) {
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  async function sendFriendRequest() {
    await handleFriendRequest({
      clerkId: clerkId,
      targetId: "user_2WqtfreQ2khIB0On5aEnmDjFsUF",
    });
  }

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
          handleClick={sendFriendRequest}
        />
      </div>
      <AddFriend
        isAddFriendOpen={isAddFriendOpen}
        setIsAddFriendOpen={setIsAddFriendOpen}
      />
      <Request
        isRequestOpen={isRequestOpen}
        setIsRequestOpen={setIsRequestOpen}
      />
    </article>
  );
}
