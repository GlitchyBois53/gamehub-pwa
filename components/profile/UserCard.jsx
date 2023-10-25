"use client";

import Vr from "../shared/Vr";
import { useStore } from "../../app/store";

export default function UserCard({
  libraryLength,
  wishlistLength,
  friendsLength,
}) {
  console.log(libraryLength, wishlistLength, friendsLength);
  return (
    <div className="bg py-[10px] px-[8px] game-shadow flex gap-[8px] h-[83px] items-center w-max">
      <Card
        icon={"/library-icon.svg"}
        darkIcon={"/library-icon-dark.svg"}
        number={libraryLength}
        title={"Library"}
      />
      <Vr />
      <Card
        icon={"/wishlist-icon.png"}
        darkIcon={"/wishlist-icon-dark.png"}
        number={wishlistLength}
        title={"Total"}
      />
      <Vr />
      <Card
        icon={"/friend-icon.svg"}
        darkIcon={"/friend-icon-dark.svg"}
        number={friendsLength}
        title={"Friends"}
      />
    </div>
  );
}

function Card({ icon, darkIcon, number, title }) {
  const theme = useStore((store) => store.theme);
  return (
    <article className="flex items-center flex-col w-[70px] gap-[-4px]">
      <img
        src={theme === "light" ? icon : darkIcon}
        alt={title}
        className="h-[15px] object-contain opacity-60 translate-x-[-0.7px]"
      />
      <h3 className="text-[24px] tracking-[1.4px] font-bold bg-game-grad bg-clip-text text-transparent w-max h-[28px] translate-y-[-4px]">
        {number}
      </h3>
      <h4 className="text-[9px] tracking-[0.56px] font-semibold uppercase">
        {title}
      </h4>
    </article>
  );
}
