import { fetchGameData } from '../../lib/fetchGameData';
import GameCard from './GameCard';

export default async function GameContainer({ arr, title }) {
  const coverIdArr = arr.map((game) => game.cover);

  const coverArr = await fetchGameData(
    'covers',
    `fields image_id; where id = (${coverIdArr}); limit 100;`
  );
  return (
    <>
      <h2 className="text-[24px] uppercase tracking-[1.44px] font-bold bg-game-grad bg-clip-text text-transparent">
        {title}
      </h2>
      <div className="flex overflow-scroll gap-[24px] md:ml-[-32px] mx-[-24px] md:pl-[32px] p-[24px]">
        {Array.isArray(arr) && (
          <>
            {arr.map((game) => {
              let imageId = null;
              if (Array.isArray(coverArr) && coverArr.length > 0) {
                imageId = coverArr.find((cover) => cover.id === game.cover);
              }
              return <GameCard game={game} imageId={imageId.image_id} />;
            })}
          </>
        )}
      </div>
    </>
  );
}
