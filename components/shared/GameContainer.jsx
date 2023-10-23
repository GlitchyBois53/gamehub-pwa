import { fetchGameData } from "../../lib/fetchGameData";
import GameCard from "./GameCard";

export default async function GameContainer({
  arr,
  title,
  isScrollable,
  isOnGamePage,
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
      <h2
        className={`${
          isOnGamePage
            ? "text-[16px] tracking-[0.96px]"
            : "text-[24px] tracking-[1.44px] bg-clip-text text-transparent bg-game-grad"
        } uppercase font-bold w-max`}
      >
        {title}
      </h2>
      <div
        className={`flex ${
          isScrollable ? "overflow-x-scroll" : "flex-wrap"
        } gap-[24px] md:ml-[-32px] mx-[-24px] md:pl-[32px] p-[24px] ${
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
