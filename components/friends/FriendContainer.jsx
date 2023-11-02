// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import Button from "../shared/Button";
import FriendSearch from "./FriendSearch";
import AddFriend from "./AddFriend";
import Request from "./Request";
import { useState } from "react";

// This component is used to display the friend container
export default function FriendContainer({
  clerkId,
  users,
  friendRequests,
  searchParams,
  hasRequest,
}) {
  // state to control the add friend modal
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  // state to control the request modal
  const [isRequestOpen, setIsRequestOpen] = useState(false);

  const currentUser = users.find((user) => user?.clerkId === clerkId);

  return (
    <article className="flex justify-between gap-[24px] flex-wrap items-start">
      <FriendSearch
        placeholder={"search for a friend..."}
        isSearchParams={true}
        searchParams={searchParams}
      />
      <div className="flex gap-[12px]">
        <Button
          icon={"/friend-icon-dark.svg"}
          lightIcon={"/friend-icon.svg"}
          variant={"secondary"}
          text={"Requests"}
          attributes="py-[11px] px-[15px] text-[12px] tracking-[0.72px]"
          handleClick={() => setIsRequestOpen(true)}
          hasNotification={hasRequest}
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
        clerkId={clerkId}
        requests={friendRequests}
        currentUser={currentUser}
      />
    </article>
  );
}
