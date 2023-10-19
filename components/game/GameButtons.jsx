'use client';

import { usePathname } from 'next/navigation';
import {
  handleSetLibrary,
  handleSetWishlist,
} from '../../lib/actions/user.actions';
import Button from '../shared/Button';

export default function GameButtons({
  clerkId,
  gameId,
  libraryArr,
  wishlistArr,
}) {
  const pathname = usePathname();
  
  async function handleLibrary() {
    await handleSetLibrary({
      clerkId: clerkId,
      gameId: gameId,
      path: pathname,
    });
  }

  async function handleWishlist() {
    await handleSetWishlist({
      clerkId: clerkId,
      gameId: gameId,
      path: pathname,
    });
  }

  return (
    <div className="flex gap-[12px] mt-[24px]">
      {libraryArr?.includes(gameId.toString()) ? (
        <Button
          handleClick={handleLibrary}
          text="remove from library"
          icon={'/library-icon-dark.svg'}
          attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px] opacity-50"
        />
      ) : (
        <Button
          handleClick={handleLibrary}
          text="add to library"
          icon={'/library-icon-dark.svg'}
          attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px]"
        />
      )}
      {wishlistArr?.includes(gameId.toString()) ? (
        <Button
          handleClick={handleWishlist}
          text="remove from wishlist"
          icon={'/wishlist-icon-dark.png'}
          lightIcon={'/wishlist-icon.png'}
          variant={'secondary'}
          attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px] opacity-50"
        />
      ) : (
        <Button
          handleClick={handleWishlist}
          text="add to wishlist"
          icon={'/wishlist-icon-dark.png'}
          lightIcon={'/wishlist-icon.png'}
          variant={'secondary'}
          attributes="py-[10px] px-[15px] text-[12px] font-semibold tracking-[0.72px]"
        />
      )}
    </div>
  );
}
