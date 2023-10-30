"use client";

import FriendInfo from "./FriendInfo";
import InfoCard from "../shared/InfoCard";
import Vr from "../shared/Vr";
import More from "./More";
import { removeFriend } from "../../lib/actions/user.actions";
import { useStore } from "../../app/store";

export default function FriendCard({
  image,
  username,
  email,
  commonGames,
  totalGames,
  friendId,
  clerkId,
}) {
  async function handleFriendRemoval() {
    await removeFriend({
      clerkId: clerkId,
      targetId: friendId,
    });
  }

  const activeMore = useStore((store) => store.activeMore);

  return (
    <article className="bg game-shadow px-[24px] py-[20px] flex h-[98px] justify-between items-center">
      <FriendInfo
        email={email}
        id={friendId}
        image={image}
        username={username}
      />
      <div className="flex gap-[18px] items-center h-full">
        <div className="hidden md:flex gap-[8px] h-full">
          <InfoCard
            number={commonGames}
            title={"Common"}
            icon={"/games-icon.png"}
            darkIcon={"/games-icon-dark.png"}
          />
          <Vr />
          <InfoCard
            number={totalGames}
            title={"Total"}
            icon={"/library-icon.svg"}
            darkIcon={"/library-icon-dark.svg"}
          />
        </div>
        <div
          className={`relative ${activeMore === friendId ? "z-40" : "z-30"}`}
        >
          <More
            isFriend={true}
            slug={friendId}
            handleClick={handleFriendRemoval}
          />
        </div>
      </div>
    </article>
  );
}
