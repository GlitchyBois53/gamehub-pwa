import { fetchGameData } from '../../lib/fetchGameData';
import GameCard from './GameCard';

export default async function GameContainer({ arr, title, isScrollable }) {
  let coverIdArr = null;

  if (Array.isArray(arr)) {
    coverIdArr = arr.map((game) => game.cover);
  }
  const coverArr = await fetchGameData(
    'covers',
    `fields image_id; where id = (${coverIdArr}); limit 100;`
  );
  return (
    <>
      <h2 className="text-[24px] uppercase tracking-[1.44px] font-bold bg-game-grad bg-clip-text text-transparent">
        {title}
      </h2>
      <div
        className={`flex ${
          isScrollable ? 'overflow-scroll' : 'flex-wrap'
        } gap-[24px] md:ml-[-32px] mx-[-24px] md:pl-[32px] p-[24px]`}
      >
        {Array.isArray(arr) && (
          <>
            {arr.map((game) => {
              let cover = null;
              if (Array.isArray(coverArr) && coverArr.length > 0) {
                cover = coverArr.find(
                  (cover) => cover.id === game.cover
                ).image_id;
              }
              return <GameCard game={game} imageId={cover} />;
            })}
          </>
        )}
      </div>
    </>
  );
}
