// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import GameContainerLink from "./GameContainerLink";
import { fetchGameData } from "../../lib/fetchGameData";
import GameCard from "./GameCard";
import Button from "./Button";
import Closer from "./Closer";

// This component is used to display a list of games, it's used many times throughout the app, and is very flexible
export default async function GameContainer({
  arr,
  title,
  isScrollable,
  isOnGamePage,
  isLink,
  href,
  icon,
  isEmpty,
  isCurrentUserProfile,
  isPersonalPage,
  clerkId,
  isLibrary,
}) {
  let coverIdArr = null;

  if (Array.isArray(arr)) {
    coverIdArr = arr.map((game) => parseInt(game.cover));
  }

  // fetch the cover data for the games
  const coverArr = await fetchGameData(
    "covers",
    `fields image_id; where id = (${coverIdArr}); limit 100;`
  );

  return (
    <article className="h-full">
      {isLink ? (
        <div className="flex items-center gap-[5px]">
          {icon && (
            <img
              src={icon}
              alt={`${title}-icon`}
              className="w-[14px] object-contain translate-y-[1px] ml-[3px]"
            />
          )}
          <GameContainerLink
            href={href}
            isOnGamePage={isOnGamePage}
            title={title}
          />
          <img
            src="/arrow-icon-grad.svg"
            alt="arrow-icon"
            className="w-[8px] mt-[3.1px] object-contain"
          />
        </div>
      ) : (
        <h2
          className={`${
            isOnGamePage
              ? "text-[16px] tracking-[0.96px]"
              : "text-[24px] tracking-[1.44px] bg-clip-text text-transparent bg-game-grad"
          } uppercase font-bold w-max`}
        >
          {title}
        </h2>
      )}
      <div
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(160px, 1fr))` }}
        className={`${
          isScrollable
            ? "flex overflow-x-scroll"
            : "grid justify-items-center h-full"
        } gap-[24px] md:ml-[-32px]  mx-[-24px] md:pl-[32px] p-[24px] ${
          isOnGamePage && "pt-[18px] mx-[-32px] pr-[32px]"
        }`}
      >
        {isEmpty ? (
          <div className="h-[269px] w-full flex items-center justify-center flex-col gap-[12px]">
            <p className="text-center uppercase text-[14px] tracking-[0.84px] font-semibold mb-[24px] opacity-70">
              {title} is empty{isCurrentUserProfile && ", add some games!"}
            </p>
            {isCurrentUserProfile && (
              <Button
                icon={"/plus.svg"}
                text={"Add Games"}
                isLink={true}
                href={"/games"}
              />
            )}
          </div>
        ) : (
          <>
            {Array.isArray(arr) && (
              <>
                {arr.map((game) => {
                  let cover = null;
                  if (Array.isArray(coverArr) && coverArr.length > 0) {
                    cover = coverArr.find(
                      (cover) => cover.id == game.cover
                    )?.image_id;
                  }
                  return (
                    <GameCard
                      game={game}
                      imageId={cover}
                      key={game.id}
                      isPersonalPage={isPersonalPage}
                      clerkId={clerkId}
                      isLibrary={isLibrary}
                    />
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
      <Closer />
    </article>
  );
}
