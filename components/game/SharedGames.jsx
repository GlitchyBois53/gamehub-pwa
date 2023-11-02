// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

"use client";

import Link from "next/link";
import Modal from "../shared/Modal";
import { useState } from "react";
import FriendInfo from "../friends/FriendInfo";
import Button from "../shared/Button";

// This component is used to display the friends that have the game in their library
export default function SharedGames({ sharedGames }) {
  // this state is used to toggle the modal
  const [isUserModalActive, setIsUserModalActive] = useState(false);

  return (
    <>
      <section className="mt-[24px] flex gap-[8px] items-center">
        <div className="flex">
          {sharedGames?.map((friend, index) => (
            <>
              {index < 3 && (
                <Link
                  href={`/profile/${friend?.clerkId}`}
                  className={`w-[28px] aspect-square rounded-full shadow-sm ${
                    index !== 0 && "-ml-[12px]"
                  }`}
                  style={{ zIndex: 10 - index }}
                >
                  <img
                    src={friend?.image}
                    alt={`${friend?.username}-profile-photo`}
                    className={`w-[28px] aspect-square object-cover rounded-full`}
                  />
                </Link>
              )}
            </>
          ))}
        </div>
        <p
          className="text-[12px] uppercase tracking-[0.56px] font-bold cursor-pointer hover:underline"
          onClick={() => setIsUserModalActive(true)}
        >
          {sharedGames?.[0]?.username}
          <span className="opacity-60 font-semibold">
            {sharedGames?.length === 1
              ? ""
              : ` & ${sharedGames?.length - 1} other${
                  sharedGames?.length === 2 ? "" : "s"
                }`}{" "}
            played this game
          </span>
        </p>
      </section>
      <UserModal
        sharedGames={sharedGames}
        isUserModalActive={isUserModalActive}
        setIsUserModalActive={setIsUserModalActive}
      />
    </>
  );
}

// This component is used to display the modal that contains the friends that have the game in their library
function UserModal({ sharedGames, isUserModalActive, setIsUserModalActive }) {
  return (
    <Modal
      isModalOpen={isUserModalActive}
      setIsModalOpen={setIsUserModalActive}
      title={"Friends"}
    >
      <div className="flex flex-col gap-[12px] h-full md:h-[420px] max-h-modal-mobile-large overflow-y-scroll p-[12px]">
        {sharedGames?.map((friend) => (
          <article className="bg game-shadow px-[24px] py-[20px] flex justify-between items-center h-full max-h-[98px]">
            <div className="h-full w-full">
              <FriendInfo
                email={friend?.email}
                id={friend?.clerkId}
                image={friend?.image}
                username={friend?.username}
                key={friend?.clerkId}
              />
            </div>
            <div className="hidden md:block">
              <Button
                text={"Library"}
                isLink={true}
                href={`/library/${friend.clerkId}`}
                icon={"/library-icon-dark.svg"}
              />
            </div>
          </article>
        ))}
      </div>
    </Modal>
  );
}
