// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

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

  // this function is used to send a toast notification
  function sendToast(state, message) {
    toast.custom((t) => <Toast t={t} type={state} message={message} />);
  }

  // this function is used to run the library action
  async function libraryAction() {
    await runLibraryAction({
      clerkId: clerkId,
      gameId: gameId,
      path: pathname,
    });
  }

  // this function is used to run the wishlist action
  async function wishlistAction() {
    await runWishlistAction({
      clerkId: clerkId,
      gameId: gameId,
      path: pathname,
    });
  }

  // this function is used to handle the library action
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

  // this function is used to handle the wishlist action
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
              handleClick={!isWishlistRunning ? handleLibrary : null}
              text={`${isLibraryRunning ? "adding" : "add"} to library`}
              icon={"/library-icon-dark.svg"}
              attributes={`py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px] ${
                isWishlistRunning && "opacity-50"
              }`}
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
              handleClick={!isLibraryRunning ? handleWishlist : null}
              text="add to wishlist"
              icon={"/wishlist-icon-dark.png"}
              lightIcon={"/wishlist-icon.png"}
              variant={"secondary"}
              attributes={`py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px] ${
                isLibraryRunning && "opacity-50"
              }`}
              isLoading={isWishlistRunning}
            />
          )}
        </>
      )}
    </div>
  );
}
