import Link from "next/link";
import { genres } from "../../constants";
import { yearConverter } from "../../lib/yearConverter";
import DeleteGame from "./DeleteGame";

export default async function GameCard({
  game,
  imageId,
  isPersonalPage,
  clerkId,
  isLibrary,
}) {
  const genre = genres?.find(
    (genre) => genre?.genreId == game?.genres?.[0]
  )?.name;

  const releaseYear = yearConverter(game?.first_release_date);

  const rating = Math.floor(game?.total_rating) / 10;
  return (
    <article className="relative">
      {isPersonalPage && (
        <DeleteGame
          gameId={game?.id}
          clerkId={clerkId}
          isLibrary={isLibrary}
          slug={game?.slug}
        />
      )}
      <Link
        href={`/games/${game.slug}`}
        className="block bg game-shadow rounded-b-[2px] min-w-[160px] max-w-[160px]"
      >
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.png`}
          alt={`${game?.name}-cover`}
          className="rounded-t-[2px] w-[160px] h-[214px] object-cover"
          loading="lazy"
        />
        <section className="flex flex-col justify-between px-[6px] py-[8px] gap-[3px]">
          <div className="flex justify-between items-center">
            <h3 className="w-[118px] truncate text-[12px] uppercase tracking-[0.72px] font-bold">
              {game?.name}
            </h3>
            <p className="text-[12px] uppercase tracking-[0.72px] font-bold">
              {releaseYear}
            </p>
          </div>
          <div className="text-right flex justify-between items-center">
            <p className="text-[10px] font-medium uppercase tracking-[0.56px]">
              {genre}
            </p>
            <div className="flex gap-[2px] items-center">
              <p className="text-[12px] uppercase tracking-[0.72px] font-semibold">
                {!rating
                  ? "N/A"
                  : rating.toString().length !== 1
                  ? rating
                  : `${rating}.0`}
              </p>
              <img
                src="/star-icon.png"
                alt="star-icon"
                className="w-[5.3px] object-contain aspect-square"
              />
            </div>
          </div>
        </section>
      </Link>
    </article>
  );
}
