import Link from "next/link";
import { fetchGameData } from "../../lib/fetchGameData";

export default async function GameCard({ game }) {
  const cover = await fetchGameData(
    "covers",
    `fields image_id; where game = ${game?.id};`
  );

  const genres = await fetchGameData(
    "genres",
    `fields name; where id = (${game?.genres});`
  );

  const genre =
    genres[0]?.name === "Role-playing (RPG)"
      ? "RPG"
      : genres[0]?.name === "Real Time Strategy (RTS)"
      ? "RTS"
      : genres[0]?.name === "Turn-based strategy (TBS)"
      ? "TBS"
      : genres[0]?.name === "Hack and slash/Beat 'em up"
      ? "Hack'n'slash"
      : genres[0]?.name === "Card & Board Game"
      ? "Board Game"
      : genres[0]?.name === "Point-and-click"
      ? "Point & click"
      : genres[0]?.name;

  return (
    <>
      {cover && (
        <Link href={`/games/${game.slug}`} className="block">
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover[0]?.image_id}.png`}
            alt={`${game?.name}-cover`}
            className="rounded-t-[2px] w-[160px] aspect-[160/214] object-cover"
          />
          <section>
            <div>
              <h3>{game?.name}</h3>
              <p>{genre}</p>
            </div>
          </section>
        </Link>
      )}
    </>
  );
}
