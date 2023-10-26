"use client";

import Vr from "../shared/Vr";
import InfoCard from "./../shared/InfoCard";

export default function UserCard({
  libraryLength,
  wishlistLength,
  friendsLength,
}) {
  return (
    <div className="bg py-[10px] px-[8px] w-full game-shadow flex flex-col xs:flex-row gap-[8px] xs:h-[83px] my-[12px] xs:my-0 items-center xs:w-max">
      <InfoCard
        icon={"/library-icon.svg"}
        darkIcon={"/library-icon-dark.svg"}
        number={libraryLength}
        title={"Library"}
      />
      <Vr isResponsive={true} />
      <InfoCard
        icon={"/wishlist-icon.png"}
        darkIcon={"/wishlist-icon-dark.png"}
        number={wishlistLength}
        title={"Total"}
      />
      <Vr isResponsive={true} />
      <InfoCard
        icon={"/friend-icon.svg"}
        darkIcon={"/friend-icon-dark.svg"}
        number={friendsLength}
        title={"Friends"}
      />
    </div>
  );
}
