"use client";

import { usePathname } from "next/navigation";
import {
  handleSetLibrary,
  handleSetWishlist,
} from "../../lib/actions/user.actions";
import More from "../friends/More";

export default function DeleteGame({ clerkId, gameId, isLibrary, slug }) {
  const pathname = usePathname();

  async function deleteGame() {
    if (isLibrary) {
      await handleSetLibrary({
        clerkId: clerkId,
        gameId: gameId,
        path: pathname,
      });
    } else {
      await handleSetWishlist({
        clerkId: clerkId,
        gameId: gameId,
        path: pathname,
      });
    }
  }

  return (
    <div
      className={`absolute top-[7px] right-[7px] bg-[#F9F9F9]/10 backdrop-blur-[86px] rounded-full w-[28px] aspect-square cursor-pointer z-30`}
    >
      <div className="w-full h-full bg-black/20 rounded-full flex items-center justify-center">
        <More handleClick={deleteGame} slug={slug} isWhite={true} />
      </div>
    </div>
  );
}
