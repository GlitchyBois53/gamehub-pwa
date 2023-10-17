import Link from "next/link";
import { fetchGameData } from "../../lib/fetchGameData";

export default async function GameCard({ game }) {
  const cover = await fetchGameData(
    "covers",
    `fields image_id; where game = ${game?.id};`
  );

  console.log(cover);

  return (
    <>
      {cover && (
        <Link href={`/games/${game.slug}`}>
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${cover[0]?.image_id}.png`}
            alt={`${game?.name}-cover`}
          />
          <section>
            <h3>{game?.name}</h3>
            <p>{game?.slug}</p>
          </section>
        </Link>
      )}
    </>
  );
}
