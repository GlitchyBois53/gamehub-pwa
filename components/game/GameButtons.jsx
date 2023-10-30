"use client";

import { usePathname } from "next/navigation";
import {
  handleSetLibrary,
  handleSetWishlist,
} from "../../lib/actions/user.actions";
import Button from "../shared/Button";
import { useServerAction } from "../../lib/useServerAction";
import { toast } from "sonner";
import Toast from "../shared/Toast";

export default function GameButtons({
  clerkId,
  gameId,
  libraryArr,
  wishlistArr,
  clerkUser,
  isReleased,
}) {
  const pathname = usePathname();
  const [runLibraryAction, isLibraryRunning] =
    useServerAction(handleSetLibrary);
  const [runWishlistAction, isWishlistRunning] =
    useServerAction(handleSetWishlist);

  function sendToast(state, message) {
    toast.custom((t) => <Toast t={t} type={state} message={message} />);
  }

  async function libraryAction() {
    await runLibraryAction({
      clerkId: clerkId,
      gameId: gameId,
      path: pathname,
    });
  }

  async function wishlistAction() {
    await runWishlistAction({
      clerkId: clerkId,
      gameId: gameId,
      path: pathname,
    });
  }

  function handleLibrary() {
    if (clerkUser) {
      libraryAction();
      if (libraryArr?.includes(gameId.toString())) {
        sendToast("", "Removing game from library");
      } else {
        sendToast("", "Adding game to library");
      }
    } else {
      sendToast("error", "Please sign in to add games to your library");
    }
  }

  function handleWishlist() {
    if (clerkUser) {
      wishlistAction();
      if (wishlistArr?.includes(gameId.toString())) {
        sendToast("", "Removing game from wishlist");
      } else {
        sendToast("", "Adding game to wishlist");
      }
    } else {
      sendToast("error", "Please sign in to add games to your wishlist");
    }
  }

  return (
    <div className="flex gap-[12px] mt-[24px] flex-wrap">
      {isReleased && (
        <>
          {libraryArr?.includes(gameId.toString()) ? (
            <Button
              handleClick={handleLibrary}
              text={`${isLibraryRunning ? "removing" : "remove"} from library`}
              icon={"/library-icon-dark.svg"}
              attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px]"
              isLoading={isLibraryRunning}
            />
          ) : (
            <Button
              handleClick={handleLibrary}
              text={`${isLibraryRunning ? "adding" : "add"} to library`}
              icon={"/library-icon-dark.svg"}
              attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px]"
              isLoading={isLibraryRunning}
            />
          )}
        </>
      )}
      {wishlistArr?.includes(gameId.toString()) ? (
        <Button
          handleClick={handleWishlist}
          text="remove from wishlist"
          icon={"/wishlist-icon-dark.png"}
          lightIcon={"/wishlist-icon.png"}
          variant={"secondary"}
          attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px] opacity-50"
          isLoading={isWishlistRunning}
        />
      ) : (
        <>
          {libraryArr?.includes(gameId.toString()) ? (
            <Button
              handleClick={() => sendToast("error", "Game already in library")}
              text="add to wishlist"
              icon={"/wishlist-icon-dark.png"}
              lightIcon={"/wishlist-icon.png"}
              variant={"secondary"}
              attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px] opacity-50"
              isLoading={isWishlistRunning}
            />
          ) : (
            <Button
              handleClick={handleWishlist}
              text="add to wishlist"
              icon={"/wishlist-icon-dark.png"}
              lightIcon={"/wishlist-icon.png"}
              variant={"secondary"}
              attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px]"
              isLoading={isWishlistRunning}
            />
          )}
        </>
      )}
    </div>
  );
}
