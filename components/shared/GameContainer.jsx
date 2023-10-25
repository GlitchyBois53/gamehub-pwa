import Link from "next/link";
import { fetchGameData } from "../../lib/fetchGameData";
import GameCard from "./GameCard";

export default async function GameContainer({
  arr,
  title,
  isScrollable,
  isOnGamePage,
  isLink,
  href,
  icon,
}) {
  let coverIdArr = null;

  if (Array.isArray(arr)) {
    coverIdArr = arr.map((game) => parseInt(game.cover));
  }

  const coverArr = await fetchGameData(
    "covers",
    `fields image_id; where id = (${coverIdArr}); limit 100;`
  );

  return (
    <article>
      {isLink ? (
        <div className="flex items-center gap-[5px]">
          {icon && (
            <img
              src={icon}
              alt={`${title}-icon`}
              className="w-[14px] object-contain translate-y-[1px] ml-[3px]"
            />
          )}
          <Link
            href={href}
            className={`${
              isOnGamePage
                ? "text-[16px] tracking-[0.96px]"
                : "text-[24px] tracking-[1.44px] bg-clip-text text-transparent bg-game-grad"
            } uppercase font-bold w-max`}
          >
            {title}
          </Link>
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
          isScrollable ? "flex overflow-x-scroll" : "grid justify-items-center"
        } gap-[24px] md:ml-[-32px]  mx-[-24px] md:pl-[32px] p-[24px] ${
          isOnGamePage && "pt-[18px] mx-[-32px] pr-[32px]"
        }`}
      >
        {Array.isArray(arr) && (
          <>
            {arr.map((game) => {
              let cover = null;
              if (Array.isArray(coverArr) && coverArr.length > 0) {
                cover = coverArr.find(
                  (cover) => cover.id == game.cover
                )?.image_id;
              }
              return <GameCard game={game} imageId={cover} key={game.id} />;
            })}
          </>
        )}
      </div>
    </article>
  );
}
